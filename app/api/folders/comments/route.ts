// app/api/projects/route.ts
import { NextRequest } from "next/server"

import { db } from "@/db"
import { eq, desc } from "drizzle-orm"
import { folderComments, folders, users } from "@/db/schema"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  const take = parseInt(searchParams.get("take") ?? "10")
  const page = parseInt(searchParams.get("page") ?? "0")

  const folderId = searchParams.get("folderId") ?? ""

   try { 
              const result = await db
                .select({
                    comment: folderComments,
                    user: {
                    name: users.name,
                    image: users.image,
                    userId : users.id,
                    },
                })
                .from(folderComments)
                .innerJoin(users, eq(folderComments.userId, users.id)) // assuming comments have userId
                .innerJoin(folders, eq(folderComments.folderId, folders.id)) // assuming comments are on folders
                .where(eq(folders.id , folderId))
                .groupBy(folderComments.id, users.id) // group by comment & user
                .orderBy(desc(folderComments.createdAt)) // assuming you want to sort by folderLikes
                .offset(page * take)
                .limit(take);
  
  
              return Response.json(result.map((data) => { return {...data.comment,...data.user}}))
    } catch { 
            
        return new Response("Something went wrong", { status: 401 })
    }

    

    
} 
