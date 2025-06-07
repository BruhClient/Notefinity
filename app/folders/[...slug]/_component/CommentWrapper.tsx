import { db } from '@/db';
import { folderComments } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import React from 'react'
import CommentButton from './CommentButton';

const CommentWrapper = async ({folderId,folderName , folderCreatedAt } : {folderId : string,folderName : string , folderCreatedAt : Date}) => {

    const countResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(folderComments)
            .where(eq(folderComments.folderId, folderId));
    //@ts-ignore
    const commentAmount = parseInt(countResult[0]?.count) || 0 ;
  return (
    <CommentButton initialCommentAmount={commentAmount} folderName={folderName} folderCreatedAt={folderCreatedAt} folderId={folderId}/>
  )
}

export default CommentWrapper
