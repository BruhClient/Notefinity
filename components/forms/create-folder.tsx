"use client"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useTransition } from "react";
import { ClipLoader } from "react-spinners";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { CreateFolderPayload, CreateFolderSchema } from "@/schema/create-folder";
import { createFolder } from "@/server/db/folder";
import { useQueryClient } from "@tanstack/react-query";


function CreateFolderForm({userId,setOpen} : {userId : string , setOpen : Dispatch<SetStateAction<boolean>>}) {
   

    const form = useForm<CreateFolderPayload>({ 
        resolver : zodResolver(CreateFolderSchema), 
        defaultValues : {
          
            name : ""
            
        }
    })

    const [isPending,startTransition] = useTransition()
    const queryClient = useQueryClient()
    const onSubmit = (values : CreateFolderPayload) => {

     

        setOpen(false)
        startTransition(() => { 
        
          createFolder(values.name).then((data) => { 
         
            if (data.error) { 
              showErrorToast(data.error)
            } else { 
              showSuccessToast("Folder Created")
              
              queryClient.setQueryData(["folders",userId],(oldData :any) => {
                    if (!oldData) {

                        return {
                        pages: [[data]],
                        pageParams: [],
                        };
                    }
                    return { 
                        ...oldData,
                        pages : [[data,...oldData.pages[0]] , ...oldData.pages.slice(1)], 
                    }
                })
              form.reset()
            }
          })


        })
        
    }
    return ( 
    
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 px-2 w-full">
            <FormField
                control={form.control}
                name ="name"
                render={({field}) => (
                    <FormItem>
                        
                        <FormControl>
                            <Input {...field} placeholder="Folder name" />
                        </FormControl>

                
                    </FormItem>
                    
                )}
            />
            
            <Button className="w-full" disabled={isPending}>{isPending ? <div className="flex gap-2 items-center"><ClipLoader size={15} /> Creating Folder </div> : "Create Folder"}</Button>
       

        </form>
    </Form>
    

);
}

export default CreateFolderForm;