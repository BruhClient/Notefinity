import React from 'react'
import { db } from '@/db';
import { folderLikes } from '@/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import LikeButton from './LikeButton';

const LikeWrapper = async ({folderId,userId} : {folderId : string,userId : string}) => {
    const likeCountResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(folderLikes)
        .where(eq(folderLikes.folderId, folderId));
    
        //@ts-ignore
      const likeAmount = parseInt(likeCountResult[0]?.count) || 0 ;
    
      // Check if current user liked it
      const userLike = await db
        .select()
        .from(folderLikes)
        .where(and(eq(folderLikes.folderId, folderId), eq(folderLikes.userId, userId)))
        .limit(1);
    
      const hasLiked = userLike.length > 0;
  return (
    <LikeButton initialLikeAmount={likeAmount} initialLike={hasLiked} folderId={folderId}/>
  )
}

export default LikeWrapper
