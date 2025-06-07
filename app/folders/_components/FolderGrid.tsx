"use client"

import { Button } from "@/components/ui/button";
import { useFolders } from "@/hooks/use-folders";
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import {useIntersection} from "@mantine/hooks"
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { colors } from "@/data/constants";
import DeleteFolderButton from "./DeleteFolderButton";
import EditFolderButton from "./EditFolderButton";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence } from "motion/react";
import { MotionDiv } from "@/components/Motion";
import { boxVariants } from "@/lib/variants";
import { Globe } from "lucide-react";
import { timeAgo } from "@/lib/time";

const FolderGrid = ({userId} : {userId : string}) => {

    const {folders,fetchNextPage,hasNextPage,isFetching} = useFolders({userId})


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
    <div className='flex w-full flex-col gap-4 px-3 py-4'>
        <div className="font-bold text-3xl px-2">
          Your Folders
        </div>
        <div
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            
            
          >
            <AnimatePresence>
          
              {folders.map(({ id, name , createdAt ,color,sharable },index) => {
                if (index >= folders.length-1) {
                    return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id} className="break-inside-avoid" ref={ref}><FolderCard name={name} id={id} createdAt={createdAt} color={color} userId={userId} sharable={sharable}/></MotionDiv>);
                 }

                return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id} className="break-inside-avoid"><FolderCard name={name} id={id} createdAt={createdAt} color={color} userId={userId} sharable={sharable}/></MotionDiv>);
              })}

              {
                isFetching && <>
                  
                  <MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" className="break-inside-avoid"><FolderLoadingSkeleton /></MotionDiv>
                  <MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" className="break-inside-avoid"><FolderLoadingSkeleton /></MotionDiv>
                </>
              }
              </AnimatePresence>
            
          </div>

       
        
        {
            folders.length === 0 && !isFetching && <div className='text-muted-foreground self-center'>You have no folders</div>
        }
    </div>
    
  )
}

export default FolderGrid

const FolderCard = ({id,name,createdAt,color,userId,sharable} : {id : string,name : string,createdAt : Date,color : string,userId : string,sharable : boolean})  => { 
    //@ts-ignore
    const colorCode = colors[color]

    const router = useRouter()

    return <Card className="border-black" >
       
            <CardContent className="flex flex-col gap-4" >

              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div className="flex gap-5 h-full items-center">
                    <div className={`w-3 h-12 rounded-lg`} style={{background : colorCode}} />
                    <div className="flex flex-col gap-1">
                      <CardTitle className="lg:text-2xl text-xl break-all">
                        {name}
                      </CardTitle>
                      <CardDescription >
                        {timeAgo(createdAt)}
                      </CardDescription>
                  </div>
                </div>
                
                {sharable && <Globe  size={15}/>}
                

              </div>
              

              
              <div className="flex gap-2 justify-end flex-1  ">
                <Button onClick={() => router.push(`/folders/${id}`)}>View Folder</Button>
              
                <DeleteFolderButton id={id} userId={userId}/>
                <EditFolderButton id={id} name={name} userId={userId}/>
                
               
              </div>
              
              
            </CardContent>
            
            
    </Card>
}


const FolderLoadingSkeleton = () => { 
  return ( 
    <Card className="border-black break-inside-avoid " >
       
            <CardContent className="flex flex-col gap-4 " >

              <div className="flex justify-between items-center gap-3 ">
                <div className="flex gap-5 h-full items-center ">
                  
                  <Skeleton  className="w-3 h-12 rounded-lg"/>
                  <div className="flex flex-col gap-1">
                    <Skeleton  className="w-24 h-8 rounded-lg"/>
                    <Skeleton  className="w-12 h-6 rounded-lg"/>
                  </div>
              </div>

              </div>
              

              
              <div className="flex gap-2 justify-end ">
                <Skeleton className="w-18 h-8"/>
                <Skeleton className="w-8 h-8"/>
                <Skeleton className="w-8 h-8"/>
                
               
              </div>
              
              
            </CardContent>
            
            
    </Card>
  )
}
