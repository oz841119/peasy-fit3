"use client";
import {
	deleteTrainingRecord,
	getTrainingRecordList,
} from "@/services/trainingRecord";
import { getUserExerciseList } from "@/services/userExercise";
import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import { type Updater, useImmer } from "use-immer";

interface ITrainingRecordContext {
	filter: {
		exerciseId: number | null;
		take: number | null;
		skip: number | null;
		weight?: number;
		reps?: number;
	};
	updateFilter: Updater<ITrainingRecordContext["filter"]>;
	exerciseList: {
		current: Awaited<ReturnType<typeof getUserExerciseList>> | undefined;
		error: Error | null;
		isLoading: boolean;
	};
	trainingRecordListQuery: UseQueryResult<
		Awaited<ReturnType<typeof getTrainingRecordList>>,
		Error
	>;
	deleteTrainingRecordMutation: UseMutationResult<{ count: number }>;
	getExerciseNameById: (id: number) => string | null;
}

const defaultValues = {
	filter: {
		exerciseId: null,
		take: 10,
		skip: 0,
	},
	updateFilter: () => {},
	exerciseList: {
		current: [],
		error: null,
		isLoading: false,
	},
	trainingRecordListQuery: {} as UseQueryResult<
		Awaited<ReturnType<typeof getTrainingRecordList>>,
		Error
	>,
	getExerciseNameById: () => null,
	deleteTrainingRecordMutation: {} as UseMutationResult<{ count: number }>,
};
const TrainingRecordContext =
	createContext<ITrainingRecordContext>(defaultValues);
export const useTrainingRecordContext = () => {
	return useContext(TrainingRecordContext);
};
export const TrainingRecordContextProvider = ({
	children,
}: PropsWithChildren) => {
	const [filter, updateFilter] = useImmer<ITrainingRecordContext["filter"]>(
		defaultValues.filter,
	);

	const trainingRecordListQuery = useQuery({
		queryKey: ["getTrainingRecordList", filter],
		queryFn: () =>
			getTrainingRecordList({
				exerciseId: filter.exerciseId ?? undefined,
				skip: filter.skip ?? undefined,
				take: filter.take ?? undefined,
				weight: filter.weight ?? undefined,
				reps: filter.reps ?? undefined,
			}),
		enabled: !!filter.exerciseId,
	});
	const deleteTrainingRecordMutation = useMutation({
		mutationFn: (ids: number[]) => deleteTrainingRecord(ids),
		onSuccess: () => {
			trainingRecordListQuery.refetch();
		},
	});
	const {
		data: exerciseList,
		error: exerciseListError,
		isLoading: exerciseListIsLoading,
	} = useQuery({
		queryKey: ["getUserExerciseList"],
		queryFn: () => getUserExerciseList(),
	});
	const exerciseNameMapRef = useRef(new Map<number, string | null>());
	const getExerciseNameById = useCallback(
		(id: number) => {
			if (exerciseNameMapRef.current.has(id)) {
				return exerciseNameMapRef.current.get(id) || null;
			}
				if (exerciseList && exerciseList?.length > 0) {
					const name = exerciseList.find(
						(exercise) => exercise.id === id,
					)?.name;
					if (name) {
						exerciseNameMapRef.current.set(id, name);
					}
					return name || null;
				}
			return null;
		},
		[exerciseList],
	);
	return (
		<TrainingRecordContext.Provider
			value={{
				filter: filter,
				updateFilter: updateFilter,
				trainingRecordListQuery: trainingRecordListQuery,
				deleteTrainingRecordMutation:
					deleteTrainingRecordMutation as UseMutationResult<{ count: number }>,
				exerciseList: {
					current: exerciseList,
					error: exerciseListError,
					isLoading: exerciseListIsLoading,
				},
				getExerciseNameById: getExerciseNameById,
			}}
		>
			{children}
		</TrainingRecordContext.Provider>
	);
};
