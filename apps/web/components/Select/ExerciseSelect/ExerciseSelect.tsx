"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcnUI/select"
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
export const ExerciseSelect = () => {
  const { filter, updateFilter, exerciseList } = useTrainingRecordContext()
  return (
    <Select // TODO: purify the component
      value={filter.exerciseId?.toString() || ''}
      onValueChange={(value) => updateFilter(draft => {
        draft.exerciseId = Number(value)
      })}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select exercise" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {exerciseList.current?.map((exercise) => (
            <SelectItem key={exercise.id} value={exercise.id.toString()}>{exercise.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}