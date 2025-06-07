import { MotionDiv } from '@/components/Motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useComments } from '@/hooks/use-comments'
import useSessionUser from '@/hooks/use-session-user'
import { timeAgo } from '@/lib/time'
import { showErrorToast } from '@/lib/toast'
import { boxVariants } from '@/lib/variants'
import { deleteFolderComment } from '@/server/folderComments'
import { useIntersection } from '@mantine/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Ellipsis, User } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import React, { useEffect, useRef, useTransition } from 'react'

const CommentFeed = ({folderId} : { folderId : string}) => {

    const {comments,fetchNextPage,hasNextPage,isFetching} = useComments({folderId})
    
    
        const lastFolderRef = useRef(null)
        const { ref, entry } = useIntersection({
            root: lastFolderRef.current,
            threshold: 1, 
        });
    
        useEffect(() => { 
                if (entry?.isIntersecting && hasNextPage && !isFetching) { 
                    fetchNextPage()
                }
        },[entry])


  return (
    <div className='h-[300px] overflow-auto flex flex-col gap-2'>
        <AnimatePresence>
          
              {comments.map(({id , image , name , text , createdAt,userId},index) => {
                if (index >= comments.length-1) {
                    return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id} ref={ref}><CommentCard id={id} image={image} name={name} text={text} createdAt={createdAt} userId={userId} folderId={folderId}/></MotionDiv>);
                 }

                return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id}><CommentCard id={id} image={image} name={name} text={text} createdAt={createdAt} userId={userId} folderId={folderId}/></MotionDiv>);
              })}

              {
                isFetching && <>
                  
                  <Skeleton className='w-full h-20'/>
                </>
              }

              { 
                !isFetching && comments.length === 0 && <div className='w-full h-full flex justify-center items-center text-muted-foreground'>no comments</div>
              }
        </AnimatePresence>
    </div>
  )
}

export default CommentFeed


export const CommentCard = ({id , image , name , text , createdAt,userId,folderId} : {id : string , image : string , name : string , text : string , createdAt :Date , userId : string,folderId : string}) => { 
    const user = useSessionUser()

    const queryClient = useQueryClient()
    const [isPending,startTransition] = useTransition()
    const deleteComment = () => { 

        queryClient.setQueryData(["comments",folderId], (oldData : any) => { 
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
        startTransition(() => { 
            deleteFolderComment(id).then((data) => { 
                if (!data) { 
                    showErrorToast()
                }
            })
        })
    }
    return <div className='flex gap-3 items-start'>

        <Avatar className='w-9 h-9'>
                            <AvatarImage src={image ?? ''} className='object-cover'></AvatarImage>
                            <AvatarFallback><User  size={13}/></AvatarFallback>
        </Avatar>

        <div className='flex-1'>
                <div className='flex gap-2 text-sm items-center'>
                    
                
                    <div className='font-bold'>{name}</div>
                    <div>{timeAgo(createdAt)}</div>

                
                </div>

                <div className='max-h-[300px] overflow-auto font-serif px-1 py-1 text-sm'>
                    {text}
                </div>

                

        </div>

     

            {
                    user?.id === userId &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size={"icon"} variant={"ghost"}><Ellipsis /></Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem variant='destructive' onClick={() => deleteComment()}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                
            }

     
        
        
        

        
        
    </div>
}


