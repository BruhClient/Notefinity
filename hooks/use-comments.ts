"use client "

import { DEFAULT_FETCH_LIMIT } from "@/data/constants"
import { useInfiniteQuery } from "@tanstack/react-query"




interface UseCommentsOptions {
    folderId : string
     
}

export const useComments = ({folderId}: UseCommentsOptions) => {
    const query = useInfiniteQuery({
      queryKey: ["comments",folderId],
      
      
      queryFn: async ({ pageParam = 0 }) => {
        
        const res = await fetch(`/api/folders/comments?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}&folderId=${folderId}`)
        if (!res.ok) throw new Error("Failed to fetch Comments")
        
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
      comments: query.data?.pages.flat() ?? [],
    }
  }