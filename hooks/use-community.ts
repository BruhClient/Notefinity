"use client "

import { DEFAULT_FETCH_LIMIT } from "@/data/constants"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFolderFeed = () => {
    const query = useInfiniteQuery({
      queryKey: ["generalFolderFeed"],
      
      
      queryFn: async ({ pageParam = 0 }) => {
        
        const res = await fetch(`/api/folders/feed?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}`)
        if (!res.ok) throw new Error("Failed to fetch Folders")
        
        return res.json() ?? []
      },
      staleTime : 3600 ,
      
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {

       
        if (lastPage.length < DEFAULT_FETCH_LIMIT) {
          return undefined // No more pages
        }
        return lastPageParam + 1
      },
      initialPageParam: 0,
     
     
     
    })
  
    return {
      ...query,
      folders: query.data?.pages.flat() ?? [],
    }
  }