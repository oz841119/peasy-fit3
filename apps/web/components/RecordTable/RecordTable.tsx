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
import { Skeleton } from "../shadcnUI/skeleton"
import { Checkbox } from "../shadcnUI/checkbox"
import { DeleteDialog } from "../Dialogs/DeleteDialog/DeleteDialog"
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
import dayjs from "dayjs"
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
  const { trainingRecordList, getExerciseNameById } = useTrainingRecordContext()
  const columns: ColumnDef<Record>[] = useMemo(() => [
    { accessorKey: 'select', header: '', size: 20, cell: () => <Checkbox/>},
    { accessorKey: 'date', header: t('table.date'), size: 100 },
    { accessorKey: 'exercise', header: t('table.exercise'), size: 100 },
    { accessorKey: 'weight', header: t('table.weight'), size: 100 },
    { accessorKey: 'reps', header: t('table.reps'), size: 100 },
    { accessorKey: 'comment', header: t('table.comment'), size: 'auto' },
    { accessorKey: 'action', header: 'Actions', size: 70, cell: () => (
      <div className="flex justify-end">
        <DeleteDialog></DeleteDialog>
        {/* TODO: If multiple dialogs cause rendering performance issues, consider using context with a single dialog to replace rendering multiple dialogs.*/}
      </div>
    )},
  ], [])
  const rows = useMemo(() => {
    return trainingRecordList.current?.map((record) => ({
      id: record.id,
      date: dayjs(record.date).format('YYYY-MM-DD'),
      exercise: getExerciseNameById(record.exerciseId) || '',
      weight: record.weight,
      reps: record.reps,
      comment: record.comment
    })) || []
  }, [trainingRecordList])
  
  const table = useReactTable({
    columns,
    data: rows || [],
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
                trainingRecordList.isLoading 
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