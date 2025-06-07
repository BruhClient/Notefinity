"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {useIntersection} from "@mantine/hooks"
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { colors } from "@/data/constants";
import { useNotes } from "@/hooks/use-notes";
import TextRenderer from "@/components/TextRenderer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NoteUpdator from "@/components/NoteUpdator";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence } from "motion/react";
import { MotionDiv } from "@/components/Motion";
import { boxVariants } from "@/lib/variants";
import { timeAgo } from '@/lib/time';

const NoteMasonry = ({userId,folderId ,isOwner} : {userId : string,folderId : string,isOwner : boolean}) => {

    const {notes,fetchNextPage,hasNextPage,isFetching} = useNotes({userId,folderId})


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
    <div >
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">

            <AnimatePresence >
            {notes.map(({ id, title  ,color , html ,starred ,text ,updatedAt },index) => {
                if (index >= notes.length-1) {
                    return (<MotionDiv initial="hidden" variants={boxVariants} animate="visible" exit="exit" className="break-inside-avoid" key={id} ref={ref}><NoteCard isOwner={isOwner} id={id} htmlText={html} updatedAt={updatedAt} color={color} userId={userId} folderId={folderId} title={title} starred={starred} text={text}/></MotionDiv>);
                 }

                return (<MotionDiv initial="hidden" variants={boxVariants} animate="visible" exit="exit" className="break-inside-avoid" key={id}><NoteCard isOwner={isOwner}  id={id} htmlText={html} updatedAt={updatedAt} color={color} userId={userId} folderId={folderId} title={title} starred={starred} text={text}/></MotionDiv>);
              })}

              {
                isFetching && (
                    <>
                        <MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit"><NoteLoadingSkeleton /></MotionDiv>
                        <MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit"><NoteLoadingSkeleton /></MotionDiv>
                    </>
                )
              }
              </AnimatePresence>
        </div>

       
        
  
    </div>
    
  )
}

export default NoteMasonry

const NoteCard = ({title,htmlText,color,id,updatedAt,userId ,folderId , starred,text ,isOwner } : {text: string,title : string , isOwner : boolean ,  htmlText: string , color : string , id : string,updatedAt : Date,userId : string , folderId : string,starred : boolean}) => { 

    //@ts-ignore
    const colorCode = colors[color]
    const [open, setOpen] = useState(false);

    if (!isOwner) return <Card className="border-black relative overflow-hidden transition-colors ease-in-out duration-200 ">
        
                <CardContent>
                        <div className="flex justify-between gap-2 items-start">
                            <div className="flex flex-col gap-1">
                                <CardTitle>
                                    {title}
                                </CardTitle>
                                <CardDescription>Latest update : {format(updatedAt,"dd-MMM-yyyy HH:mm")}</CardDescription>
                            </div>

                            {starred && <Star className="fill-amber-400 stroke-amber-400"/>} 

                        </div>
                        


                        <div className="py-5">
                            <TextRenderer html={htmlText}/>
                        </div>
                        
                    </CardContent>
                    <div  className="w-full h-5 absolute bottom-0" style={{background : colorCode}}/>
            </Card>
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Card className="border-black relative overflow-hidden hover:bg-muted cursor-pointer transition-colors ease-in-out duration-200 ">
        
                <CardContent>
                        <div className="flex justify-between gap-2 items-start">
                            <div className="flex flex-col gap-1">
                                <CardTitle>
                                    {title}
                                </CardTitle>
                                <CardDescription>Latest update : {timeAgo(updatedAt)}</CardDescription>
                            </div>

                            {starred && <Star className="fill-amber-400 stroke-amber-400"/>} 

                        </div>
                        


                        <div className="py-5">
                            <TextRenderer html={htmlText}/>
                        </div>
                        
                    </CardContent>
                    <div  className="w-full h-5 absolute bottom-0" style={{background : colorCode}}/>
            </Card>

        </DialogTrigger>
        <DialogContent>
            <DialogTitle className="text-sm text-muted-foreground font-normal">
                Last Update : {timeAgo(updatedAt)}
            </DialogTitle>
            <NoteUpdator setOpen={setOpen} id={id} userId={userId} folderId={folderId} noteContent={{title : title , content : {html : htmlText ?? "", text : text ?? "" } , starred: starred}} note={{title,html : htmlText,color,id,updatedAt,userId ,folderId , starred,text }} />
        </DialogContent>
        </Dialog>
            
}


const NoteLoadingSkeleton = () => { 
  return ( 
    <Card className="border-black relative overflow-hidden hover:bg-muted cursor-pointer transition-colors ease-in-out duration-200 break-inside-avoid" >
        
                <CardContent>
                        <div className="flex justify-between gap-2 items-start">
                            <div className="flex flex-col gap-1">
                                <Skeleton className="w-24 h-4"/>
                                <Skeleton className="w-12 h-4"/>
                            </div>

                            

                        </div>
                        


                        <div className="py-5 flex flex-col gap-2">
                            <Skeleton className="w-full h-4"/>
                            <Skeleton className="w-full h-4"/>
                            <Skeleton className="w-1/2 h-4"/>
                        </div>
                        
                    </CardContent>
                    <Skeleton className="w-full h-5 absolute bottom-0" />
              
    </Card>
  )
}
