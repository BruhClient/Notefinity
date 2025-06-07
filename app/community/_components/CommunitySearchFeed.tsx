"use client"

import { FolderLoadingSkeleton } from '@/components/FolderCard'
import FolderFeed from '@/components/FolderFeed'
import { MotionDiv } from '@/components/Motion'
import { boxVariants } from '@/lib/variants'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, User } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { timeAgo } from '@/lib/time'
const CommunitySearchFeed = () => {

    const searchParams = useSearchParams()

    const q = searchParams.get("q")

    const {data,isFetching} = useQuery({
      queryKey : ["community",q], 
      queryFn : async () => { 
        const result = await fetch(`/api/folders/semantic-query?q=${q}`).then((data) => data.json())
        return result
      },
      enabled : !!q, 
      staleTime : 60_000 * 5 

    })


    

    
  if (!q) { 
    return <FolderFeed />
  }
  
  return (
      <div
            className="columns-1 sm:columns-2 md:columns-3 2xl:columns-4 gap-4 space-y-4 py-4"
            
            
          >
            <AnimatePresence>
          
              {data && data.map(({ id, name ,createdAt,username,image ,likeCount,commentCount ,score} : any) => {
               

                return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id} className="break-inside-avoid">
                  <FolderCard name={name} id={id} createdAt={createdAt} username={username} image={image} likes={likeCount} comments={commentCount} score={score}/>
                  </MotionDiv>);
              })}

              {
                isFetching && <>
                  
                  <MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" className='break-inside-avoid'><FolderLoadingSkeleton /></MotionDiv>
                  <MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" className='break-inside-avoid'><FolderLoadingSkeleton /></MotionDiv>
                </>
              }
              </AnimatePresence>
            
          </div>
  )
}

export default CommunitySearchFeed


const FolderCard = ({id,name,username ,image , likes , comments ,createdAt,score} : {id : string,name : string , username : string , image : string | null , likes : number , comments : number,createdAt : Date,score : number}) => { 
  const router = useRouter()
    return <Card className='hover:bg-muted hover:text-muted-foreground cursor-pointer' onClick={() => router.push(`/folders/${id}`)}>
        <CardContent className='flex gap-4 flex-col'>

            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Avatar>
                        <AvatarImage src={image ?? ''}></AvatarImage>
                        <AvatarFallback><User  size={13}/></AvatarFallback>
                    </Avatar>
                    
                    <div className=' font-semibold'>
                        {username}
                    </div> 

                </div>
                <div>
                    {(score * 100).toFixed(2)}% Match
                </div>
            </div>
            
            <div className='flex gap-2 flex-col'>
                <CardTitle className='text-xl'>{name}</CardTitle>
                <CardDescription>{timeAgo(createdAt)}</CardDescription>

                <div className='flex gap-2 items-center'>
                    <div className='flex gap-2 items-center text-muted-foreground'>
                        {likes} <Heart size={15}/>
                    </div>
                    <div className='flex gap-2 items-center text-muted-foreground'>
                        {comments} <MessageCircle size={15}/>
                    </div>
                </div>
            </div>
            
        </CardContent>
    </Card>
}