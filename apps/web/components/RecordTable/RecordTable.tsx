'use client'
import { useTranslations } from "next-intl"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcnUI/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table"
import { Fragment, useMemo, useState } from "react"
import { Skeleton } from "../shadcnUI/skeleton"
import { Checkbox } from "../shadcnUI/checkbox"
import { DeleteDialog } from "../Dialogs/DeleteDialog/DeleteDialog"
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext"
import dayjs from "dayjs"
import { Trash2 } from "lucide-react"
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    size?: number;
  }
}
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
  const { trainingRecordListQuery, getExerciseNameById, deleteTrainingRecordMutation } = useTrainingRecordContext()
  const columns: ColumnDef<Record>[] = useMemo(() => [
    { accessorKey: 'select', header: '', meta: { size: 30 }, cell: () => <Checkbox /> },
    { accessorKey: 'date', header: t('table.date'), meta: { size: 100 } },
    { accessorKey: 'exercise', header: t('table.exercise'), meta: { size: 100 } },
    { accessorKey: 'weight', header: t('table.weight'), meta: { size: 100 } },
    { accessorKey: 'reps', header: t('table.reps'), meta: { size: 100 } },
    { accessorKey: 'comment', header: t('table.comment') },
    {
      accessorKey: 'action', header: t('table.action'), meta: { size: 70 }, cell: (c) => (
        <div className="flex justify-end">
          <Trash2
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={() => {
              setDeleteDialogOpen(true)
              setSelectdTraininRecordIds([Number(c.row.original.id)])
            }}
          />
        </div>
      )
    },
  ], [])
  const rows = useMemo(() => {
    return trainingRecordListQuery.current?.trainingRecordList.map((record) => ({
      id: record.id,
      date: dayjs(record.date).format('YYYY-MM-DD HH:mm:ss'),
      exercise: getExerciseNameById(record.exerciseId) || '',
      weight: record.weight,
      reps: record.reps,
      comment: record.comment
    })) || []
  }, [trainingRecordListQuery])

  const table = useReactTable({
    columns,
    data: rows || [],
    getCoreRowModel: getCoreRowModel()
  })
  const [selectdTraininRecordIds, setSelectdTraininRecordIds] = useState<number[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDelete = () => {
    deleteTrainingRecordMutation.mutate(selectdTraininRecordIds, {
      onSuccess: () => {
        console.log('delete success');
      }
    })
    setDeleteDialogOpen(false)
  }
  return (
    <>
      <Table className="break-words table-fixed">
        <TableHeader>
          <TableRow>
            {
              table.getHeaderGroups().map(headerGroup => {
                return headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.column.columnDef?.meta?.size,
                        textAlign: index > 1 ? 'end' : 'start'
                      }}
                    >
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
                trainingRecordListQuery.isLoading
                  ?
                  Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell
                        colSpan={columns.length}
                        className="h-20 text-center text-muted-foreground"
                      >
                        <Skeleton className="rounded-lg h-3/4" />
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
                        <span>{t('table.noResults')}</span>
                      </TableCell>
                    </TableRow>
                  )
              )
          }
        </TableBody>
      </Table>
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(source: "cancel" | "delete") => {
          console.log(source);
          if(source === 'cancel') {
            setDeleteDialogOpen(false)
          } else {
            handleDelete()
          }
        }} />
    </>
  )
}