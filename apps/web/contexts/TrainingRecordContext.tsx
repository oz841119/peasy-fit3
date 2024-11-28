'use client'
import { getExerciseList } from "@/services/exercise";
import { deleteTrainingRecord, getTrainingRecordList } from "@/services/trainingRecord";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef } from "react"
import { Updater, useImmer } from "use-immer";

interface ITrainingRecordContext {
  filter: {
    exerciseId: number | null,
    take: number,
    skip: number,
  }
  updateFilter: Updater<ITrainingRecordContext['filter']>
  exerciseList: {
    current: Awaited<ReturnType<typeof getExerciseList>> | undefined,
    error: Error | null,
    isLoading: boolean
  }
  trainingRecordListQuery: {
    current: Awaited<ReturnType<typeof getTrainingRecordList>> | undefined,
    error: Error | null,
    isLoading: boolean
  }
  deleteTrainingRecordMutation: UseMutationResult
  getExerciseNameById: (id: number) => string | null
}

const defaultValues = {
  filter: {
    exerciseId: null,
    take: 10,
    skip: 0,
  },
  updateFilter: () => { },
  exerciseList: {
    current: [],
    error: null,
    isLoading: false
  },
  trainingRecordListQuery: {
    current: undefined,
    error: null,
    isLoading: false
  },
  getExerciseNameById: () => null,
  deleteTrainingRecordMutation: {} as UseMutationResult
}
const TrainingRecordContext = createContext<ITrainingRecordContext>(defaultValues)
export const useTrainingRecordContext = () => {
  return useContext(TrainingRecordContext)
}
export const TrainingRecordContextProvider = ({ children }: PropsWithChildren) => {
  const [filter, updateFilter] = useImmer<ITrainingRecordContext['filter']>(defaultValues.filter)

  const {
    data: trainingRecordList,
    error: trainingRecordListError,
    isLoading: trainingRecordListIsLoading,
    refetch: trainingRecordListRefetch
  } = useQuery({
    queryKey: ['getTrainingRecordList', filter.exerciseId, filter.skip],
    queryFn: () => getTrainingRecordList({ exerciseId: filter.exerciseId || undefined, skip: filter.skip, take: filter.take }),
    enabled: !!filter.exerciseId
  })
  const deleteTrainingRecordMutation = useMutation<void, Error, number[]>({
    mutationFn: (ids: number[]) => deleteTrainingRecord(ids),
    onSuccess: () => {
      trainingRecordListRefetch();
    }
  })
  const { data: exerciseList, error: exerciseListError, isLoading: exerciseListIsLoading } = useQuery({
    queryKey: ['getExerciseList'],
    queryFn: () => getExerciseList()
  })
  useEffect(() => {
    if (!filter.exerciseId) {
      updateFilter(draft => {
        if (exerciseList && exerciseList?.length > 0) {
          draft.exerciseId = exerciseList[0].id
        }
      })
    }
  }, [exerciseList])
  const exerciseNameMapRef = useRef(new Map<number, string | null>())
  const getExerciseNameById = useCallback((id: number) => {
    if (exerciseNameMapRef.current.has(id)) {
      return exerciseNameMapRef.current.get(id) || null
    } else {
      if (exerciseList && exerciseList?.length > 0) {
        const name = exerciseList.find(exercise => exercise.id === id)?.name
        if (name) {
          exerciseNameMapRef.current.set(id, name)
        }
        return name || null
      }
    }
    return null
  }, [exerciseList])
  return (
    <TrainingRecordContext.Provider
      value={{
        filter: filter,
        updateFilter: updateFilter,
        trainingRecordListQuery: {
          current: trainingRecordList,
          error: trainingRecordListError,
          isLoading: trainingRecordListIsLoading
        },
        deleteTrainingRecordMutation: deleteTrainingRecordMutation as UseMutationResult,
        exerciseList: {
          current: exerciseList,
          error: exerciseListError,
          isLoading: exerciseListIsLoading
        },
        getExerciseNameById: getExerciseNameById
      }}
    >
      {children}
    </TrainingRecordContext.Provider>
  )
}