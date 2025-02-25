import { z } from "zod";

export const addTrainingRecordFormSchema = z.object({
  trainingSessionId: z.string().nullable(),
  date: z.date(),
  exerciseId: z.number().min(1).nullable(),
  weight: z.number().min(1),
  reps: z.number().min(1),
  sets: z.number().min(1).max(10),
  comment: z.string()
})

export type AddTrainingRecordFormSchema = z.infer<typeof addTrainingRecordFormSchema>