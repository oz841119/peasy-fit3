import { prisma } from "@/packages/Prisma"
import { NextRequest } from "next/server"
import { handleAuth } from "../auth/[...nextauth]/auth"

export const GET = async (request: NextRequest) => {
  const exercise = request.nextUrl.searchParams.get('exercise')
  const trainingList = await prisma.training.findMany({
    where: {
      exercise: exercise || ''
    }
  })
  return Response.json(trainingList)
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