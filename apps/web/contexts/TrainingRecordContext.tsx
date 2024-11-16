'use client'
import { getExerciseList } from "@/services/exercise";
import { getTrainingRecordList } from "@/services/trainingRecord";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef } from "react"
import { Updater, useImmer } from "use-immer";

interface ITrainingRecordContext {
  filter: {
    exerciseId: number | null
  }
  updateFilter: Updater<ITrainingRecordContext['filter']>
  exerciseList: {
    current: Awaited<ReturnType<typeof getExerciseList>> | undefined,
    error: Error | null,
    isLoading: boolean
  }
  trainingRecordList: {
    current: Awaited<ReturnType<typeof getTrainingRecordList>> | undefined,
    error: Error | null,
    isLoading: boolean
  }
  getExerciseNameById: (id: number) => string | null
}

const defaultValues = {
  filter: {
    exerciseId: null
  },
  updateFilter: () => {},
  exerciseList: {
    current: [],
    error: null,
    isLoading: false
  },
  trainingRecordList: {
    current: [],
    error: null,
    isLoading: false
  },
  getExerciseNameById: () => null
}
const TrainingRecordContext = createContext<ITrainingRecordContext>(defaultValues)
export const useTrainingRecordContext = () => {
  return useContext(TrainingRecordContext)
}
export const TrainingRecordContextProvider = ({ children }: PropsWithChildren) => {
  const [filter, updateFilter] = useImmer<ITrainingRecordContext['filter']>(defaultValues.filter)

  const { data: trainingRecordList, error: trainingRecordListError, isLoading: trainingRecordListIsLoading } = useQuery({
    queryKey: ['getTrainingRecordList', filter.exerciseId],
    queryFn: () => getTrainingRecordList({ exerciseId: filter.exerciseId || undefined, skip: 0, take: 10}),
    enabled: !!filter.exerciseId
  })
  const { data: exerciseList, error: exerciseListError, isLoading: exerciseListIsLoading } = useQuery({
    queryKey: ['getExerciseList'],
    queryFn: () => getExerciseList()
  })
  useEffect(() => {
    if(!filter.exerciseId) {
      updateFilter(draft => {
        if(exerciseList && exerciseList?.length > 0) {
          draft.exerciseId = exerciseList[0].id
        }
      })
    }
  }, [exerciseList])
  const exerciseNameMapRef = useRef(new Map<number, string | null>())
  const getExerciseNameById = useCallback((id: number) => {
    if(exerciseNameMapRef.current.has(id)) {
      return exerciseNameMapRef.current.get(id) || null
    } else {
      if(exerciseList && exerciseList?.length > 0) {
        const name = exerciseList.find(exercise => exercise.id === id)?.name
        if(name) {
          exerciseNameMapRef.current.set(id, name)
        }
        return name || null
      }
    }
    return null
  }, [exerciseList])
  console.log(exerciseList);
  
  return (
    <TrainingRecordContext.Provider
      value={{
        filter: filter,
        updateFilter: updateFilter,
        trainingRecordList: {
          current: trainingRecordList,
          error: trainingRecordListError,
          isLoading: trainingRecordListIsLoading
        },
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