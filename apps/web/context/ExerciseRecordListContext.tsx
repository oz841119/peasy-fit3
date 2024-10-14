'use client'
import { getTrainingRecordList } from "@/services/trainingRecord";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react"
import { useImmer } from "use-immer";
interface ExerciseRecord {
  date: Date;
  exercise: string;
  weight: number;
  reps: number;
  id: string;
  comment: string
}
interface Context {
  filter: {
    exercise: string | null
  }
  exerciseRecordList: {
    current: ExerciseRecord[] | undefined,
    error: Error | null,
    isLoading: boolean
  }
}

const defaultValues = {
  filter: {
    exercise: null
  },
  exerciseRecordList: {
    current: [],
    error: null,
    isLoading: false
  }
}
const ExerciseRecordListContext = createContext<Context>(defaultValues)
export const ExerciseRecordListContextProvider = ({ children }: PropsWithChildren) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getTrainingRecordList'],
    queryFn: () => getTrainingRecordList({ exercise: 'push' })
  })
  
  return (
    <ExerciseRecordListContext.Provider
      value={{
        filter: {
          exercise: ''
        },
        exerciseRecordList: {
          current: data,
          error: error,
          isLoading: isLoading
        }
      }}
    >
      { children }
    </ExerciseRecordListContext.Provider>
  )
}