"use server"

import { db } from "@/db"
import { folderLikes } from "@/db/schema"
import { auth } from "@/lib/auth"
import { and, eq } from "drizzle-orm"


export const toggleFolderLike = async (folderId : string) =>  { 
    const session = await auth()
        
    if (!session) { 
        return null
    }

    try { 
        const likeExists = await db.query.folderLikes.findFirst({ 
            where : and(eq(folderLikes.folderId,folderId) , eq(folderLikes.userId,session.user.id))
        })

        if (likeExists) { 
            await db.delete(folderLikes).where(eq(folderLikes.id,likeExists.id))
        } else { 
            await db.insert(folderLikes).values({
                folderId , userId : session.user.id
            })
        }

        return { 
            success : true
        }


    }catch { 
        return null
    }
}