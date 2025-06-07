"use server"

import { colorNames } from "@/data/constants";
import { pricingTypes } from "@/data/pricingTypes";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getEmbedding } from "@/lib/embeddings";
import pinecone from "@/lib/pinecone";
import { and, eq, InferModel, sql } from "drizzle-orm";

export const createNote = async (title : string,text : string , html : string , folderId : string , starred : boolean, ) => { 
    const session = await auth()

    if (!session) { 
        return {
            error : "Unauthoized"
        }
    }
    try { 

        const result = await db
        .select({
            count: sql<number>`count(*)`,
        })
        .from(notes)
        .where(eq(notes.userId, session.user.id));

        const notesCount = Number(result[0]?.count ?? 0);

        const noteLimit = pricingTypes[session.user.plan].noteAmount

        if (notesCount >= noteLimit) { 
            return { 
                error : `You have reached your limit of ${noteLimit} notes`
            }
        }

        


        const color = colorNames[Math.floor(Math.random() * colorNames.length)];
        const note = await db.insert(notes).values({ 
            userId : session.user.id , 
            color, 
            text , 
            html , 
            title , 
            folderId , 
            starred, 
            


        }).returning()

        const index = pinecone.index("notefinity")

        const embedding = await getEmbeddingForNote(title,text)


        await index.upsert([
                {
                    id : note[0].id ,
                    values : embedding, 
                    metadata : { 
                        userId : session.user.id,
                        starred : note[0].starred, 
                        title , 
                        folderId : note[0].folderId

                    }
                    

                }
        ])

        return {...note[0],error : null}
    } catch { 
    
        return { 
            error : "Something went wrong"
        }
    }
}

export const deleteNote = async (noteId : string,userId : string) => {
    try { 

        const note = await db.delete(notes).where(and(eq(notes.id, noteId),eq(notes.userId,userId))).returning()
        const index = pinecone.index("notefinity")
        await index.deleteOne(note[0].id);

        return { 
            userId : note[0].userId
        }
    } catch(error : any) { 
        return null
    }
}

type note = Partial<InferModel<typeof notes>>;
export const updateNoteById = async (id : string, options :  note) => { 
    try { 

        
        
        
        const result = await db.update(notes).set({
            ...options, 
                
    
        }).where(eq(notes.id, id)).returning()

        const index = pinecone.index("notefinity")

        const embedding = await getEmbeddingForNote(result[0].title , result[0].text ?? "")
        await index.update({
            id: result[0].id,
            values: embedding , // update vector values
            metadata: {
                userId: result[0].userId ,// add or update metadata, 
                starred : result[0].starred, 
                title : result[0].title, 
                folderId : result[0].folderId
            }
        });
        


      
       

        return result[0]
    } catch { 
        return null
    }
}

export async function getEmbeddingForNote(title : string,content : string ) { 
    return getEmbedding(title + "\n\n" + content)
}