"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form ,FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditProfilePayload, EditProfileSchema } from "@/schema/auth/edit-profile";
import { editProfile } from "@/server/actions/auth/edit-profile";
import { useSession } from "next-auth/react";
import {ClipLoader} from "react-spinners"
import { showSuccessToast } from "@/lib/toast";


 
const EditProfileForm = () => {
    const {update,data :session} = useSession()
    const form = useForm<EditProfilePayload>({ 
                resolver : zodResolver(EditProfileSchema), 
                defaultValues : {
                  
                    name : session?.user.name ?? '', 
                    email : session?.user.email ?? "", 
    
                    
                }
            })

    
    const [isPending,startTransition] = useTransition()
    
    
    const onSubmit = (values : EditProfilePayload) => { 

        startTransition(() => {
            editProfile(values).then((data) => { 
                update()
                showSuccessToast("Profile Updated")

            })
        })

    }
    return ( <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name ="name"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="jsmith"/>
                                    
                                </FormControl>
                            

                               
                            </FormItem>

                            
                            
                        )}
                    />

                <FormField
                        control={form.control}
                        name ="email"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="jsmith@gmail.com" disabled={session?.user.isOauth}/>
                                    
                                </FormControl>
                            

                               
                            </FormItem>

                            
                            
                        )}
                    />

                <Button className="w-full" disabled={isPending}>{isPending ? <div className="flex gap-2 items-center"><ClipLoader size={15} /> Saving Changes... </div> : "Save Changes"}</Button>
        </form>

    </Form> );
}
 
export default EditProfileForm;