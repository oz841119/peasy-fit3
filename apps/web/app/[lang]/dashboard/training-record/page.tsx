import { TrainingRecordContextProvider } from "@/contexts/TrainingRecordContext";
import { TrainingRecordLineChartCard } from "@/components/Cards/TrainingRecordLineChartCard/TrainingRecordLineChartCard";
import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { ExerciseSelect } from "@/components/Select/ExerciseSelect/ExerciseSelect";
export default function TrainingRecordPage() {
  return (
    <div>
      <TrainingRecordContextProvider>
        <div className="mb-2">
          <ExerciseSelect />
        </div>
        <div className="h-96">
          <TrainingRecordTableCard className="h-full"/>
          <TrainingRecordLineChartCard />
        </div>
      </TrainingRecordContextProvider>
    </div>
  )
}