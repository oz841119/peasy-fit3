'use client'
import { Button } from "@/components/shadcnUI/button"
import { BaseCard } from "../BaseCard"
import { Input } from "@/components/shadcnUI/input"
import { FormEventHandler, useState } from "react"
export const CreateExerciseCard = () => {
  const [exercise, setExercise] = useState('')
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(exercise);
  }
  return (
    <BaseCard
      title="Create Exercise"
      description="Create Exercise"
    >
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <Input placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)}/>
        <Button type="submit">Create</Button>
      </form>
    </BaseCard>
  )
}