'use client'
import { Table, TableHead, TableHeader, TableRow } from "../shadcnUI/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
interface Exercise {
  name: string
  reps: number
  weight: number
}

interface Reocrd {
  date: string | number | Date
  trainingFocus: string
  comment?: string
  exercises: Exercise[]
}

const mock: () => Reocrd[] = () => ([
  { date: '2024-09-22', trainingFocus: '腿', comment: '棒', exercises: [] }
])

const columns: ColumnDef<Reocrd>[] = [
  { accessorKey: 'date', header: 'date' },
  { accessorKey: 'trainingFocus', header: 'trainingFocus' },
  { accessorKey: 'comment', header: 'comment' },
  { accessorKey: 'exercises', header: 'exercises' },
]
export const RecordTable = () => {
  const table = useReactTable({
    columns,
    data: mock(),
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>123</TableHead>
          <TableHead>123</TableHead>
          <TableHead>123</TableHead>
          <TableHead>123</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  )
}