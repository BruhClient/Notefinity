"use client"

import UpdateFolderForm from '@/components/forms/update-folder'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'

const EditFolderButton = ({id , name, userId} : { id : string , name : string,userId : string}) => {

    const [open, setOpen] = useState(false);
    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size={"icon"} onClick={() => setOpen(true)} variant={"outline"}>
                  <Pencil/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='flex items-center gap-2'>
                    <Pencil size={20}/> Update Folder
                </DialogTitle>
                <DialogDescription>
                    Try not to have duplicate names . Makes things Confusing !
                </DialogDescription>
            </DialogHeader>
            <UpdateFolderForm id={id} name={name} userId={userId} setOpen={setOpen}/>
        </DialogContent>
    </Dialog>
  )
}

export default EditFolderButton
