"use client "

import { DEFAULT_FETCH_LIMIT } from "@/data/constants"
import { useInfiniteQuery } from "@tanstack/react-query"




interface UseFoldersOptions {
    userId : string
     
}

export const useFolders = ({userId}: UseFoldersOptions) => {
    const query = useInfiniteQuery({
      queryKey: ["folders",userId],
      
      
      queryFn: async ({ pageParam = 0 }) => {
        
        const res = await fetch(`/api/folders/query?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}`)
        if (!res.ok) throw new Error("Failed to fetch Folders")
        
        return res.json() ?? []
      },
      staleTime : 5 * 60_000 ,
      
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