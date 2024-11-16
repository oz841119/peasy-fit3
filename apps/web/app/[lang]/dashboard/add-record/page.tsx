'use client'
import { useForm, Controller } from "react-hook-form";
import { SelectableExerciseListCard } from "@/components/Cards/ExerciseListCard/ExerciseListCard";
import { BaseCard } from "@/components/Cards/BaseCard";
import { Input } from "@/components/shadcnUI/input";
import { Button } from "@/components/shadcnUI/button";
import { addTrainingRecord } from "@/services/trainingRecord";
import { addTrainingRecordFormSchema, AddTrainingRecordFormSchema } from "@/schemas/addTrainingRecord.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

export default function AddRecordPage() {
  const { control, register, handleSubmit } = useForm<AddTrainingRecordFormSchema>({
    resolver: zodResolver(addTrainingRecordFormSchema),
    defaultValues: {
      "date": new Date(),
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
      const a = await addTrainingRecord(record)
      if(a.count > 0) {
        toast({
          title: 'Success',
          description: 'Record added successfully',
        })
      }
      
    } else {
      toast({
        title: 'Please select an exercise',
        variant: 'destructive'
      })
    }
  }, (errors) => {
    const errorKeys = Object.keys(errors)
    if(errorKeys.length > 0) {
      toast({
        title: 'Please fill in all the fields',
        variant: 'destructive',
        description: errorKeys.join(', ')
      })
    } else {
      toast({
        title: 'error',
        variant: 'destructive',
      })
    }
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
