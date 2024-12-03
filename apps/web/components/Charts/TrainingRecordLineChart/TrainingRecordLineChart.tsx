"use client"
import { ChartContainer } from "@/components/shadcnUI/chart";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
import { useMemo } from "react";
import { XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts';
export const TrainingRecordLineChart = () => {
  const { trainingRecordListQuery } = useTrainingRecordContext();
  const trainingRecordList = trainingRecordListQuery.current?.trainingRecordList || [];
  const chartData = useMemo(() => {
    return trainingRecordList.map(record => ({
      date: record.date,
      weight: record.weight,
      reps: record.reps,
      volume: record.weight * record.reps,
    })).reverse()
  }, [trainingRecordList])
  const chartConfig = {
    weight: {
      label: "Weight",
      color: "hsl(var(--chart-1))",
    },
    reps: {
      label: "Reps",
      color: "hsl(var(--chart-2))",
    },
    volume: {
      label: "Volume",
      color: "hsl(var(--chart-3))",
    }
  }
  console.log(chartData);
  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-20 h-20 w-full">
        <AreaChart data={chartData} syncId="lineChart1">
          <XAxis dataKey="date" hide tickFormatter={(date) => new Date(date).toISOString().split('T')[0]} />
          <YAxis domain={['dataMin', 'dataMax']} type="number"/>
          <Tooltip />
          <Area
            dataKey="weight"
            type="natural"
            fill="var(--color-weight)"
            fillOpacity={0.4}
            stroke="var(--color-weight)"
            stackId="a" />
        </AreaChart>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="min-h-20 h-20 w-full">
        <AreaChart data={chartData} syncId="lineChart1">
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toISOString().split('T')[0]} />
          <YAxis domain={['dataMin', 'dataMax']} type="number"/>
          <Tooltip />
          <Area
            dataKey="reps"
            type="natural"
            fill="var(--color-reps)"
            fillOpacity={0.4}
            stroke="var(--color-reps)"
            stackId="a" />
        </AreaChart>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="min-h-20 h-20 w-full">
        <AreaChart data={chartData} syncId="lineChart1">
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toISOString().split('T')[0]} />
          <YAxis domain={['dataMin', 'dataMax']} type="number"/>
          <Tooltip />
          <Area
            dataKey="volume"
            type="natural"
            fill="var(--color-volume)"
            fillOpacity={0.4}
            stroke="var(--color-volume)"
            stackId="a" />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}