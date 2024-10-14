import { prisma } from "@/packages/Prisma";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const targetExercise = body['exercise'] || ''
  if(typeof targetExercise === 'string' && targetExercise) {
    const isExistExercise = await prisma.exercise.findUnique({
      where: {
        name: targetExercise // todo
      }
    })
  }
  return Response.json([])
}