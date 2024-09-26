'use client'
import { useTranslations } from "next-intl"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcnUI/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Fragment, useMemo, useState } from "react"
import useSWR from "swr"
import { getTrainingRecord } from "@/services/trainingRecord"
interface Exercise {
  name: string
  reps: number
  weight: number
  id: string
}

interface Record {
  id: string
  date: string | number | Date
  type: string
  comment?: string
  exercise: Exercise[]
}

export const RecordTable = () => {
  const t = useTranslations()
  const columns: ColumnDef<Record>[] = useMemo(() => [
    { accessorKey: 'date', header: t('table.date') },
    { accessorKey: 'type', header: t('table.type') },
    { accessorKey: 'comment', header: t('table.comment') },
    {
      header: 'Exercise',
      cell: ({ row }) => <button onClick={row.getToggleExpandedHandler()}>{row.getIsExpanded() ? '👇' : '👉'} </button>
    },
  ], [])
  const { data, error, isLoading } = useSWR('/api/training-record', getTrainingRecord)
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true
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
      {
        !isLoading && data &&
        <TableBody>
          {
            table.getRowModel().rows?.length
              ?
              (
                table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {
                      row.getIsExpanded() && (
                        <TableRow>Test</TableRow>
                      )
                    }
                  </Fragment>
                ))
              )
              :
              (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {t('table.noResults')}
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      }

    </Table>
  )
}