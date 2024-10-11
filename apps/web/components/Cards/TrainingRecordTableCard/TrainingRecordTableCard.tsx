import { RecordTable } from "@/components/RecordTable/RecordTable"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcnUI/card"
import { ScrollArea } from "@/components/shadcnUI/scroll-area"
import { PropsWithClassName } from "@/types"
export const TrainingRecordTableCard = ({ className }: PropsWithClassName) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Training Record Table</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-2">
          <RecordTable/>
        </ScrollArea>
      </CardContent>
      {/* <CardFooter>123</CardFooter> */}
    </Card>
  )
}
