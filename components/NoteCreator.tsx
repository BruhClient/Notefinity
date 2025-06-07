"use client"

import React, { useEffect, useRef, useTransition } from 'react'
import TipTap from './TipTap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateNotePayload, CreateNoteSchema } from '@/schema/create-note'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import TextareaAutoResize from "react-textarea-autosize"
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createNote } from '@/server/db/note'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
const NoteCreator = ({userId, folderId} : {userId : string , folderId : string}) => {

  const form = useForm<CreateNotePayload>({ 
    resolver : zodResolver(CreateNoteSchema),
    defaultValues : { 
      title : "", 
      content : {
        html : "", 
        text : "", 
      }, 
      starred : false ,
    }
  })

  const queryClient = useQueryClient()
  const [isPending,startTransition] = useTransition()
  const onSubmit = ({title ,content : {html , text },starred} : CreateNotePayload) => { 
    startTransition(() => {
      createNote(title,text,html ,folderId,starred).then((data) => { 
        if (data.error) { 
          showErrorToast(data.error)
        } else { 
          showSuccessToast("Note Created.")

          queryClient.setQueryData(["notes",folderId,userId],(oldData :any) => {
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
                            <TextareaAutoResize  className='outline-none text-2xl max-h-fit' {...field} ref={inputRef} placeholder="Title" />
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

            <div className='flex items-center gap-2 justify-end'>
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
              <Button type='submit' disabled={isPending}>{isPending ? <ClipLoader size={15} color='white' />:"Create Note"}</Button>
            
            </div>
            
      </form>
      
    </Form>
  )
}

export default NoteCreator
