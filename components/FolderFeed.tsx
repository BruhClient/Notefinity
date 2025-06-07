"use client"

import { useFolderFeed } from '@/hooks/use-community';
import { useIntersection } from '@mantine/hooks';
import React, { useEffect, useRef } from 'react'
import { MotionDiv } from './Motion';
import { AnimatePresence } from 'motion/react';
import { boxVariants } from '@/lib/variants';
import {  FolderCard, FolderLoadingSkeleton } from './FolderCard';

const FolderFeed = () => {

    const {folders,fetchNextPage,hasNextPage,isFetching} = useFolderFeed()
    
    
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
    
        
        <div
            className="columns-1 sm:columns-2 md:columns-3 2xl:columns-4 gap-4 space-y-4 py-4"
            
            
          >
            <AnimatePresence>
          
              {folders.map(({ id, name ,createdAt,username,image ,likeCount,commentCount },index) => {
                if (index >= folders.length-1) {
                    return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id} className="break-inside-avoid" ref={ref}><FolderCard name={name} id={id} createdAt={createdAt} username={username} image={image} likes={likeCount} comments={commentCount} /></MotionDiv>);
                 }

                return (<MotionDiv variants={boxVariants} initial="hidden" animate="visible" exit="exit" key={id} className="break-inside-avoid"><FolderCard name={name} id={id} createdAt={createdAt} username={username} image={image} likes={likeCount} comments={commentCount} /></MotionDiv>);
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

export default FolderFeed


