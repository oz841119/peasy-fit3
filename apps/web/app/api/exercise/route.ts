import { prisma } from "@/packages/Prisma";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const targetExercise = body['exercise'] || ''
  let exercise = await prisma.exercise.findUnique({
    where: {
      name: targetExercise
    }
  })
  if(!exercise) {
    exercise = await prisma.exercise.create({
      data: {
        name: targetExercise
      }
    })
  }
  const d = await prisma.user.update({
    where: { id: 9 },
    data: {
      exerciseList: {
        connect: exercise
      }
    }
  })
  return Response.json(exercise)
}