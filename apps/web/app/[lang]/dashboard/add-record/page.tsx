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
import { useEffect, useMemo, useRef, useState } from "react";
import { UploadRecordPreviewTable } from "@/components/Tables/UploadRecordPreviewTable";
import { getExerciseByNames } from "@/services/public/exericse";
import { addUserExercise } from "@/services/userExercise";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcnUI/select";
import { useUserTrainingSessions, useUserTrainingSessionStatus } from "@/hooks/queries/useTrainingSession";
export default function AddRecordPage() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const t = useTranslations()
  const { control, register, handleSubmit, setValue, reset } = useForm<AddTrainingRecordFormSchema>({
    resolver: zodResolver(addTrainingRecordFormSchema),
    defaultValues: {
      "date": new Date(),
      "trainingSessionId": ''
    }
  });

  const onSubmit = handleSubmit(async (form) => {
    if (form.exerciseId) {
      const record = Array<Parameters<typeof addTrainingRecord>[0][number]>(Number(form.sets)).fill({
        date: form.date,
        exerciseId: Number(form.exerciseId),
        weight: Number(form.weight),
        reps: Number(form.reps),
        comment: form.comment,
        trainingSessionId: form.trainingSessionId
      })
      try {
        setIsSubmitLoading(true)
        const addTrainingRecordResult = await addTrainingRecord(record)
        if (addTrainingRecordResult.count > 0) {
          toast({
            title: 'Success',
            description: 'Record added successfully',
          })
        }
      } catch (err) {
        toast({
          title: 'Error',
          variant: 'destructive',
        })
        console.error(err);
      } finally {
        setIsSubmitLoading(false)
      }
    } else {
      toast({
        title: 'Please select an exercise',
        variant: 'destructive'
      })
    }
  }, (errors) => {
    console.log(errors);
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
  const csvFileInputRef = useRef<null | HTMLInputElement>(null)
  const onUploadCSVSubmit = async () => {
    try {
      setIsSubmitLoading(true)
      const exerciseNames = Array.from(new Set(uploadCSVRecord.map(record => record.name)))
      await addUserExercise({ exerciseList: exerciseNames })
      const exerciseList = await getExerciseByNames(exerciseNames)
      const recordList = uploadCSVRecord.map(record => {
        const exerciseId = exerciseList.find(exercise => exercise.name === record.name)?.id
        if (exerciseId === undefined) throw new Error('Exercise not found')
        return {
          date: new Date(record.date),
          exerciseId: exerciseId,
          weight: record.weight,
          reps: record.reps,
          comment: record.comment,
          trainingSessionId: null
        }
      })
      const addTrainingRecordResult = await addTrainingRecord(recordList)
      queryClient.invalidateQueries({ queryKey: ['exerciseList'] })
      toast({
        title: '訓練紀錄上傳成功',
        description: `已上傳 ${addTrainingRecordResult.count} 筆記錄`,
        variant: 'default'
      })
      setUploadCSVRecord([])
      if (csvFileInputRef.current) {
        csvFileInputRef.current.value = ''
      }
    } catch (err) {
      console.error(err);
      toast({
        title: '訓練紀錄上傳失敗',
        description: `發生異常`,
        variant: 'destructive'
      })
    } finally {
      setIsSubmitLoading(false)
    }
  }
  const { data: trainingSessionStatus } = useUserTrainingSessionStatus()
  const { data: trainingSessions } = useUserTrainingSessions()
  const trainingSessionOptions = useMemo(() => {
    const pastSessions = trainingSessions?.map(session => ({
      value: session.id.toString(),
      label: session.name
    })) || []
    const currentSession = trainingSessionStatus?.trainingSession
    if (currentSession) {
      const filteredPastSessions = pastSessions.filter(
        session => session.value !== currentSession.id.toString()
      )
      return [{
        value: currentSession.id.toString(),
        label: currentSession.name
      }, ...filteredPastSessions]
    } else {
      return pastSessions
    }
  }, [trainingSessions, trainingSessionStatus])
  useEffect(() => {
    if (trainingSessionStatus?.isActive) {
      trainingSessionOptions.length > 0 && reset({
        trainingSessionId: trainingSessionOptions[0].value,
        date: new Date(),
      })
    }
  }, [trainingSessionOptions, trainingSessionStatus])
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
        <BaseCard title={t('card.trainingContent.title')} description={t('card.trainingContent.description')}>
          <div className="flex flex-col gap-4">
            <Controller
              name="trainingSessionId"
              control={control}
              render={({ field: { value, onChange, } }) => {
                console.log(value);
                return (
                  <Select
                    value={value?.toString() || ''}
                    onValueChange={(value) => onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('msg.hint.pleaseSelectSession')} />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        trainingSessionOptions.length > 0 ? trainingSessionOptions.map(option => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        )) : <SelectItem value="empty" disabled>
                          {t('msg.hint.notSession')}
                        </SelectItem>
                      }
                    </SelectContent>
                  </Select>
                )
              }}
            />
            <Input type="number" placeholder="Weight" {...register('weight', { required: true, valueAsNumber: true })} />
            <Input type="number" placeholder="Reps" {...register('reps', { required: true, valueAsNumber: true })} />
            <Input type="number" placeholder="Sets" {...register('sets', { required: true, valueAsNumber: true })} />
            <Input type="text" placeholder="Comment" {...register('comment')} />
            <Button type="submit" variant="secondary" disabled={isSubmitLoading}>
              {isSubmitLoading ? <Loader2 className="animate-spin" /> : <span>{t('common.submit')}</span>}
            </Button>
            <Button type="reset" variant="ghost" disabled={isSubmitLoading}>{t('common.reset')}</Button>
          </div>
        </BaseCard>
      </form>
      <BaseCard title={t('card.uploadCSV.title')} description={t('card.uploadCSV.description')}>
        <div className="flex gap-4">
          <Input
            ref={csvFileInputRef}
            id="csv"
            type="file"
            className="w-72 mb-4"
            accept=".csv"
            onChange={onUploadCSV}
          />
          {
            uploadCSVRecord.length > 0
            && (
              <Button variant="secondary" onClick={onUploadCSVSubmit} disabled={isSubmitLoading}>
                {isSubmitLoading ? <Loader2 className="animate-spin" /> : <span>{t('common.submit')}</span>}
              </Button>
            )
          }
        </div>
        {uploadCSVRecord.length > 0 && <UploadRecordPreviewTable records={uploadCSVRecord} />}
      </BaseCard>
    </div>
  )
}
