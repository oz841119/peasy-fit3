import { z } from "zod";

export const addTrainingRecordFormSchema = z.object({
  date: z.date(),
  exerciseId: z.number().min(1).nullable(),
  weight: z.number().min(1).nullable(),
  reps: z.number().min(1).nullable(),
  sets: z.number().min(1).max(10).nullable(),
  comment: z.string()
})

export type AddTrainingRecordFormSchema = z.infer<typeof addTrainingRecordFormSchema>