// app/api/projects/route.ts
import { NextRequest } from "next/server"

import pinecone from "@/lib/pinecone"
import { getEmbedding } from "@/lib/embeddings"
import { db } from "@/db"
import { folderComments, folderLikes, folders, users } from "@/db/schema"
import { count, desc, eq, inArray, sql } from "drizzle-orm"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  const q = searchParams.get("q") ?? ""
 

  
  

   try {        
            
            const queryVector = await getEmbedding(q)
            const index = pinecone.Index("notefinity-folders")

            const response = await index.query({
                vector : queryVector , 
                topK : 10, 
                includeMetadata : true, 
                filter : {
                    sharable : true , 
                }
            })
            
            const scores = response.matches.map((match) => match.score)
            const ids = response.matches.map((match) => match.id)
        

            const orderingCase = sql.raw(`CASE ${ids.map((id, index) => `WHEN folders.id = '${id}' THEN ${index}`).join(" ")} ELSE ${ids.length} END`)

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

           
         
                  

            
  
  
            return Response.json(result.map((data,index) => {return {...data.folder,score : scores[index] ,username : data.user.name , image : data.user.image , likeCount : data.likeCount , commentCount : data.commentCount}}));
    } catch(error) { 
            
        return new Response("Something went wrong", { status: 401 })
    }

    

    
} 
