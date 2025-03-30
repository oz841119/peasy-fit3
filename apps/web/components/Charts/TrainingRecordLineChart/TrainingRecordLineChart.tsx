"use client";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/shadcnUI/chart";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { onePone, zeroPNine } from "@/lib/multiply";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
	Area,
	AreaChart,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const DataTile = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="flex flex-col justify-end h-full w-16 overflow-auto whitespace-pre-line">
			<div className="text-sm text-muted-foreground">{label}</div>
			<div className="text-lg font-bold text-foreground">{value}</div>
		</div>
	);
};
export const TrainingRecordLineChart = () => {
	const t = useTranslations();
	const { trainingRecordListQuery } = useTrainingRecordContext();
	const trainingRecordList =
		trainingRecordListQuery.data?.trainingRecordList || [];
	const chartData = useMemo(() => {
		return trainingRecordList
			.map((record) => ({
				date: record.date,
				weight: record.weight,
				reps: record.reps,
				volume: record.weight * record.reps,
			}))
			.reverse();
	}, [trainingRecordList]);
	const chartConfig = {
		weight: {
			label: "Weight",
			color: "hsl(var(--chart-1))",
		},
		reps: {
			label: "Reps",
			color: "hsl(var(--chart-2))",
		},
		volume: {
			label: "Volume",
			color: "hsl(var(--chart-3))",
		},
	};
	const metrics = useMemo(() => {
		return trainingRecordList.reduce(
			(acc, record, index) => {
				acc.maxWeight = Math.max(acc.maxWeight, record.weight);
				acc.avgWeight = (acc.avgWeight * index + record.weight) / (index + 1);
				acc.maxVolume = Math.max(acc.maxVolume, record.weight * record.reps);
				acc.avgVolume =
					(acc.avgVolume * index + record.weight * record.reps) / (index + 1);
				acc.maxReps = Math.max(acc.maxReps, record.reps);
				acc.avgReps = (acc.avgReps * index + record.reps) / (index + 1);
				acc.totalSets = index + 1;
				return acc;
			},
			{
				maxWeight: 0,
				avgWeight: 0,
				maxVolume: 0,
				avgVolume: 0,
				maxReps: 0,
				avgReps: 0,
				totalDays: new Set(trainingRecordList.map((record) => record.date))
					.size,
				totalSets: trainingRecordList.length,
			},
		);
	}, [trainingRecordList]);
	return (
		<div>
			<div className="flex h-20">
				<div className="text-sm text-muted-foreground flex">
					<DataTile
						label={t("table.maxWeight")}
						value={metrics.maxWeight.toFixed(2)}
					/>
					<DataTile
						label={t("table.avgWeight")}
						value={metrics.avgWeight.toFixed(2)}
					/>
				</div>
				<ChartContainer config={chartConfig} className="h-full flex-1">
					<AreaChart data={chartData} syncId="trainingRecordChart">
						<YAxis domain={[zeroPNine, onePone]} type="number" hide />
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(_, payload) =>
										dayjs(payload[0].payload.date).format("YYYY-MM-DD")
									}
								/>
							}
						/>
						<Legend verticalAlign="middle" formatter={() => "Weight"} />
						<Area
							dataKey="weight"
							type="natural"
							fill="var(--color-weight)"
							fillOpacity={0.4}
							stroke="var(--color-weight)"
						/>
					</AreaChart>
				</ChartContainer>
			</div>
			<div className="flex h-20">
				<div className="text-sm text-muted-foreground flex">
					<DataTile
						label={t("table.maxReps")}
						value={metrics.maxReps.toFixed(2)}
					/>
					<DataTile
						label={t("table.avgReps")}
						value={metrics.avgReps.toFixed(2)}
					/>
				</div>
				<ChartContainer config={chartConfig} className="h-full flex-1">
					<AreaChart data={chartData} syncId="trainingRecordChart">
						<YAxis domain={[zeroPNine, onePone]} type="number" hide />
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(_, payload) =>
										dayjs(payload[0].payload.date).format("YYYY-MM-DD")
									}
								/>
							}
						/>
						<Legend verticalAlign="middle" formatter={() => "Reps"} />
						<Area
							dataKey="reps"
							type="natural"
							fill="var(--color-reps)"
							fillOpacity={0.4}
							stroke="var(--color-reps)"
						/>
					</AreaChart>
				</ChartContainer>
			</div>
			<div className="flex h-20">
				<div className="text-sm text-muted-foreground flex">
					<DataTile
						label={t("table.maxVolume")}
						value={metrics.maxVolume.toFixed(2)}
					/>
					<DataTile
						label={t("table.avgVolume")}
						value={metrics.avgVolume.toFixed(2)}
					/>
				</div>
				<ChartContainer config={chartConfig} className="h-full flex-1">
					<AreaChart data={chartData} syncId="trainingRecordChart">
						<YAxis domain={[zeroPNine, onePone]} type="number" hide />
						<Legend verticalAlign="middle" formatter={() => "Volume"} />
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(_, payload) =>
										dayjs(payload[0].payload.date).format("YYYY-MM-DD")
									}
								/>
							}
						/>
						<Area
							dataKey="volume"
							type="natural"
							fill="var(--color-volume)"
							fillOpacity={0.4}
							stroke="var(--color-volume)"
						/>
					</AreaChart>
				</ChartContainer>
			</div>
			<div className="flex h-20">
				<div className="text-sm text-muted-foreground flex">
					<DataTile
						label={t("table.totalDays")}
						value={metrics.totalDays.toString()}
					/>
					<DataTile
						label={t("table.totalSets")}
						value={metrics.totalSets.toString()}
					/>
				</div>
				<ChartContainer config={chartConfig} className="h-full flex-1">
					<AreaChart data={chartData} syncId="trainingRecordChart">
						<XAxis
							dataKey="date"
							tickFormatter={(date) =>
								new Date(date).toISOString().split("T")[0]
							}
						/>
					</AreaChart>
				</ChartContainer>
			</div>
		</div>
	);
};
