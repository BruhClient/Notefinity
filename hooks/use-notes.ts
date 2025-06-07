"use client "

import { DEFAULT_FETCH_LIMIT } from "@/data/constants"
import { useInfiniteQuery } from "@tanstack/react-query"




interface UseNotesOptions {
    userId : string, 
    folderId : string
     
}

export const useNotes = ({userId,folderId}: UseNotesOptions) => {
    const query = useInfiniteQuery({
      queryKey: ["notes",folderId,userId],
      
      
      queryFn: async ({ pageParam = 0 }) => {
        
        const res = await fetch(`/api/notes/query?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}&folderId=${folderId}&userId=${userId}`)
        if (!res.ok) throw new Error("Failed to fetch Notes")
        
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
      notes: query.data?.pages.flat() ?? [],
    }
  }