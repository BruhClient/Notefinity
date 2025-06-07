"use cache"

import StatisticCard from '@/components/StatisticCard';
import { db } from '@/db'
import { folders, notes } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import React from 'react'

const NoteCount = async ({userId} : {userId : string}) => {

    const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(notes)
    .where(sql`${notes.userId} = ${userId}`);

    const count = Number(countResult[0].count);

    const updatedDateResult = await db
    .select({ createdAt: notes.createdAt })
    .from(notes)
    .orderBy(desc(notes.createdAt))
    .limit(1).where(sql`${notes.userId} = ${userId}`)

    const latestDate = updatedDateResult[0]?.createdAt;

  return (
    <StatisticCard latestUpdate={latestDate} name='Notes' stat={count} />
  )
}

export default NoteCount
