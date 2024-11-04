'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/shadcnUI/select"
import { getExerciseList } from "@/services/exercise"
import { useQuery } from "@tanstack/react-query"
export const ExerciseSelect = () => {
  const { data } = useQuery({
    queryKey: ['getExerciseList'],
    queryFn: () => getExerciseList()
  })
  return (
    <Select value="">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select exercise" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}