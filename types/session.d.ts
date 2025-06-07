
import { DefaultSession } from "next-auth"


type UserRole = typeof User['role'];
export type  ExtendedUser = DefaultSession["user"] & { 
    role : UserRole, 
    id : string,
    name : string,
    image : string, 
    isOauth : boolean, 
    plan : "Free" | "Pro" , 
    
}

declare module "next-auth" { 
    interface Session {
        user : ExtendedUser
    }
}