
import { db } from "@/db";
import { notes } from "@/db/schema";
import { auth } from "@/lib/auth";
import pinecone from "@/lib/pinecone";
import { and, eq, inArray, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { CoreMessage, CoreSystemMessage, streamText } from "ai";
import { env } from "@/data/env/server";
import { openai } from '@ai-sdk/openai';
import { getEmbedding } from "@/lib/embeddings";

export async function POST(req : Request) { 
    try {
        const {messages,folderId,folderName} : {messages : CoreMessage[], folderId : string,folderName : string} = await req.json()

     

        const messagesTruncated = messages.slice(-6)
        const embedding = (await getEmbedding(messagesTruncated.map((message) => message.content).join("\n")))

       
        const index = pinecone.index("notefinity")
        const vectorQueryResponse = await index.query({ 
            vector : embedding, 
            topK : 4, 
            filter : { folderId , }
        })


        const ids = vectorQueryResponse.matches.map((match) => match.id)
        const data = await db.select().from(notes).where(inArray(notes.id,ids))

        const result = await db
        .select({count: sql<number>`count(*)`})
        .from(notes)
        .where(eq(notes.folderId, folderId));

        const totalNotesCount = Number(result[0]?.count ?? 0);

        

        const systemMessage : CoreSystemMessage = { 
            role : "system", 
            content : `You are a intelligent note-taking app . Notes are stored in folders . The user has chosen the folder : ${folderName} . There are a total of ${totalNotesCount} in this folder. ` 
            + "The relevant notes for this query are \n " 
            + data.map(note => 
                `Title: ${note.title}\n` +
                `Starred: ${note.starred ? "Yes" : "No"}\n` +
                `Content:\n${note.text}`
                ).join("\n\n") 
                + "\n This might not be all the notes in the folder"
        }

        const response = streamText({ 
            model : openai("gpt-4o"), 
           
            messages : [systemMessage,...messagesTruncated ]
        })


    
        return response.toDataStreamResponse();
 


        
       



    } catch(error) { 

        console.log(error)
        return NextResponse.json({error : "Internal server error"},{status : 500})
    }
}