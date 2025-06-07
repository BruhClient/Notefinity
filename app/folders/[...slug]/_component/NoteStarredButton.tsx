"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { updateNoteById } from '@/server/db/note'
import { usePrevious } from '@mantine/hooks'
import { Star } from 'lucide-react'
import React, { useState, useTransition } from 'react'

const NoteStarredButton = ({starred,id} : {starred : boolean , id : string}) => {


    const [isStarred,setIsStarred] = useState(starred)
    const [isPending,startTransition] = useTransition()

    const previous = usePrevious(isStarred)
  return (
    <Button type='button' size={"icon"} variant={"outline"} onClick={() => { 
        setIsStarred((prev) => !prev)
        startTransition(() => { 
            updateNoteById(id,{
                starred : !isStarred
            }).then((data) => { 
                if (!data) { 
                    setIsStarred(previous ?? starred)
                }
            })
        })

    }}><Star className={cn(isStarred && "stroke-amber-400 fill-amber-400")} /></Button>         
  )
}

export default NoteStarredButton
