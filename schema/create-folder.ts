import {z} from "zod"

export const CreateFolderSchema = z.object({ 
    name : z.string().trim().min(1).max(80),
    

})


export type CreateFolderPayload = z.infer<typeof CreateFolderSchema>