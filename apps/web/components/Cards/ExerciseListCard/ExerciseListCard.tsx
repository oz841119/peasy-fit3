'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcnUI/card"
import { Skeleton } from "@/components/shadcnUI/skeleton"
import { ExerciseChip } from "@/components/Widgets/ExerciseChip/ExerciseChip"
import { deleteUserExercise, getUserExerciseList } from "@/services/userExercise"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleX } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, type JSX } from "react";

// Todo: Refactoring
const StatusStrategy = (strategy?: 'loading' | 'empty' | 'error') => {
  switch (strategy) {
    case 'loading': {
      return (
        <div className="w-full"><Skeleton className="h-10 w-full"/></div>
      )
    }
    case 'empty': {
      return (
        <div>Please create exericse</div>
      )
    }
    case 'error': {
      return (
        <div>Error...</div>
      )
    }
    default: {
      return null
    }
  }
}

interface ExerciseInfo {
  id: number,
  name: string
}
export function ExerciseListCard({}): JSX.Element
export function ExerciseListCard({ operable }: { operable: {remove: boolean }}): JSX.Element
export function ExerciseListCard(
  { operable, onSelect, selectId }:
  { 
    operable: { select: boolean },
    onSelect: (exerisceInfo: ExerciseInfo) => void, selectId?: number | null
   }):
  JSX.Element
export function ExerciseListCard(
  { operable, onSelect, selectId }:
  {
    operable?: { remove?: boolean, select?: boolean },
    onSelect?: (exercise: ExerciseInfo) => void,
    selectId?: number | null
  }) {
  const t = useTranslations()
  const queryClient = useQueryClient();
  const { data: exerciseList, error, isLoading, isSuccess } = useQuery({
    queryKey: ['exerciseList'],
    queryFn: () => getUserExerciseList()
  })
  const mutaion = useMutation({
    mutationFn: (id: number) => deleteUserExercise({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exerciseList'] }),
    onError: (error) => console.error(error)
  })
  const StatusStrategyCmp = StatusStrategy((() => {
    if(isLoading) {
      return 'loading'
    } else {
      if(exerciseList?.length) {
        return 'empty'
      }
      if(error) {
        return 'error'
      }
    }
  })())
  const headerText = useMemo(() => {
    let title = 'Exericse List'
    let description = ''
    if(operable?.select) {
      title = t('card.chooseExercise.title')
      description = t('card.chooseExercise.description')
    } else if (operable?.remove) {
      title = t('card.removeExercise.title')
      description = t('card.removeExercise.description')
    }
    return { title, description }
  }, [operable])
  return (
    <Card className="min-h-32">
      <CardHeader>
        <CardTitle> { headerText.title} </CardTitle>
        <CardDescription>{ headerText.description }</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          {
            exerciseList 
              ?
                exerciseList.map(exercise => (
                  <ExerciseChip
                    text={exercise.name}
                    key={exercise.id}
                    Icon={operable?.remove && <CircleX width={16}/>}
                    className={ selectId && (selectId === exercise.id) ? 'border-muted-foreground bg-muted' : ''}
                    onClick={() => {
                      if(operable?.remove) {
                        mutaion.mutate(exercise.id)
                      }
                      if(operable?.select && onSelect) {
                        onSelect(exercise)
                      }
                    }}
                  />
                ))
              : StatusStrategyCmp
          }
        </div>
      </CardContent>
    </Card>
  )
}

export const RemoveableExerciseListCard = () => {
  return <ExerciseListCard operable={{ remove: true }}></ExerciseListCard>
}

export const SelectableExerciseListCard = ({ onSelect, selectId }: {
  onSelect: (exericseInfo: ExerciseInfo) => void
  selectId: number | null
}) => {
  return <ExerciseListCard
    operable={{ select: true }}
    onSelect={(exericseInfo) => onSelect(exericseInfo)}
    selectId={selectId}
  />
}