import { prisma } from "@/packages/Prisma"
import { NextRequest, NextResponse } from "next/server"
import { handleAuth } from "../auth/[...nextauth]/auth"

export const GET = async (request: NextRequest) => {
  const user = await handleAuth(request)
  const userId = user.userId
  const exerciseId = request.nextUrl.searchParams.get('exerciseId')
  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')
  if(exerciseId === null) return new NextResponse(null, { status: 400 })

  const total = await prisma.training.count({
    where: {
      exerciseId: Number(exerciseId),
      userId: userId
    }
  })
  const trainingRecordList = await prisma.training.findMany({ // TODO: 性能, 索引
    where: {
      exerciseId: Number(exerciseId),
      userId: userId
    },
    skip: Number(skip),
    take: Number(take) || undefined,
    orderBy: {
      date: 'desc'
    }
  })
  return Response.json({ trainingRecordList, total })
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const user = await handleAuth(request)
    const addTrainingRecord = await prisma.training.createMany({
      data: body.map((item: any) => ({...item, userId: user.userId}))
    })
    return Response.json(addTrainingRecord)
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 })
  }
}

export const DELETE = async (request: NextRequest) => {
  const body = await request.json()
  const deleteTrainingRecordResult = await prisma.training.deleteMany({
    where: { id: { in: body.ids } }
  })
  return Response.json(deleteTrainingRecordResult)
}