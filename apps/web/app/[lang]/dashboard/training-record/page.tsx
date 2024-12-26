'use client'
import { TrainingRecordContextProvider, useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { TrainingRecordLineChartCard } from "@/components/Cards/TrainingRecordLineChartCard/TrainingRecordLineChartCard";
import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcnUI/select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
export default function TrainingRecordPage() {
  const t = useTranslations()
  const { filter, updateFilter, exerciseList } = useTrainingRecordContext()
  const [isSelectPrompt, setIsSelectPrompt] = useState<boolean>(true)
  return (
    <div>
      <div className="mb-2 flex flex-col gap-2 flex-wrap max-w-md sm:flex-row">
        <Select
          defaultValue={filter.exerciseId?.toString()}
          onValueChange={(value) => updateFilter(draft => {
            draft.exerciseId = Number(value)
          })}
          onOpenChange={() => {
            isSelectPrompt && setIsSelectPrompt(false)
          }}
        >
          <SelectTrigger className={cn('flex-1', isSelectPrompt && 'border-red-500 border-2')}>
            <SelectValue placeholder={t('table.selectExercise')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {exerciseList.current?.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id.toString()}>{exercise.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          defaultValue={filter.take?.toString()}
          onValueChange={(value) => {
            console.log(value);
            updateFilter(draft => {
              draft.take = value === 'all' ? null : parseInt(value)
              draft.skip = 0
            })
          }}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select exercise" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">{t('table.latestRecords', { count: 10 })}</SelectItem>
              <SelectItem value="20">{t('table.latestRecords', { count: 20 })}</SelectItem>
              <SelectItem value="30">{t('table.latestRecords', { count: 30 })}</SelectItem>
              <SelectItem value="all">{t('table.allRecords')}</SelectItem>
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
    </div>
  )
}