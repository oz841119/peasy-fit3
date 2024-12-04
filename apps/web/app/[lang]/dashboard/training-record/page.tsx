'use client'
import { TrainingRecordContextProvider, useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { TrainingRecordLineChartCard } from "@/components/Cards/TrainingRecordLineChartCard/TrainingRecordLineChartCard";
import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { ExerciseSelect } from "@/components/Select/ExerciseSelect/ExerciseSelect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcnUI/select";
export default function TrainingRecordPage() {
  const { filter, updateFilter } = useTrainingRecordContext()
  return (
    <div>
      <TrainingRecordContextProvider>
        <div className="mb-2 flex gap-2">
          <ExerciseSelect />
          <Select 
            value={filter.take.toString()}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select exercise"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">Show 10 records</SelectItem>
                <SelectItem value="20">Show 20 records</SelectItem>
                <SelectItem value="30">Show 30 records</SelectItem>
                <SelectItem value="all">Show ALL records</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-2">
          <TrainingRecordTableCard />
        </div>
        <div>
          <TrainingRecordLineChartCard />
        </div>
      </TrainingRecordContextProvider>
    </div>
  )
}