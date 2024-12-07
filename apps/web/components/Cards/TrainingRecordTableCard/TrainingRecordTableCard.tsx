'use client'
import { RecordTable } from "@/components/RecordTable/RecordTable"
import { PropsWithClassName } from "@/types"
import { BaseCard } from "../BaseCard"
import { Pagination } from "@/components/Widgets/Pagination/Pagination"
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
export const TrainingRecordTableCard = ({ className }: PropsWithClassName) => {
  const { filter } = useTrainingRecordContext()
  return (
    <BaseCard 
      title="Training Record TableCard" 
      description="Training Record TableCard"
    >
      <RecordTable/>
      <Pagination size={filter.take} total={999} currPage={Math.floor(filter.skip/filter.take)}/>
    </BaseCard>
  )
}