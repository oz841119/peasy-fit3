import { prisma } from "@/packages/Prisma"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  const exercise = request.nextUrl.searchParams.get('exercise')
  return Response.json([])
}

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const addTrainingRecord = await prisma.training.createMany({
    data: body
  })
  console.log(addTrainingRecord);
  return Response.json([])
}