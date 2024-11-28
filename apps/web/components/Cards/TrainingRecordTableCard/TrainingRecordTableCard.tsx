'use client'
import { RecordTable } from "@/components/RecordTable/RecordTable"
import { PropsWithClassName } from "@/types"
import { BaseCard } from "../BaseCard"
import { Pagination } from "@/components/Widgets/Pagination/Pagination"
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
export const TrainingRecordTableCard = ({ className }: PropsWithClassName) => {
  const { filter, updateFilter, trainingRecordListQuery } = useTrainingRecordContext()
  return (
    <BaseCard 
      title="Training Record TableCard" 
      description="Training Record TableCard"
    >
      <RecordTable/>
      <Pagination 
        size={filter.take} 
        total={trainingRecordListQuery.current?.total || 0} 
        currPage={Math.floor(filter.skip/filter.take) + 1} 
        LIMIT={5} 
        onChange={(page) => {
          updateFilter(draft => { draft.skip = (page - 1) * filter.take })
        }}
      />
    </BaseCard>
  )
}