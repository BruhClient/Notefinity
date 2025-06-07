"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CreateFolderForm from '@/components/forms/create-folder'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const CreateFolder = ({userId} : {userId  : string}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
         <Button onClick={() => setOpen(true)}  className='h-full border-black  min-h-[100px] shadow-lg' variant={"outline"}>
        
          <Plus  size={30}/>
          <div className='text-2xl font-semibold'>
              Add new folder
          </div>
        
        
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Plus size={20}/>Create Folder
          </DialogTitle>
          <DialogDescription>
            Dont worry about the name , you can change it anytime!
          </DialogDescription>

        </DialogHeader>
        <CreateFolderForm userId={userId} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
   
  )
}

export default CreateFolder
