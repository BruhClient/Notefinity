// app/api/projects/route.ts
import { NextRequest } from "next/server"

import { db } from "@/db"
import { eq, and, desc } from "drizzle-orm"
import { auth } from "@/lib/auth"
import {  notes } from "@/db/schema"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  const take = parseInt(searchParams.get("take") ?? "10")
  const page = parseInt(searchParams.get("page") ?? "0")
  const folderId = searchParams.get("folderId") ?? "0"
  const userId = searchParams.get("userId") ?? ""

   try { 
              const result = await db.query.notes.findMany({ 
                  where : and(eq(notes.userId,userId),eq(notes.folderId , folderId)), 
                  offset : page * take , 
                  orderBy : desc(notes.createdAt),
                  limit : take , 
              })
  
  
              return Response.json(result)
    } catch(error) { 
            
        return new Response("Something went wrong", { status: 401 })
    }

    

    
} 
