import { env } from "@/data/env/server"
import {Pinecone} from "@pinecone-database/pinecone"

const pinecone = new Pinecone({
   
    apiKey : env.PINECONE_API_KEY,
   
})



export default pinecone