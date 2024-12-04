"use client"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcnUI/chart";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
import { onePone, zeroPNine } from "@/lib/multiply";
import dayjs from "dayjs";
import { useMemo } from "react";
import { XAxis, YAxis, Tooltip, Area, AreaChart, Line, LineChart, Legend, } from 'recharts';
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
    },
  }
  console.log(chartData);
  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-20 h-20 w-full">
        <AreaChart data={chartData} syncId="trainingRecordChart">
          <YAxis domain={[zeroPNine, onePone]} type="number" hide />
          <ChartTooltip content={<ChartTooltipContent labelFormatter={(_, payload) => dayjs(payload[0].payload.date).format("YYYY-MM-DD")} />} /> 
          <Legend verticalAlign="middle" formatter={() => 'Weight'} />
          <Area
            dataKey="weight"
            type="natural"
            fill="var(--color-weight)"
            fillOpacity={0.4}
            stroke="var(--color-weight)"
          />
        </AreaChart>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="min-h-20 h-20 w-full">
        <AreaChart data={chartData} syncId="trainingRecordChart">
          <YAxis domain={[zeroPNine, onePone]} type="number" hide />
          <ChartTooltip content={<ChartTooltipContent labelFormatter={(_, payload) => dayjs(payload[0].payload.date).format("YYYY-MM-DD")} />} />
          <Legend verticalAlign="middle" formatter={() => 'Reps'} />
          <Area
            dataKey="reps"
            type="natural"
            fill="var(--color-reps)"
            fillOpacity={0.4}
            stroke="var(--color-reps)"
          />
        </AreaChart>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="min-h-20 h-20 w-full">
        <AreaChart data={chartData} syncId="trainingRecordChart">
          <YAxis domain={[zeroPNine, onePone]} type="number" hide />
          <Legend verticalAlign="middle" formatter={() => 'Volume'} />
          <ChartTooltip content={<ChartTooltipContent labelFormatter={(_, payload) => dayjs(payload[0].payload.date).format("YYYY-MM-DD")} />} />
          <Area
            dataKey="volume"
            type="natural"
            fill="var(--color-volume)"
            fillOpacity={0.4}
            stroke="var(--color-volume)"
          />
        </AreaChart>
      </ChartContainer>
      <ChartContainer config={chartConfig} className="min-h-10 h-10 w-full">
        <AreaChart data={chartData} syncId="trainingRecordChart">
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toISOString().split('T')[0]} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}