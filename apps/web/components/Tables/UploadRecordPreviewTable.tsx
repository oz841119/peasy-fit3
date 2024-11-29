import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "../shadcnUI/table";
interface Props {
  records: {date: string, name: string, weight: number, reps: number, comment: string}[]
}
export function UploadRecordPreviewTable({ records }: Props) {
  console.log(records);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Reps</TableHead>
          <TableHead>Comment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record, index) => (
          <TableRow key={index}>
            <TableCell>{record.date}</TableCell>
            <TableCell>{record.name}</TableCell>
            <TableCell>{record.weight}</TableCell>
            <TableCell>{record.reps}</TableCell>
            <TableCell>{record.comment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}