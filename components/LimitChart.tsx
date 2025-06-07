'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

// lib/chart-configs/noteLimitChartConfig.ts

function getNoteLimitChartConfig(currentNotes: number, noteLimit: number) {
  return [
    { name: 'Used', value: currentNotes },
    { name: 'Remaining', value: Math.max(noteLimit - currentNotes, 0) },
  ];
}


type NoteLimitChartProps = {
  currentNotes: number;
  noteLimit: number;
};

const LimitChart = ({ currentNotes, noteLimit }: NoteLimitChartProps) => {
  const rawData = getNoteLimitChartConfig(currentNotes, noteLimit);

  const data = rawData.map((item) => ({
    ...item,
    fill: item.name === 'Used' ? '#22c55e' : '#ef4444',
  }));

  return (
  
     
      <div className="w-full h-72 ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
       
            />
            
            <Bar dataKey="value" barSize={100} radius={10}>
              <LabelList dataKey="value" position="top" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
   
  );
};

export default LimitChart;