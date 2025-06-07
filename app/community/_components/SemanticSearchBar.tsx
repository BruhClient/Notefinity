"use client"

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SemanticSearchBar = () => {

  const [input,setInput] = useState("")
  const debouncedSearch = useDebounce(input,800)
  const pathname = usePathname()

  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedSearch) {
      params.set("q", debouncedSearch)
    } else {
      params.delete("q")
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [debouncedSearch, router, pathname, searchParams])

  
  return (
    <div className='flex justify-center gap-3'>
      <Input className='max-w-[500px]' value={input} onChange={(e) => setInput(e.target.value) } placeholder='Search for a folder' />
      
    </div>
  )
}

export default SemanticSearchBar
