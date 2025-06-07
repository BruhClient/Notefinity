"use client"
import React from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"


const LineGraph = ({chartConfig , chartData,x,y} : { chartConfig : ChartConfig , chartData : any , x : string ,y : number | string}) => {

  return (
    <ChartContainer config={chartConfig} className='w-full'>
          <LineChart
            accessibilityLayer
            data={chartData}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={x}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey={y}
              type="linear"
              stroke={`var(--color-${y})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
    </ChartContainer>
  )
}

export default LineGraph
