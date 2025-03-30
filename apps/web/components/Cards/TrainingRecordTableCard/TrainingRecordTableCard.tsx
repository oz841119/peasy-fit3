"use client";
import { RecordTable } from "@/components/RecordTable/RecordTable";
import { ScrollArea } from "@/components/shadcnUI/scroll-area";
import { useTrainingRecordContext } from "@/contexts/TrainingRecordContext";
import { useTranslations } from "next-intl";
import { BaseCard } from "../BaseCard";
export const TrainingRecordTableCard = () => {
	const t = useTranslations();
	const { filter } = useTrainingRecordContext();
	return (
		<BaseCard
			title={t("table.trainingRecordTableCard.title")}
			description={t("table.trainingRecordTableCard.description")}
		>
			<ScrollArea className="h-[400px]">
				{filter.exerciseId !== null ? (
					<RecordTable />
				) : (
					<div className="h-full flex items-center justify-center">
						{t("msg.hint.pleaseChooseExercise")}
					</div>
				)}
			</ScrollArea>
			{/* <Pagination 
        size={filter.take} 
        total={trainingRecordListQuery.current?.total || 0} 
        currPage={Math.floor((filter.skip || 0) / (filter.take || 0)) + 1} 
        LIMIT={5} 
        onChange={(page) => {
          updateFilter(draft => { draft.skip = (page - 1) * (filter.take || 0) })
        }}
      /> */}
		</BaseCard>
	);
};
