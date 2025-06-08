"use client"

import React from "react"
import { format } from "date-fns"
import { MotionDiv } from "./Motion"
import { boxVariants } from "@/lib/variants"
const StatisticCard = ({
  latestUpdate,
  name,
  stat,
}: {
  latestUpdate: Date | null
  name: string
  stat: number
}) => {
  return (
    <MotionDiv
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex items-center justify-between px-5 border-black border-2 py-7 rounded-lg shadow-lg"
    >
      <div className="h-full flex gap-4 items-center">
        <div className="w-3 h-14 bg-green-300 rounded-lg" />
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-bold">{name}</div>
          <div className="text-muted-foreground text-serif text-sm">
            Lastest update : {format(latestUpdate ?? Date.now(), "dd-MMM-yyyy")}
          </div>
        </div>
      </div>

      <div className="text-3xl font-bold ">{stat}</div>
    </MotionDiv>
  )
}

export default StatisticCard
