"use client"
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
export const TrainingRecordLineChart = () => {
  const { trainingRecordListQuery } = useTrainingRecordContext();
  const trainingRecordList = trainingRecordListQuery.current?.trainingRecordList || [];
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={trainingRecordList} syncId="lineChart1">
          <XAxis dataKey="date" hide tickFormatter={(date) => new Date(date).toISOString().split('T')[0]} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="weight" />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={trainingRecordList} syncId="lineChart1">
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toISOString().split('T')[0]} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area type="monotone" dataKey="reps" activeDot={{ r: 8 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}