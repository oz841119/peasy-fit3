import { TrainingRecordLineChart } from "@/components/Charts/TrainingRecordLineChart/TrainingRecordLineChart";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { useTranslations } from "next-intl";
import { BaseCard } from "../BaseCard";

export const TrainingRecordLineChartCard = () => {
	const t = useTranslations();
	const { filter } = useTrainingRecordContext();
	return (
		<BaseCard
			title={t("table.trainingRecordChartCard.title")}
			description={t("table.trainingRecordChartCard.description")}
		>
			{filter.exerciseId !== null ? (
				<TrainingRecordLineChart />
			) : (
				<div className="h-full flex items-center justify-center">
					{t("msg.hint.pleaseChooseExercise")}
				</div>
			)}
		</BaseCard>
	);
};
