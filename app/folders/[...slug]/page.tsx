import { colors } from '@/data/constants'
import { db } from '@/db'
import { folders } from '@/db/schema'
import { auth } from '@/lib/auth'
import { format } from 'date-fns'
import {  eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import DeleteFolderButton from '../_components/DeleteFolderButton'
import EditFolderButton from '../_components/EditFolderButton'
import { Card, CardContent } from '@/components/ui/card'
import NoteMasonry from './_component/NoteMasonry'
import NoteCreator from '@/components/NoteCreator'
import SharableToggle from './_component/SharableToggle'
import AiChat from '@/components/AiChat'
import LikeWrapper from './_component/LikeWrapper'
import CommentWrapper from './_component/CommentWrapper'
import { timeAgo } from '@/lib/time'

const FolderPage =async ({params} : {params : Promise<{slug : string[]}>}) => {

    const slug = (await params).slug[0]

    const session = await auth()
    
    if (!session) { 
        redirect("/")
    }
    const folder = await db.query.folders.findFirst({ 
        where : eq(folders.id,slug)
    })

    

    if (!folder ) { 
        redirect("/folders")
    }

    const isOwner = session.user.id === folder.userId 

    if (!isOwner && !folder.sharable) { 
        redirect("/community") 
    }

    //@ts-ignore
    const colorCode = colors[folder.color]




  return (

    <div className="lg:px-8 px-3 flex flex-col gap-5 pb-8">

        <div className='flex w-full items-center flex-wrap gap-3 justify-between'>
            <div className='flex items-center gap-4'>
                <div className='w-3 h-14 rounded-lg ' style={{background : colorCode}}/>
                <div>
                    <div className='text-3xl font-semibold'>
                        {folder.name}
                    </div>
                    <div>
                        {timeAgo(folder.createdAt)}
                    </div>
                </div>

            </div>

            
                

                <div className='flex'>
                    <Suspense >
                        <LikeWrapper folderId={folder.id} userId={session.user.id}/>
                    </Suspense>
                    <Suspense>
                        <CommentWrapper folderId={folder.id} folderName={folder.name} folderCreatedAt={folder.createdAt}/>
                    </Suspense>
                    
                </div>
            
            
            

        </div>

        {
                isOwner  && <div className='flex gap-3'>
                    <DeleteFolderButton id={folder.id} userId={session.user.id} />
                    <EditFolderButton id={folder.id} name={folder.name} userId={session.user.id}/>
                    <SharableToggle id={folder.id} userId={session.user.id} checked={folder.sharable} />
                </div>
                
        }

    {
        isOwner && <Card className='w-full border-black ' >
            <CardContent>
                    
                <NoteCreator userId={folder.userId} folderId={folder.id}/>
            </CardContent>
        </Card>
    }
        
      
        <NoteMasonry userId={folder.userId} folderId={folder.id} isOwner={isOwner}/>

        <AiChat folderId={folder.id} folderName={folder.name}/>
        

    </div>
    
    
  )
}

export default FolderPage
