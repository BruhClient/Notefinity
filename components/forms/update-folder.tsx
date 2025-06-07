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
import { updateFolderById } from "@/server/db/folder";
import { useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "../ui/dialog";


function UpdateFolderForm({id,name,userId,setOpen} : {id : string,name : string,userId : string , setOpen : Dispatch<SetStateAction<boolean>>}) {
   

    const form = useForm<CreateFolderPayload>({ 
        resolver : zodResolver(CreateFolderSchema), 
        defaultValues : {
          
            name : name
            
        }
    })

    const [isPending,startTransition] = useTransition()
    const queryClient = useQueryClient()
    const onSubmit = (values : CreateFolderPayload) => {
        setOpen(false)
        startTransition(() => { 
        
            queryClient.setQueryData(["folders",userId],(oldData : any) => { 
                
                if (!oldData) { 
                    return oldData
                }
                return { 
                    ...oldData, 
                    pages : oldData.pages.map((page : any) => { 
                        return page.map((folder :any) => {
                            if (folder.id === id) { 
                                return { 
                                    ...folder , 
                                    name : values.name
                                }
                            }
                            return folder

                        })
                    })
                }
              })
            showSuccessToast("Folder Updated")
          updateFolderById(id, {name : values.name}).then((data) => { 
      
            if (!data) { 
              showErrorToast()
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
            
            <Button className="w-full">Update Folder</Button>
       

        </form>
    </Form>
    

);
}

export default UpdateFolderForm;