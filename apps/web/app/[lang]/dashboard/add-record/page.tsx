'use client'
import { useForm, Controller } from "react-hook-form";
import { SelectableExerciseListCard } from "@/components/Cards/ExerciseListCard/ExerciseListCard";
import { BaseCard } from "@/components/Cards/BaseCard";
import { Input } from "@/components/shadcnUI/input";
import { Button } from "@/components/shadcnUI/button";
import { addTrainingRecord } from "@/services/trainingRecord";
import { addTrainingRecordFormSchema, AddTrainingRecordFormSchema } from "@/schemas/addTrainingRecord.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function AddRecordPage() {
  const { control, register, handleSubmit } = useForm<AddTrainingRecordFormSchema>({
    resolver: zodResolver(addTrainingRecordFormSchema),
    defaultValues: {
      "date": new Date(),
      "exerciseId": 0,
      "weight": 0,
      "reps": 0,
      "sets": 0,
      "comment": ''
    }
  });
  
  const onSubmit = handleSubmit(async (form) => {
    if(form.exerciseId) {
      const record = Array(Number(form.sets)).fill({
        date: form.date,
        exerciseId: Number(form.exerciseId),
        weight: Number(form.weight),
        reps: Number(form.reps),
        comment: form.comment,
      })
      await addTrainingRecord(record)
    }
  }, (errors) => {
    console.log(errors);
  })
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Controller
          name="exerciseId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectableExerciseListCard
              selectId={value}
              onSelect={(exercise) => onChange(exercise.id)}
            />
          )}
        />
        <BaseCard title="Content" description="Your Content">
          <div className="flex flex-col gap-4">
            <Input type="number" placeholder="Weight" {...register('weight', { required: true, valueAsNumber: true })}/>
            <Input type="number" placeholder="Reps" {...register('reps', { required: true, valueAsNumber: true })}/>
            <Input type="number" placeholder="Sets" {...register('sets', { required: true, valueAsNumber: true })}/>
            <Input type="text" placeholder="Comment" {...register('comment')}/>
            <Button type="submit" variant="secondary">Submit</Button>
            <Button type="reset" variant="ghost">Reset</Button>
          </div>
        </BaseCard>
      </form>
    </div>
  )
}
