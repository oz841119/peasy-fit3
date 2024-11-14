import { prisma } from "@/packages/Prisma"
import { NextRequest, NextResponse } from "next/server"
import { handleAuth } from "../auth/[...nextauth]/auth"

export const GET = async (request: NextRequest) => {
  const exerciseId = request.nextUrl.searchParams.get('exerciseId')
  if(exerciseId === null) return new NextResponse(null, { status: 400 })
  const trainingList = await prisma.training.findMany({
    where: {
      exerciseId: Number(exerciseId)
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
  return Response.json([])
}
