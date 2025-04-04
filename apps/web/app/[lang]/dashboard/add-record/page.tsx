"use client";
import { BaseCard } from "@/components/Cards/BaseCard";
import { SelectableExerciseListCard } from "@/components/Cards/ExerciseListCard/ExerciseListCard";
import { UploadRecordPreviewTable } from "@/components/Tables/UploadRecordPreviewTable";
import { Badge } from "@/components/shadcnUI/badge";
import { Button } from "@/components/shadcnUI/button";
import { Input } from "@/components/shadcnUI/input";
import { ScrollArea } from "@/components/shadcnUI/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcnUI/select";
import {
	useUserTrainingSessionStatus,
	useUserTrainingSessions,
} from "@/hooks/queries/useTrainingSession";
import { toast } from "@/hooks/use-toast";
import { parseWeightToKg } from "@/lib/parseWeightToKg";
import {
	type AddTrainingRecordFormSchema,
	addTrainingRecordFormSchema,
} from "@/schemas/addTrainingRecord.form.schema";
import { getExerciseByNames } from "@/services/public/exercise";
import { addTrainingRecord } from "@/services/trainingRecord";
import { addUserExercise } from "@/services/userExercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

function useRecentTrainingData(exerciseId: number | null) {
	const queryClient = useQueryClient();

	const trainingRecordListQuery = useQuery({
		queryKey: ["trainingRecordList", exerciseId],
		queryFn: async () => {
			if (!exerciseId) return { trainingRecordList: [], total: 0 };
			const { getTrainingRecordList } = await import(
				"@/services/trainingRecord"
			);
			return getTrainingRecordList({
				exerciseId,
				take: 10,
				skip: 0,
			});
		},
		enabled: !!exerciseId,
		staleTime: 1000 * 60 * 5,
	});

	const recentWeights = useMemo(() => {
		if (
			!trainingRecordListQuery.data ||
			!trainingRecordListQuery.data.trainingRecordList.length
		) {
			return [];
		}
		const weights = trainingRecordListQuery.data.trainingRecordList.map(
			(record) => record.weight,
		);
		return Array.from(new Set(weights)).sort((a, b) => b - a);
	}, [trainingRecordListQuery.data]);

	const recentReps = useMemo(() => {
		if (
			!trainingRecordListQuery.data ||
			!trainingRecordListQuery.data.trainingRecordList.length
		) {
			return [];
		}
		const reps = trainingRecordListQuery.data.trainingRecordList.map(
			(record) => record.reps,
		);
		return Array.from(new Set(reps)).sort((a, b) => b - a);
	}, [trainingRecordListQuery.data]);

	const refreshData = useCallback(() => {
		if (exerciseId) {
			queryClient.invalidateQueries({
				queryKey: ["trainingRecordList", exerciseId],
			});
		}
	}, [exerciseId, queryClient]);

	return { recentWeights, recentReps, refreshData };
}

