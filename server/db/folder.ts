"use server"

import { colorNames } from "@/data/constants"
import { env } from "@/data/env/server"
import { pricingTypes } from "@/data/pricingTypes"
import { db } from "@/db"
import { folders } from "@/db/schema"
import { auth } from "@/lib/auth"
import { getEmbedding } from "@/lib/embeddings"
import pinecone from "@/lib/pinecone"
import { eq, InferModel, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const createFolder = async (name: string) => {
  const session = await auth()

  if (!session) {
    return {
      error: "Unauthorized",
    }
  }
  try {
    const result = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(folders)
      .where(eq(folders.userId, session.user.id))

    const folderCount = Number(result[0]?.count ?? 0)

    const folderLimit = pricingTypes[session.user.plan].folderAmount

    if (folderCount >= folderLimit) {
      return {
        error: `You have reached your limit of ${folderLimit} folders`,
      }
    }
    const color = colorNames[Math.floor(Math.random() * colorNames.length)]
    const folder = await db
      .insert(folders)
      .values({
        name,
        userId: session.user.id,
        color,
      })
      .returning()

    const index = pinecone.index(env.PINECONE_INDEX).namespace("folders")
    const embedding = await getEmbedding(name)
    await index.upsert([
      {
        id: folder[0].id,
        values: embedding,
        metadata: {
          userId: session.user.id,
          sharable: folder[0].sharable,
        },
      },
    ])

    revalidatePath("/folders")
    return {
      name,
      color,
      id: folder[0].id,
      createdAt: folder[0].createdAt,
      error: null,
    }
  } catch {
    return {
      error: "Something went wrong",
    }
  }
}

type folder = Partial<InferModel<typeof folders>>
export const updateFolderById = async (id: string, options: folder) => {
  try {
    const result = await db
      .update(folders)
      .set({
        ...options,
      })
      .where(eq(folders.id, id))
      .returning()

    const index = pinecone.index(env.PINECONE_INDEX).namespace("folders")
    const embedding = await getEmbedding(result[0].name)
    await index.update({
      id: result[0].id,
      values: embedding, // update vector values
      metadata: {
        userId: result[0].userId, // add or update metadata,
        sharable: result[0].sharable,
      },
    })

    revalidatePath(`/folders`)

    return {
      userId: result[0].userId,
    }
  } catch {
    return null
  }
}

export const getFolders = async (
  page: number,
  take: number,
  userId: string,
) => {
  try {
    const result = await db.query.folders.findMany({
      where: eq(folders.userId, userId),
      offset: page * take,
      limit: take,
    })

    return result
  } catch {
    return null
  }
}

export const deleteFolder = async (id: string) => {
  try {
    const data = await db.delete(folders).where(eq(folders.id, id)).returning()

    const index = pinecone.index(env.PINECONE_INDEX).namespace("folders")

    await index.deleteOne(id)

    revalidatePath(`/folders`)

    return {
      success: true,
      userId: data[0].userId,
    }
  } catch (error) {
    return null
  }
}
