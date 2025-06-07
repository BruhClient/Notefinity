"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useTransition } from 'react'
import TipTap from './TipTap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateNotePayload, CreateNoteSchema } from '@/schema/create-note'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import TextareaAutoResize from "react-textarea-autosize"
import { Button } from './ui/button'
import { Redo2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createNote, updateNoteById } from '@/server/db/note'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import DeleteNoteButton from '@/app/folders/[...slug]/_component/DeleteNoteButton'
import { notes } from '@/db/schema'
import { InferModel } from 'drizzle-orm'


interface NoteContent { 
    title : string, 
    content : { 
        html : string , 
        text : string
    }, 
    starred : boolean
}

const NoteUpdator = ({userId, folderId , noteContent ,id,note , setOpen} : {userId : string , folderId : string , noteContent : NoteContent,id : string , note : Partial<InferModel<typeof notes>>,setOpen : Dispatch<SetStateAction<boolean>>}) => {

  const form = useForm<CreateNotePayload>({ 
    resolver : zodResolver(CreateNoteSchema),
    defaultValues : noteContent,
  })

  const queryClient = useQueryClient()
  const [isPending,startTransition] = useTransition()
  const onSubmit = ({title ,content : {html , text },starred} : CreateNotePayload) => { 

    const newData = { 
      ...note , 
      title , 
      text, 
      html, 
      starred, 
      updatedAt : Date.now(),

    }
    queryClient.setQueryData(["notes", folderId, userId], (oldData: any) => {
                  if (!oldData) {
                    return {
                      pages: [[newData]], // fallback: if no data exists, just insert the updated note
                      pageParams: [],
                    };
                  }

                  const updatedPages = oldData.pages.map((page: any[]) =>
                    page.map((note) => (note.id === newData.id ? newData : note))
                  );

                  return {
                    ...oldData,
                    pages: updatedPages,
                  };
            });
    showSuccessToast("Note Updated.")
    setOpen(false)
    startTransition(() => {
      updateNoteById(id,{
          starred, 
          html, 
          text,
          title,
      }).then((data) => { 
        if (!data) { 
          showErrorToast("Update Failed.")
        } 
      })
    })
  }

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
                control={form.control}
                name ="title"
                render={({field}) => (
                    <FormItem>
                        
                        <FormControl>
                            <TextareaAutoResize  className='outline-none text-2xl max-h-fit pb-2' {...field} ref={inputRef} placeholder="Title" />
                        </FormControl>

                        <FormMessage />

                
                    </FormItem>
                    
                )}
            />
            <FormField
                control={form.control}
                name ="content"
                render={({field}) => (
                    <FormItem>
                        
                        <FormControl>
                            <TipTap onChange={field.onChange} content={field.value} />
                        </FormControl>

                
                    </FormItem>
                    
                )}
            />

            <div className='flex items-center gap-2'>
              <Button type='submit' className='flex-1'>Update Note</Button>
              <FormField
                        control={form.control}
                        name ="starred"
                        render={({field}) => (
                            <FormItem >
                                
                                <FormControl>
                                
                                  <Button type='button' size={"icon"} variant={"outline"} onClick={() => field.onChange(!field.value)}><Star className={cn(field.value && "stroke-amber-400 fill-amber-400")} /></Button>               
                                </FormControl>
                            

                          
                            </FormItem>

                            
                            
                        )}
            />
            
            <DeleteNoteButton id={id} userId={userId} folderId={folderId}/>
              
            
            </div>
            
      </form>
      
    </Form>
  )
}

export default NoteUpdator