export default function AddRecordPage() {
	const [isSubmitLoading, setIsSubmitLoading] = useState(false);
	const t = useTranslations();
	const queryClient = useQueryClient();

	const {
		control,
		watch,
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddTrainingRecordFormSchema>({
		resolver: zodResolver(addTrainingRecordFormSchema),
		defaultValues: {
			date: new Date(),
			trainingSessionId: null,
			sets: null,
		},
	});

	const selectedExerciseId = watch("exerciseId");
	const { recentWeights, recentReps, refreshData } =
		useRecentTrainingData(selectedExerciseId);

	const handleWeightClick = (weight: number) => {
		setValue("weight", weight);
	};

	const handleRepsClick = (reps: number) => {
		setValue("reps", reps);
	};

	const onSubmit = handleSubmit(
		async (form) => {
			if (form.exerciseId) {
				const record = Array<Parameters<typeof addTrainingRecord>[0][number]>(
					Number(form.sets ?? 1),
				).fill({
					date: form.date,
					exerciseId: Number(form.exerciseId),
					weight: Number(form.weight),
					reps: Number(form.reps),
					comment: form.comment,
					trainingSessionId: form.trainingSessionId,
				});
				try {
					setIsSubmitLoading(true);
					const addTrainingRecordResult = await addTrainingRecord(record);
					if (addTrainingRecordResult.count > 0) {
						toast({
							title: "Success",
							description: "Record added successfully",
						});

						refreshData();
					}
				} catch (err) {
					toast({
						title: "Error",
						variant: "destructive",
					});
					console.error(err);
				} finally {
					setIsSubmitLoading(false);
				}
			} else {
				toast({
					title: "Please select an exercise",
					variant: "destructive",
				});
			}
		},
		(errors) => {
			console.log(errors);
			const errorKeys = Object.keys(errors);
			if (errorKeys.length > 0) {
				toast({
					title: "Please fill in all the fields",
					variant: "destructive",
					description: errorKeys.join(", "),
				});
			} else {
				toast({
					title: "error",
					variant: "destructive",
				});
			}
		},
	);

	const [uploadCSVRecord, setUploadCSVRecord] = useState<
		{
			date: string;
			name: string;
			weight: number;
			reps: number;
			comment: string;
		}[]
	>([]);
	const onUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			setUploadCSVRecord([]);
			return;
		}
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = async (event) => {
			if (!event.target?.result) return;
			const text = event.target.result as string;
			const rows = text.split("\n");
			const records = rows.slice(1).map((row) => {
				const [date, name, weight, reps, comment] = row.split(",");
				return {
					date: date,
					name: name,
					weight: parseWeightToKg(weight),
					reps: Number(reps),
					comment: comment?.trim() || "",
				};
			});
			if (records.length > 0) {
				toast({
					title: "上傳成功",
					description: "請查看預覽表格後點擊送出",
				});
				setUploadCSVRecord(records);
			} else {
				toast({
					title: "CSV格式錯誤",
					description: "請確保CSV文件格式正確",
					variant: "destructive",
				});
			}
		};
		reader.readAsText(file);
	};
	const csvFileInputRef = useRef<null | HTMLInputElement>(null);
	const onUploadCSVSubmit = async () => {
		try {
			setIsSubmitLoading(true);
			const exerciseNames = Array.from(
				new Set(uploadCSVRecord.map((record) => record.name)),
			);
			const addUserExerciseResult = await addUserExercise({
				exerciseList: exerciseNames,
			});
			toast({
				title: "添加訓練動作成功",
				description: `已添加 ${addUserExerciseResult.createdCount} 個訓練動作`,
				variant: "default",
			});
			const exerciseList = await getExerciseByNames(exerciseNames);
			const recordList = uploadCSVRecord.map((record) => {
				const exerciseId = exerciseList.find(
					(exercise) => exercise.name === record.name,
				)?.id;
				if (exerciseId === undefined) throw new Error("Exercise not found");
				return {
					date: new Date(record.date),
					exerciseId: exerciseId,
					weight: record.weight,
					reps: record.reps,
					comment: record.comment,
					trainingSessionId: null,
				};
			});
			const addTrainingRecordResult = await addTrainingRecord(recordList);
			queryClient.invalidateQueries({ queryKey: ["exerciseList"] });

			if (
				selectedExerciseId &&
				recordList.some((record) => record.exerciseId === selectedExerciseId)
			) {
				refreshData();
			}

			toast({
				title: "訓練紀錄上傳成功",
				description: `已上傳 ${addTrainingRecordResult.count} 筆記錄`,
				variant: "default",
			});
			setUploadCSVRecord([]);
			if (csvFileInputRef.current) {
				csvFileInputRef.current.value = "";
			}
		} catch (err) {
			console.error(err);
			toast({
				title: "訓練紀錄上傳失敗",
				description: "發生異常",
				variant: "destructive",
			});
		} finally {
			setIsSubmitLoading(false);
		}
	};
	const { data: trainingSessionStatus } = useUserTrainingSessionStatus();
	const { data: trainingSessions } = useUserTrainingSessions();
	const trainingSessionOptions = useMemo(() => {
		const pastSessions =
			trainingSessions?.map((session) => ({
				value: session.id.toString(),
				label: session.name,
			})) || [];
		const currentSession = trainingSessionStatus?.trainingSession;
		if (currentSession) {
			const filteredPastSessions = pastSessions.filter(
				(session) => session.value !== currentSession.id.toString(),
			);
			return [
				{
					value: currentSession.id.toString(),
					label: currentSession.name,
				},
				...filteredPastSessions,
			];
		}
		return pastSessions;
	}, [trainingSessions, trainingSessionStatus]);
	useEffect(() => {
		if (trainingSessionStatus?.isActive) {
			trainingSessionOptions.length > 0 &&
				setValue("trainingSessionId", trainingSessionOptions[0].value);
		}
	}, [trainingSessionOptions, trainingSessionStatus, setValue]);
	return (
		<div>
			<form className="flex flex-col gap-4 mb-4" onSubmit={onSubmit}>
				<Controller
					name="exerciseId"
					control={control}
					render={({ field: { value, onChange } }) => (
						<SelectableExerciseListCard
							selectId={value}
							onSelect={(exercise) => onChange(exercise.id)}
						/>
					)}
				/>
				<BaseCard
					title={t("card.trainingContent.title")}
					description={t("card.trainingContent.description")}
				>
					<div className="flex flex-col gap-4">
						<Controller
							name="trainingSessionId"
							control={control}
							render={({ field: { value, onChange } }) => {
								return (
									<Select
										value={value?.toString() || ""}
										onValueChange={(value) => onChange(value)}
									>
										<SelectTrigger>
											<SelectValue
												placeholder={t("msg.hint.pleaseSelectSession")}
											/>
										</SelectTrigger>
										<SelectContent>
											{trainingSessionOptions.length > 0 ? (
												trainingSessionOptions.map((option) => (
													<SelectItem value={option.value} key={option.value}>
														{option.label}
													</SelectItem>
												))
											) : (
												<SelectItem value="empty" disabled>
													{t("msg.hint.notSession")}
												</SelectItem>
											)}
										</SelectContent>
									</Select>
								);
							}}
						/>
						<div className="flex flex-col gap-2">
							<Input
								type="number"
								placeholder={t("table.weight")}
								{...register("weight", { required: true, valueAsNumber: true })}
							/>

							{recentWeights.length > 0 && (
								<ScrollArea className="h-10">
									<div className="flex flex-wrap gap-2 mt-1">
										{recentWeights.map((weight, index) => (
											<Badge
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
												variant="outline"
												className="cursor-pointer hover:bg-primary/20"
												onClick={() => handleWeightClick(weight)}
											>
												{weight}
											</Badge>
										))}
									</div>
								</ScrollArea>
							)}

							<Input
								type="number"
								placeholder={t("table.reps")}
								{...register("reps", { required: true, valueAsNumber: true })}
							/>

							{recentReps.length > 0 && (
								<ScrollArea className="h-10">
									<div className="flex flex-wrap gap-2 mt-1">
										{recentReps.map((reps, index) => (
											<Badge
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
												variant="outline"
												className="cursor-pointer hover:bg-primary/20"
												onClick={() => handleRepsClick(reps)}
											>
												{reps}
											</Badge>
										))}
									</div>
								</ScrollArea>
							)}

							<Input
								type="number"
								placeholder="Sets"
								{...register("sets", { required: true, valueAsNumber: true })}
							/>
							<Input
								type="text"
								placeholder="Comment"
								{...register("comment")}
							/>
							<Button
								type="submit"
								variant="secondary"
								disabled={isSubmitLoading}
							>
								{isSubmitLoading ? (
									<Loader2 className="animate-spin" />
								) : (
									<span>{t("common.submit")}</span>
								)}
							</Button>
							<Button type="reset" variant="ghost" disabled={isSubmitLoading}>
								{t("common.reset")}
							</Button>
						</div>
					</div>
				</BaseCard>
			</form>
			<BaseCard
				title={t("card.uploadCSV.title")}
				description={t("card.uploadCSV.description")}
			>
				<div className="flex gap-4">
					<Input
						ref={csvFileInputRef}
						id="csv"
						type="file"
						className="w-72 mb-4"
						accept=".csv"
						onChange={onUploadCSV}
					/>
					{uploadCSVRecord.length > 0 && (
						<Button
							variant="secondary"
							onClick={onUploadCSVSubmit}
							disabled={isSubmitLoading}
						>
							{isSubmitLoading ? (
								<Loader2 className="animate-spin" />
							) : (
								<span>{t("common.submit")}</span>
							)}
						</Button>
					)}
				</div>
				<Button asChild size="sm">
					<a href="/static/csv/trainings_sample.csv">
						Download Sample CSV File.
					</a>
				</Button>
				{uploadCSVRecord.length > 0 && (
					<UploadRecordPreviewTable records={uploadCSVRecord} />
				)}
			</BaseCard>
		</div>
	);
}
