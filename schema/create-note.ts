import {z} from "zod"

export const CreateNoteSchema = z.object({ 
    title : z.string().trim().min(1,{message : "Please enter a title"}).max(80, {message : "Please keep title under 80 characters"}),
    content : z.any(), 
    starred : z.boolean()
    
    

})


export type CreateNotePayload = z.infer<typeof CreateNoteSchema>