"use client"

import React, { useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from 'lucide-react'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { deleteFolder } from '@/server/db/folder'
import { usePathname, useRouter } from 'next/navigation'


const DeleteFolderButton = ({id,userId} : {id : string,userId : string}) => {
    const [isPending,startTransition] = useTransition()
    const queryClient = useQueryClient()
    const handleDelete = () => { 
        
        
        startTransition(() => { 
            
            queryClient.setQueryData(["folders",userId],(oldData : any) => { 
              
              if (!oldData) { 
                    return oldData
              }
              return { 
                ...oldData, 
                pages :  oldData.pages.map((page : any) =>
                        page.filter(( item: any) => item.id !== id)
                      ),

                }
            })
            showSuccessToast("Your Folder has been deleted")
            deleteFolder(id).then((data) => { 
                if (!data) { 
                    showErrorToast()
                } 
            })
        })
        
    }
  return (
    <AlertDialog>
  <AlertDialogTrigger asChild><Button size={"icon"} variant={"outline"} onClick={(e) => e.stopPropagation() }><Trash/></Button></AlertDialogTrigger>
  <AlertDialogContent >
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your folder
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={(e) => {e.stopPropagation()}}>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={isPending} onClick={(e) => {
        e.stopPropagation()
        handleDelete()
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default DeleteFolderButton
