"use client";
import { TrainingRecordLineChartCard } from "@/components/Cards/TrainingRecordLineChartCard/TrainingRecordLineChartCard";
import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { Chip } from "@/components/Widgets/Chip/Chip";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcnUI/select";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
export default function TrainingRecordPage() {
	const t = useTranslations();
	const { filter, updateFilter, exerciseList } = useTrainingRecordContext();
	const [isSelectPrompt, setIsSelectPrompt] = useState<boolean>(true);
	return (
		<div>
			<div className="mb-2 flex flex-col gap-2 flex-wrap sm:flex-row w-full">
				{/* --------- */}
				<Select
					defaultValue={filter.exerciseId?.toString()}
					onValueChange={(value) =>
						updateFilter((draft) => {
							draft.exerciseId = Number(value);
						})
					}
					onOpenChange={() => {
						isSelectPrompt && setIsSelectPrompt(false);
					}}
				>
					<SelectTrigger
						className={cn(
							"w-full sm:w-52",
							isSelectPrompt && "border-red-500 border-2",
						)}
					>
						<SelectValue placeholder={t("table.selectExercise")} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{exerciseList.current?.map((exercise) => (
								<SelectItem key={exercise.id} value={exercise.id.toString()}>
									{exercise.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{/* --------- */}
				<Select
					defaultValue={filter.take?.toString()}
					onValueChange={(value) => {
						console.log(value);
						updateFilter((draft) => {
							draft.take = value === "all" ? null : Number.parseInt(value);
							draft.skip = 0;
						});
					}}
				>
					<SelectTrigger className="w-full sm:w-52">
						<SelectValue placeholder="Select exercise" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="10">
								{t("table.latestRecords", { count: 10 })}
							</SelectItem>
							<SelectItem value="20">
								{t("table.latestRecords", { count: 20 })}
							</SelectItem>
							<SelectItem value="30">
								{t("table.latestRecords", { count: 30 })}
							</SelectItem>
							<SelectItem value="all">{t("table.allRecords")}</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				{/* --------- */}
				<div className="flex gap-2">
					{filter.hasOwnProperty("weight") && (
						<Chip
							className="text-xs py-1 px-2 border-foreground text-foreground"
							text={`${t("table.weight")}: ${filter.weight}`}
							onClick={() => {
								updateFilter((draft) => {
									draft.weight = undefined;
								});
							}}
							Icon={<CircleX width={14} />}
						/>
					)}
					{filter.hasOwnProperty("reps") && (
						<Chip
							className="text-xs py-1 px-2 border-foreground text-foreground"
							text={`${t("table.reps")}: ${filter.reps}`}
							onClick={() => {
								updateFilter((draft) => {
									draft.reps = undefined;
								});
							}}
							Icon={<CircleX width={14} />}
						/>
					)}
				</div>
			</div>
			<div className="mb-2">
				<TrainingRecordTableCard />
			</div>
			<div>
				<TrainingRecordLineChartCard />
			</div>
		</div>
	);
}
