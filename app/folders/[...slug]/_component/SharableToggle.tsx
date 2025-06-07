"use client"

import React, { useState, useTransition } from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { updateFolderById } from '@/server/db/folder'
import { usePrevious } from '@mantine/hooks'
import { showErrorToast } from '@/lib/toast'
import { useQueryClient } from '@tanstack/react-query'


const SharableToggle = ({checked,id,userId} : {checked:boolean,id : string,userId : string} ) => {

    const [isPending,startTransition] = useTransition()
    const [isChecked, setIsChecked] = useState(checked)
    const previous = usePrevious(isChecked)

    const queryClient = useQueryClient()
  return (
    
    <div className="flex items-center space-x-2">
      <Switch id="sharable" className='cursor-pointer' checked={isChecked} onClick={() => { 
        setIsChecked((prev) => !prev)
        
        startTransition(() => { 
            updateFolderById(id,{
                sharable : !isChecked
            }).then((data) => {
                if (!data) { 
                    setIsChecked(previous ?? checked)
                    
                    showErrorToast()
                } else { 
                    queryClient.setQueryData(["folders",userId],(oldData : any) => { 
                
                if (!oldData) { 
                    return oldData
                }
                return { 
                    ...oldData, 
                    pages : oldData.pages.map((page : any) => { 
                        return page.map((folder :any) => {
                            if (folder.id === id) { 
                                return { 
                                    ...folder , 
                                    sharable : !isChecked
                                }
                            }
                            return folder

                        })
                    })
                }
              })
                }
            })
        })
      }}/>
      
      <Label htmlFor="sharable" >Open to Community</Label>
      
      
    </div>
  )
}

export default SharableToggle
