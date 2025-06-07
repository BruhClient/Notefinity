
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
} from "@/components/ui/chart"
import LineGraph from '@/components/LineGraph'
import { eq, sql, gte, lte } from 'drizzle-orm';
import { startOfMonth, endOfMonth, format, eachDayOfInterval } from 'date-fns';
import { notes } from '@/db/schema';
import { db } from '@/db';

const chartConfig = {
        notes: {
            label: "notes",
            color: "var(--chart-1)",
        },
} satisfies ChartConfig
const MonthlyActivity = async ({userId} : {userId : string}) => {

    const now = new Date();
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);
    
      // Get notes for the current month for this user
      const rows = await db
        .select({
          date: sql<string>`DATE(${notes.createdAt})`.as('date'),
          count: sql<number>`COUNT(*)`.as('count'),
        })
        .from(notes)
        .where(
          eq(notes.userId, userId) &&
          gte(notes.createdAt, monthStart) &&
          lte(notes.createdAt, monthEnd)
        )
        .groupBy(sql`DATE(${notes.createdAt})`);
    
      const noteCountsMap: Record<string, number> = {};
      for (const row of rows) {
        noteCountsMap[row.date] = row.count;
      }
    
      
    
      
    
      // Step 2: Build full month calendar with 0s for missing days
      const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
      const result: Record<string , number> = {};
    
      for (const day of days) {
        const dayStr = format(day, 'yyyy-MM-dd');
    
    
        result[parseInt(format(day, 'dd'))] = noteCountsMap[dayStr] ?? 0;
      }

    

  

        
      const chartData =  Object.entries(result).map(([day, notes]) => ({
          day,
          notes,
      }));
      

        
      const noteAmount = chartData?.reduce((acc,currentValue) => {
            //@ts-ignore
            return acc += parseInt(currentValue.notes)
        },0) ?? 0

   

        
        
  if (chartData) return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Monthly Activity</CardTitle>
        <CardDescription>{format(Date.now(),"MMM yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className='h-full flex justify-center items-center w-full'>
        <LineGraph chartConfig={chartConfig} chartData={chartData} x='day' y="notes"/>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none font-medium">
          You have saved a total of <b className='px-1'>{noteAmount}</b> notes created this month
        </div>
        <div className="text-muted-foreground leading-none">
          Deleted notes will not be part of the statistic
        </div>
      </CardFooter>
    </Card>
  
  )
}

export default MonthlyActivity


