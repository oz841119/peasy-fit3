import { prisma } from "@/packages/Prisma"
import { NextRequest, NextResponse } from "next/server"
import { handleAuth } from "../auth/[...nextauth]/auth"
import { z } from "zod"

export const GET = async (request: NextRequest) => {
  try {
    const exerciseId = request.nextUrl.searchParams.get('exerciseId')
    const safeParse = z.string().safeParse(exerciseId)
    if(!safeParse.success) {
      throw safeParse.error.issues.map(issue => issue.message).join(' | ')
    }
    const exerciseName = prisma.exercise.findUnique({
      where: {
        id: Number(exerciseId)
      },
      select: {
        name: true
      }
    })
    const trainingList = await prisma.training.findMany({
      where: {
        exerciseId: Number(exerciseId)
      }
    })
    return Response.json(trainingList.map(training => ({...training, exerciseName: exerciseName})))
  } catch(err) {
    return NextResponse.json(err, {
      status: 400
    })
  }
}

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const user = await handleAuth(request)
  const addTrainingRecord = await prisma.training.createMany({
    data: body.map((item: any) => ({...item, userId: user.sub}))
  })
  console.log(addTrainingRecord);
  return Response.json([])
}