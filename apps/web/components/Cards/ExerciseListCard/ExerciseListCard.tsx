'use client'
import { Button } from "@/components/shadcnUI/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcnUI/card"
import { ExerciseChip } from "@/components/Widgets/ExerciseChip/ExerciseChip"
import { deleteExercise, getExerciseList } from "@/services/exercise"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleX } from "lucide-react"

// Todo: Refactoring
const StatuStrategy = (strategy?: 'loading' | 'empty' | 'error') => {
  switch (strategy) {
    case 'loading': {
      return (
        <div>Loading...</div>
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
export function ExerciseListCard({ operable }: { operable: {remove: boolean}}): JSX.Element
export function ExerciseListCard({ operable, onSelect, selectId }: { operable: { select: boolean }, onSelect: (exerisceInfo: ExerciseInfo) => void, selectId?: number | null }): JSX.Element
export function ExerciseListCard(
  { operable, onSelect, selectId }:
  {
    operable?: { remove?: boolean, select?: boolean },
    onSelect?: (exercise: ExerciseInfo) => void,
    selectId?: number | null
  }) {
  const queryClient = useQueryClient();
  const { data: exerciseList, error, isLoading, isSuccess } = useQuery({
    queryKey: ['exerciseList'],
    queryFn: () => getExerciseList()
  })
  const mutaion = useMutation({
    mutationFn: (id: number) => deleteExercise({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exerciseList'] }),
    onError: (error) => console.error(error)
  })
  const StatuStrategyCmp = StatuStrategy((() => {
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
  return (
    <Card className="min-h-32">
      <CardHeader>
        <CardTitle>Current Exercise List</CardTitle>
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
              : StatuStrategyCmp
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