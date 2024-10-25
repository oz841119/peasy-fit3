import { TrainingRecordLineChartCard } from "@/components/Cards/TrainingRecordLineChartCard/TrainingRecordLineChartCard";
import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { ExerciseSelect } from "@/components/Select/ExerciseSelect/ExerciseSelect";
export default function TrainingRecordPage() {
  return (
    <div>
      <div className="mb-2">
        <ExerciseSelect/>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <TrainingRecordTableCard/>
        <TrainingRecordLineChartCard/>
      </div>
    </div>
  )
}