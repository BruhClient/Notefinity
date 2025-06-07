"use server"

import { db } from "@/db"
import { folderComments } from "@/db/schema"
import { auth } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const createFolderComment = async (text : string ,folderId : string ) => { 
    const session = await auth()

    if (!session) { 
        return null
    }

    try { 
        const result = await db.insert(folderComments).values({ 
            text , 
            folderId , 
            userId : session.user.id, 

        }).returning()

    
        return {...result[0],image : session.user.image, name : session.user.name }
    } catch { 
        return null
    }
}

export const deleteFolderComment = async (id : string ) => { 
    const session = await auth()

    if (!session) { 
        return null
    }

    try { 
        const result = await db.delete(folderComments).where(and(eq(folderComments.userId,session.user.id), eq(folderComments.id,id))).returning()

    
        return result[0]
    } catch { 
        return null
    }
}