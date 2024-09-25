'use client'
import { useTranslations } from "next-intl"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcnUI/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"
interface Exercise {
  name: string
  reps: number
  weight: number
}

interface Record {
  date: string | number | Date
  type: string
  comment?: string
  exercise: Exercise[]
}

const mock: () => Record[] = () => ([
  { date: '2024-09-22', type: '腿', comment: '棒', exercise: [] }
])

export const RecordTable = () => {
  const t = useTranslations()
  const columns: ColumnDef<Record>[] = useMemo(() => [
    { accessorKey: 'date', header: t('table.date') },
    { accessorKey: 'type', header: t('table.type') },
    { accessorKey: 'comment', header: t('table.comment') },
    { accessorKey: 'exercise', header: t('table.exercise') },
  ], [])
  const table = useReactTable({
    columns,
    data: mock(),
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            table.getHeaderGroups().map(headerGroup => {
              return headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })
            })
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          table.getRowModel().rows?.length
            ?
            (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
            :
            (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  { t('table.noResults')}
                </TableCell>
              </TableRow>
            )}
      </TableBody>

    </Table>
  )
}