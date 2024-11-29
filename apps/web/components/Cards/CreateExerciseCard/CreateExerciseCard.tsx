'use client'
import { Button } from "@/components/shadcnUI/button"
import { BaseCard } from "../BaseCard"
import { Input } from "@/components/shadcnUI/input"
import { FormEventHandler, useState } from "react"
import { addUserExercise } from "@/services/userExercise"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { PropsWithClassName } from "@/types"
import { z } from "zod";
export const CreateExerciseCard = ({ className }: PropsWithClassName) => {
  const { toast } = useToast()
  const [exercise, setExercise] = useState('')
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ exercise }: { exercise: string }) => addUserExercise({ exerciseList: [exercise] }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exerciseList'] }),
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const exerciseSchema = z.string()
      .min(2, { message: 'Must be 2 or more characters long'})
      .max(15, { message: 'Must be 15 or fewer characters long'})
    const { data, error } = exerciseSchema.safeParse(exercise)
    if(error) {
      toast({
        title: "Error",
        description: error.issues.map(e => e.message).join(' | '),
        variant: "destructive"
      })
    } else {
      mutation.mutate({ exercise: data })
    }
  }
  return (
    <BaseCard
      title="Create Exercise"
      description="Create Exercise"
      className={className}
    >
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <Input placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)}/>
        <Button type="submit" disabled={!exercise || mutation.isPending}>Create</Button>
      </form>
    </BaseCard>
  )
}