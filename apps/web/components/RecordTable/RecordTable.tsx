'use client'
import { useTranslations } from "next-intl"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcnUI/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Fragment, useMemo } from "react"
import { postTrainingRecord } from "@/services/trainingRecord"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../shadcnUI/skeleton"
import { Checkbox } from "../shadcnUI/checkbox"
import { Trash2 } from "lucide-react"
import { DeleteDialog } from "../Dialogs/DeleteDialog/DeleteDialog"

interface Record {
  id: string
  date: string | number | Date
  reps: number
  weight: number
  exercise: string
  comment?: string
}

export const RecordTable = () => {
  const t = useTranslations()
  const columns: ColumnDef<Record>[] = useMemo(() => [
    { accessorKey: 'select', header: '', size: 20, cell: () => <Checkbox/>},
    { accessorKey: 'date', header: t('table.date'), size: 100 },
    { accessorKey: 'exercise', header: t('table.exercise'), size: 100 },
    { accessorKey: 'weight', header: t('table.weight'), size: 100 },
    { accessorKey: 'reps', header: t('table.reps'), size: 100 },
    { accessorKey: 'comment', header: t('table.comment'), size: 200 },
    { accessorKey: 'action', header: 'Actions', size: 60, cell: () => (
      <div className="flex justify-end">
        <DeleteDialog></DeleteDialog>
        {/* TODO: If multiple dialogs cause rendering performance issues, consider using context with a single dialog to replace rendering multiple dialogs.*/}
      </div>
    )},
  ], [])
  const { data, isLoading } = useQuery({
    queryKey: ['postTrainingRecord'],
    queryFn: () => postTrainingRecord({ exercise: 'push' })
  })
  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <Table className="break-words table-fixed">
      <TableHeader className="top-0 sticky">
        <TableRow>
          {
            table.getHeaderGroups().map(headerGroup => {
              return headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={header.id} style={{ width: header.column.columnDef.size, textAlign: index > 1 ? 'end' : 'start' }}>
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
                  <Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell key={cell.id} style={{ textAlign: index > 1 ? 'end' : 'start' }}>
                          <div>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </Fragment>
                ))
              )
            :
              (
                isLoading 
                  ?
                  Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell
                        colSpan={columns.length}
                        className="h-20 text-center text-muted-foreground"
                      >
                        <Skeleton className="rounded-lg h-3/4"/> 
                      </TableCell>
                  </TableRow>
                  ))
                  :
                  (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        <span>{ t('table.noResults') }</span>
                      </TableCell>
                    </TableRow>
                  )
              )
        }
      </TableBody>

    </Table>
  )
}