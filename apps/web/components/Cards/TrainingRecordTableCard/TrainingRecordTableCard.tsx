import { RecordTable } from "@/components/RecordTable/RecordTable"
import { ScrollArea } from "@/components/shadcnUI/scroll-area"
import { PropsWithClassName } from "@/types"
import { BaseCard } from "../BaseCard"
export const TrainingRecordTableCard = ({ className }: PropsWithClassName) => {
  return (
    <BaseCard 
      title="Training Record TableCard" 
      description="Training Record TableCard"
    >
      <ScrollArea className="h-64 pr-2">
        <RecordTable/>
      </ScrollArea>
    </BaseCard>
  )
}