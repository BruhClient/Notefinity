import {z} from "zod"

export const CreateCommentSchema = z.object({ 
    text : z.string().trim().min(1).max(80),
    

})


export type CreateCommentPayload = z.infer<typeof CreateCommentSchema>