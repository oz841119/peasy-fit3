"use client";
import { Chip } from "@/components/Widgets/Chip/Chip";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/shadcnUI/card";
import { Skeleton } from "@/components/shadcnUI/skeleton";
import {
	deleteUserExercise,
	getUserExerciseList,
} from "@/services/userExercise";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { type JSX, useMemo } from "react";

// Todo: Refactoring
const StatusStrategy = (strategy?: "loading" | "empty" | "error") => {
	switch (strategy) {
		case "loading": {
			return (
				<div className="w-full">
					<Skeleton className="h-10 w-full" />
				</div>
			);
		}
		case "empty": {
			return <div>Please create exercise</div>;
		}
		case "error": {
			return <div>Error...</div>;
		}
		default: {
			return null;
		}
	}
};

interface ExerciseInfo {
	id: number;
	name: string;
}
export function ExerciseListCard({
	operable,
}: { operable: { remove: boolean } }): JSX.Element;
export function ExerciseListCard({
	operable,
	onSelect,
	selectId,
}: {
	operable: { select: boolean };
	onSelect: (exerciseInfo: ExerciseInfo) => void;
	selectId?: number | null;
}): JSX.Element;
export function ExerciseListCard({
	operable,
	onSelect,
	selectId,
}: {
	operable?: { remove?: boolean; select?: boolean };
	onSelect?: (exercise: ExerciseInfo) => void;
	selectId?: number | null;
}) {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const {
		data: exerciseList,
		error,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["exerciseList"],
		queryFn: () => getUserExerciseList(),
	});
	const mutation = useMutation({
		mutationFn: (id: number) => deleteUserExercise({ id }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["exerciseList"] }),
		onError: (error) => console.error(error),
	});
	const StatusStrategyCmp = StatusStrategy(
		(() => {
			if (isLoading) {
				return "loading";
			}
			if (exerciseList?.length) {
				return "empty";
			}
			if (error) {
				return "error";
			}
		})(),
	);
	const headerText = useMemo(() => {
		let title = "Exercise List";
		let description = "";
		if (operable?.select) {
			title = t("card.chooseExercise.title");
			description = t("card.chooseExercise.description");
		} else if (operable?.remove) {
			title = t("card.removeExercise.title");
			description = t("card.removeExercise.description");
		}
		return { title, description };
	}, [operable, t]);
	return (
		<Card className="min-h-32">
			<CardHeader>
				<CardTitle> {headerText.title} </CardTitle>
				<CardDescription>{headerText.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-3 flex-wrap">
					{exerciseList
						? exerciseList.map((exercise) => (
							<Chip
								text={exercise.name}
								key={exercise.id}
								Icon={operable?.remove && <CircleX width={16} />}
								className={
									selectId && selectId === exercise.id
										? "border-muted-foreground bg-muted"
										: ""
								}
								onClick={() => {
									if (operable?.remove) {
										mutation.mutate(exercise.id);
									}
									if (operable?.select && onSelect) {
										onSelect(exercise);
									}
								}}
							/>
						))
						: StatusStrategyCmp}
				</div>
			</CardContent>
		</Card>
	);
}

export const RemovableExerciseListCard = () => {
	return <ExerciseListCard operable={{ remove: true }} />;
};

export const SelectableExerciseListCard = ({
	onSelect,
	selectId,
}: {
	onSelect: (exerciseInfo: ExerciseInfo) => void;
	selectId: number | null;
}) => {
	return (
		<ExerciseListCard
			operable={{ select: true }}
			onSelect={(exerciseInfo) => onSelect(exerciseInfo)}
			selectId={selectId}
		/>
	);
};
