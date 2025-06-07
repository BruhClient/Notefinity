"use cache"

import StatisticCard from '@/components/StatisticCard';
import { db } from '@/db'
import { folders } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import React from 'react'


const FolderCount = async ({userId} : {userId : string}) => {
    
    
    const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(folders)
    .where(sql`${folders.userId} = ${userId}`);

    const count = Number(countResult[0].count);

    const updatedDateResult = await db
    .select({ createdAt: folders.createdAt })
    .from(folders)
    .orderBy(desc(folders.createdAt))
    .limit(1).where(sql`${folders.userId} = ${userId}`)

    const latestDate = updatedDateResult[0]?.createdAt;

  return (
    <StatisticCard latestUpdate={latestDate} name='Folders' stat={count} />
  )
}

export default FolderCount
