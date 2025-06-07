import LimitChart from '@/components/LimitChart';
import { pricingTypes } from '@/data/pricingTypes';
import { db } from '@/db';
import { folders } from '@/db/schema';
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


const FolderLimit = async ({userId,plan} : {userId : string,plan : "Free" | "Pro"}) => {

    const result = await db
            .select({
                count: sql<number>`count(*)`,
            })
            .from(folders)
            .where(eq(folders.userId, userId));
    
    const folderCount = Number(result[0]?.count ?? 0);
    
    const folderLimit = pricingTypes[plan].noteAmount


  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Folders Usage</CardTitle>
        <CardDescription>{format(Date.now(),"MMM yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className='h-full flex justify-center items-center'>
        <LimitChart currentNotes={folderCount} noteLimit={folderLimit}/>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none font-medium">
          You have used up <b className='px-1'>{((folderCount / folderLimit) * 100).toFixed(2)}%</b> of your quota
        </div>
        <div className="text-muted-foreground leading-none">
          Deleted folders will not be part of the statistic
        </div>
      </CardFooter>
    </Card>
    
      
    
  )
}

export default FolderLimit
