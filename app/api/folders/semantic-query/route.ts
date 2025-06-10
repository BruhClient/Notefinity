import { NextRequest } from "next/server"

import pinecone from "@/lib/pinecone"
import { getEmbedding } from "@/lib/embeddings"
import { db } from "@/db"
import { folderComments, folderLikes, folders, users } from "@/db/schema"
import { count, eq, inArray, sql } from "drizzle-orm"
import { env } from "@/data/env/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")?.trim() || ""

  if (!q) {
    return new Response("Query parameter 'q' is required.", { status: 400 })
  }

  try {
    // 1. Get query vector from embedding model
    const queryVector = await getEmbedding(q)

    // 2. Query Pinecone index for topK similar folders
    const index = pinecone.Index(env.PINECONE_INDEX)
    const pineconeResponse = await index.query({
      vector: queryVector,
      topK: 10,
      includeMetadata: true,
      filter: { sharable: true },
    })

    const matches = pineconeResponse.matches || []
    if (!matches.length) {
      return Response.json([])
    }

    const ids = matches.map((match) => match.id)
    const scoreMap = Object.fromEntries(
      matches.map((match) => [match.id, match.score]),
    )

    // 3. Create ordering CASE to maintain Pinecone result order
    const orderingCase = sql.raw(
      `CASE ${ids.map((id, index) => `WHEN folders.id = '${id}' THEN ${index}`).join(" ")} ELSE ${ids.length} END`,
    )

    // 4. Query database for folder metadata
    const result = await db
      .select({
        folder: folders,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
        likeCount: count(folderLikes.id).as("likeCount"),
        commentCount: count(folderComments.id).as("commentCount"),
      })
      .from(folders)
      .leftJoin(folderLikes, eq(folders.id, folderLikes.folderId))
      .leftJoin(folderComments, eq(folders.id, folderComments.folderId))
      .innerJoin(users, eq(folders.userId, users.id))
      .where(inArray(folders.id, ids))
      .groupBy(folders.id, users.id)
      .orderBy(orderingCase)

    // 5. Merge DB result with Pinecone scores and return
    const response = result.map((data) => ({
      ...data.folder,
      score: scoreMap[data.folder.id] ?? null,
      username: data.user.name,
      image: data.user.image,
      likeCount: data.likeCount,
      commentCount: data.commentCount,
    }))

    return Response.json(response)
  } catch (error) {
    console.error("Error in /api/projects:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
