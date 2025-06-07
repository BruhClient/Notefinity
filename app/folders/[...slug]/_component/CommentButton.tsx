"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { CreateCommentPayload, CreateCommentSchema } from '@/schema/create-comment'
import { createFolderComment } from '@/server/folderComments'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePrevious } from '@mantine/hooks'
import { format } from 'date-fns'
import { MessageCircle, Send } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import CommentFeed from './CommentFeed'
import { useQueryClient } from '@tanstack/react-query'
import { timeAgo } from '@/lib/time'

const CommentButton = ({initialCommentAmount,folderName,folderCreatedAt,folderId} : {initialCommentAmount : number,folderName : string , folderCreatedAt : Date,folderId : string}) => {

  const [commentAmount,setCommentAmount] = useState(initialCommentAmount)
  const [isPending,startTransition] = useTransition()
  const previous = usePrevious(commentAmount)

  const queryClient = useQueryClient()
  const createComment = (values : CreateCommentPayload) => { 

    setCommentAmount((prev) => prev + 1)
    startTransition(() => { 
      
      createFolderComment(values.text,folderId).then((data) => { 
        if (data) { 
          showSuccessToast("Comment created")
          queryClient.setQueryData(["comments",folderId],(oldData : any) => { 
            return { 
              ...oldData, 
              pages : [[data,...oldData.pages[0]] , ...oldData.pages.slice(1)],

            }
          })
          form.reset()
        } else{ 
          setCommentAmount(previous ?? initialCommentAmount)
          showErrorToast()
        }
      })
    })
  }

  const form = useForm({
    resolver : zodResolver(CreateCommentSchema), 
    defaultValues : { 
      text : ''
    }
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          {commentAmount} <MessageCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {folderName}
          </DialogTitle>
          <DialogDescription>
            {timeAgo(folderCreatedAt)}
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <CommentFeed folderId={folderId}/>

        <Separator />
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createComment)} className='flex gap-1 w-full'>
              <FormField
                control={form.control}
                name ="text"
                render={({field}) => (
                    <FormItem className='w-full'>
                        
                        <FormControl>
                            <Input className='flex-1' {...field}/>
                        </FormControl>

                
                    </FormItem>
                    
                )}
            />
              <Button disabled={isPending} size={"icon"}><Send /></Button>
            </form>

          </Form>
        
        </DialogFooter>

        
      </DialogContent>
      
    </Dialog>
    
  )
}

export default CommentButton
