// app/api/projects/route.ts
import { NextRequest } from "next/server"

import { db } from "@/db"
import { eq, and, desc } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { folders } from "@/db/schema"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  const take = parseInt(searchParams.get("take") ?? "10")
  const page = parseInt(searchParams.get("page") ?? "0")

  const session = await auth()
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

   try { 
              const result = await db.query.folders.findMany({ 
                  where : eq(folders.userId,session.user.id), 
                  offset : page * take , 
                  orderBy : desc(folders.createdAt),
                  limit : take , 
              })
  
  
              return Response.json(result)
    } catch(error) { 
            
        return new Response("Something went wrong", { status: 401 })
    }

    

    
} 
