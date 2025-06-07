"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toggleFolderLike } from '@/server/folderLikes'
import { usePrevious } from '@mantine/hooks'
import { Heart } from 'lucide-react'
import React, { useState, useTransition } from 'react'

const LikeButton = ({folderId,initialLike,initialLikeAmount } : {folderId : string , initialLike : boolean , initialLikeAmount : number}) => {

    const [isLiked,setIsLiked] = useState(initialLike)

    const [likeAmount,setLikeAmount] = useState(initialLikeAmount)

    
    const [isPending,startTransition] = useTransition()

    const previousLike = usePrevious(isLiked) 

    const previousLikeAmount = usePrevious(likeAmount)

    const toggleLike = () => { 

        setIsLiked((prev) => !prev)

        setLikeAmount((prev) => { 
            if (isLiked) { 
                return prev -1 
            } else { 
                return prev + 1
            }
        })

        startTransition(() => { 
            toggleFolderLike(folderId).then((data) => { 
                if (!data) { 
                    setIsLiked(previousLike ?? initialLike)
                    setLikeAmount(previousLikeAmount ?? initialLikeAmount)

                }
            })
        })
    }

  return (
    <Button variant={"ghost"} onClick={() => toggleLike()}>
      {likeAmount} <Heart className={cn(isLiked && "fill-red-400 stroke-red-400")}/>
    </Button>
  )
}

export default LikeButton
