import LimitChart from '@/components/LimitChart';
import { pricingTypes } from '@/data/pricingTypes';
import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns';
const NoteLimit = async ({userId,plan} : {userId : string,plan : "Free" | "Pro"}) => {

    const result = await db
            .select({
                count: sql<number>`count(*)`,
            })
            .from(notes)
            .where(eq(notes.userId, userId));
    
    const notesCount = Number(result[0]?.count ?? 0);
    
    const noteLimit = pricingTypes[plan].noteAmount


  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Notes Usage</CardTitle>
        <CardDescription>{format(Date.now(),"MMM yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className='h-full flex justify-center items-center'>
        <LimitChart currentNotes={notesCount} noteLimit={noteLimit}/>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none font-medium">
          You have used up <b className='px-1'>{((notesCount / noteLimit) * 100).toFixed(2)}%</b> of your quota
        </div>
        <div className="text-muted-foreground leading-none">
          Deleted notes will not be part of the statistic
        </div>
      </CardFooter>
    </Card>
    
      
    
  )
}

export default NoteLimit
