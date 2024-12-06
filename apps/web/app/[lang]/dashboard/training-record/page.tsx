'use client'
import { TrainingRecordContextProvider, useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { TrainingRecordLineChartCard } from "@/components/Cards/TrainingRecordLineChartCard/TrainingRecordLineChartCard";
import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcnUI/select";
import { useTranslations } from "next-intl";
export default function TrainingRecordPage() {
  const t = useTranslations()
  const { filter, updateFilter, exerciseList } = useTrainingRecordContext()
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <Select
          defaultValue={filter.exerciseId?.toString()}
          onValueChange={(value) => updateFilter(draft => {
            draft.exerciseId = Number(value)
          })}
        >
          <SelectTrigger className="w-48">
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
          <SelectTrigger className="w-48">
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