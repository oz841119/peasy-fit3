"use client";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { useToast } from "@/hooks/use-toast";
import {
	type ColumnDef,
	type RowData,
	type RowSelectionState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { ListFilter, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useMemo, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DeleteDialog } from "../Dialogs/DeleteDialog/DeleteDialog";
import { Button } from "../shadcnUI/button";
import { Checkbox } from "../shadcnUI/checkbox";
import { Skeleton } from "../shadcnUI/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../shadcnUI/table";
declare module "@tanstack/react-table" {
	interface ColumnMeta<TData extends RowData, TValue> {
		size?: number;
	}
}
interface Record {
	id: number;
	date: string | number | Date;
	reps: number;
	weight: number;
	exercise: string;
	comment?: string;
}

const ClickableTile = ({
	children,
	onClick,
}: { children: React.ReactNode; onClick: () => void }) => {
	return (
		<span
			onClick={onClick}
			className="cursor-pointer inline-block hover:bg-primary/10 px-2 py-1 rounded-md transition-colors"
		>
			{children}
		</span>
	);
};

export const RecordTable = () => {
	const t = useTranslations();
	const {
		trainingRecordListQuery,
		getExerciseNameById,
		deleteTrainingRecordMutation,
		updateFilter,
	} = useTrainingRecordContext();
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const columns: ColumnDef<Record>[] = useMemo(
		() => [
			{
				accessorKey: "date",
				header: t("table.date"),
				meta: { size: 100 }
			},
			{
				accessorKey: "exercise",
				header: t("table.exercise"),
				meta: { size: 100 },
			},
			{
				accessorKey: "weight",
				header: t("table.weight"),
				meta: { size: 100 },
				cell: (c) => {
					const weight = c.row.original.weight;
					return (
						<ClickableTile
							onClick={() =>
								updateFilter((draft) => {
									draft.weight = weight;
								})
							}
						>
							<div className="flex items-center gap-1">
								{weight}
								<ListFilter size={12} />
							</div>
						</ClickableTile>
					);
				},
			},
			{
				accessorKey: "reps",
				header: t("table.reps"),
				meta: { size: 100 },
				cell: (c) => {
					const reps = c.row.original.reps;
					return (
						<ClickableTile
							onClick={() =>
								updateFilter((draft) => {
									draft.reps = reps;
								})
							}
						>
							<div className="flex items-center gap-1">
								{reps}
								<ListFilter size={12} />
							</div>
						</ClickableTile>
					);
				},
			},
			{ accessorKey: "comment", header: t("table.comment") },
			{
				accessorKey: "action",
				header: t("table.action"),
				meta: { size: 100 },
				cell: (c) => (
					<div className="flex justify-end items-center gap-2 pr-2">
						<Trash2
							className="cursor-pointer text-muted-foreground hover:text-foreground"
							onClick={() => {
								singleDeleteId.current = c.row.original.id;
								setDeleteDialogOpen(true);
							}}
						/>
						<Checkbox
							checked={c.row.getIsSelected()}
							onCheckedChange={c.row.getToggleSelectedHandler()}
						/>
					</div>
				),
			},
		],
		[t, updateFilter],
	);
	const rows = useMemo(() => {
		return (
			trainingRecordListQuery.data?.trainingRecordList.map((record) => ({
				id: record.id,
				date: dayjs(record.date).format("YYYY-MM-DD HH mm ss"),
				exercise: getExerciseNameById(record.exerciseId) || "",
				weight: record.weight,
				reps: record.reps,
				comment: record.comment,
			})) || []
		);
	}, [trainingRecordListQuery, getExerciseNameById]);

	const table = useReactTable({
		columns,
		data: rows || [],
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		getRowId: (row) => row.id.toString(),
		state: {
			rowSelection,
		},
	});
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const singleDeleteId = useRef<null | number>(null);
	const { toast } = useToast();
	const handleDelete = () => {
		const ids = singleDeleteId.current
			? [singleDeleteId.current]
			: Object.keys(rowSelection).map((id) => Number(id));
		deleteTrainingRecordMutation.mutate(ids, {
			onSuccess: (result) => {
				toast({
					title: "Success",
					description: `Deleted ${result.count} items`,
					variant: "default",
				});
				setRowSelection({});
				singleDeleteId.current = null;
			},
			onError: (err) => {
				toast({
					title: "Error",
					description: err.message,
					variant: "destructive",
				});
				singleDeleteId.current = null;
			},
		});
		setDeleteDialogOpen(false);
	};
	return (
		<>
			<Table className="break-words text-xs sm:text-sm">
				<TableHeader>
					<TableRow>
						{table.getHeaderGroups().map((headerGroup) => {
							return headerGroup.headers.map((header, index) => {
								return (
									<TableHead
										key={header.id}
										style={{
											width: header.column.columnDef?.meta?.size,
											textAlign: index > 1 ? "end" : "start",
										}}
										className="text-nowrap"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</TableHead>
								);
							});
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<Fragment key={row.id}>
								<TableRow data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell, index) => (
										<TableCell
											key={cell.id}
											style={{ textAlign: index > 1 ? "end" : "start" }}
										>
											<div>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</div>
										</TableCell>
									))}
								</TableRow>
							</Fragment>
						))
					) : trainingRecordListQuery.isLoading ? (
						Array.from({ length: 4 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<TableRow key={index}>
								<TableCell
									colSpan={columns.length}
									className="h-20 text-center text-muted-foreground"
								>
									<Skeleton className="rounded-lg h-3/4" />
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center text-muted-foreground"
							>
								<span>{t("table.noResults")}</span>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DeleteDialog
				open={deleteDialogOpen}
				onOpenChange={(source: "cancel" | "delete") => {
					if (source === "cancel") {
						setDeleteDialogOpen(false);
					} else {
						handleDelete();
					}
				}}
			/>
			{Object.keys(rowSelection).length > 0 && (
				<div className=" sticky bottom-0 flex justify-center py-1">
					<div className="py-1 px-2 border-2 rounded-md flex items-center gap-2 bg-card">
						<div className="text-sm">
							{t("common.selectItems", {
								count: Object.keys(rowSelection).length,
							})}
						</div>
						<Button
							onClick={() => setDeleteDialogOpen(true)}
							variant="destructive"
							size="sm"
						>
							{t("common.delete")}
						</Button>
					</div>
				</div>
			)}
		</>
	);
};
