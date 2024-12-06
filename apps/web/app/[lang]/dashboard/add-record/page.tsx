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
import { parseWeightToKg } from "@/lib/parseWeightToKg";
import { useState } from "react";
import { UploadRecordPreviewTable } from "@/components/Tables/UploadRecordPreviewTable";
import { getExerciseByNames } from "@/services/public/exericse";
import { addUserExercise } from "@/services/userExercise";
import { useQueryClient } from "@tanstack/react-query";
export default function AddRecordPage() {
  const { control, register, handleSubmit } = useForm<AddTrainingRecordFormSchema>({
    resolver: zodResolver(addTrainingRecordFormSchema),
    defaultValues: {
      "date": new Date(),
    }
  });

  const onSubmit = handleSubmit(async (form) => {
    if (form.exerciseId) {
      const record = Array(Number(form.sets)).fill({
        date: form.date,
        exerciseId: Number(form.exerciseId),
        weight: Number(form.weight),
        reps: Number(form.reps),
        comment: form.comment,
      })
      const addTrainingRecordResult = await addTrainingRecord(record)
      if (addTrainingRecordResult.count > 0) {
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
    if (errorKeys.length > 0) {
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

  const [uploadCSVRecord, setUploadCSVRecord] = useState<{ date: string, name: string, weight: number, reps: number, comment: string }[]>([])
  const onUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      setUploadCSVRecord([])
      return
    }
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = async (event) => {
      if (!event.target?.result) return
      const text = event.target.result as string
      const rows = text.split('\n')
      const records = rows.slice(1).map(row => {
        const [date, name, weight, reps, comment] = row.split(',')
        return {
          date: date,
          name: name,
          weight: parseWeightToKg(weight),
          reps: Number(reps),
          comment: comment?.trim() || ''
        }
      })
      if (records.length > 0) {
        toast({
          title: '上傳成功',
          description: `請查看預覽表格後點擊送出`
        })
        setUploadCSVRecord(records)
      } else {
        toast({
          title: 'CSV格式錯誤',
          description: '請確保CSV文件格式正確',
          variant: 'destructive'
        })
      }
    }
    reader.readAsText(file)
  }
  const queryClient = useQueryClient();
  const onUploadCSVSubmit = async () => {
    const exerciseNames = Array.from(new Set(uploadCSVRecord.map(record => record.name)))
    await addUserExercise({ exerciseList: exerciseNames })
    const exerciseList = await getExerciseByNames(exerciseNames)
    const recordList = uploadCSVRecord.map(record => {
      const exerciseId = exerciseList.find(exercise => exercise.name === record.name)?.id
      if(exerciseId === undefined) throw new Error('Exercise not found')
      return {
        date: new Date(record.date),
        exerciseId: exerciseId,
        weight: record.weight,
        reps: record.reps,
        comment: record.comment
      }
    })
    const addTrainingRecordResult = await addTrainingRecord(recordList)
    console.log(addTrainingRecordResult);
    queryClient.invalidateQueries({ queryKey: ['exerciseList'] })
  }
  return (
    <div>
      <form className="flex flex-col gap-4 mb-4" onSubmit={onSubmit}>
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
            <Input type="number" placeholder="Weight" {...register('weight', { required: true, valueAsNumber: true })} />
            <Input type="number" placeholder="Reps" {...register('reps', { required: true, valueAsNumber: true })} />
            <Input type="number" placeholder="Sets" {...register('sets', { required: true, valueAsNumber: true })} />
            <Input type="text" placeholder="Comment" {...register('comment')} />
            <Button type="submit" variant="secondary">Submit</Button>
            <Button type="reset" variant="ghost">Reset</Button>
          </div>
        </BaseCard>
      </form>
      <BaseCard title="Upload CSV" description="Upload a CSV file to add records">
        <div className="flex gap-4">
          <Input
            id="csv"
            type="file"
            className="w-72 mb-4"
            accept=".csv"
            onChange={onUploadCSV}
          />
          { uploadCSVRecord.length > 0 && <Button variant="secondary" onClick={onUploadCSVSubmit}>Submit</Button> }
        </div>
        { uploadCSVRecord.length > 0 && <UploadRecordPreviewTable records={uploadCSVRecord} /> }
      </BaseCard>
    </div>
  )
}
