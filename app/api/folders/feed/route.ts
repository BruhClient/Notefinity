import { NextRequest } from "next/server";
import { db } from "@/db";
import { folderComments, folderLikes, folders, users } from "@/db/schema";
import { eq, desc, sql, count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const take = parseInt(searchParams.get("take") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "0");

  try {
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
      .where(eq(folders.sharable, true))
      .groupBy(folders.id, users.id)
      .orderBy(desc(sql`count(${folderLikes.id})`))
      .offset(page * take)
      .limit(take);

    return Response.json(result.map((data) => {return {...data.folder,username : data.user.name , image : data.user.image , likeCount : data.likeCount , commentCount : data.commentCount}}));
  } catch (error) {
    console.error("Error fetching folders:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
