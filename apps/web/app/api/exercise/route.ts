import { prisma } from "@/packages/Prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import { handleAuth } from "../auth/[...nextauth]/auth";
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
  const user = await getToken({req: request, secret: 'test'})
  if(user === null) {
    return NextResponse.json('Unauthorized', { status: 401 })
  } else {
    const result = await prisma.user.findUnique({
      where: { id: user.sub as string },
      select: { exerciseList: true }
    })
    if(result?.exerciseList.some(({ name }) => name === targetExercise)) {
      return NextResponse.json('', { status: 409 })
    }
    await prisma.user.update({
      where: { id: user.sub as string },
      data: {
        exerciseList: {
          connect: exercise
        }
      }
    })
    return NextResponse.json('')
  }
}

export const GET = async (request: NextRequest) => {
  const user = await getToken({req: request, secret: 'test'})
  if(user === null) {
    return NextResponse.json('Unauthorized', { status: 401 })
  } else {
    const result = await prisma.user.findUnique({
      where: { id: user.sub as string },
      select: { exerciseList: true }
    })
    return NextResponse.json(result?.exerciseList || [])
  }
}

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json()
  const user = await handleAuth(request)
  const result = await prisma.user.update({
    where: { id: user.sub as string },
    data: {
      exerciseList: {
        disconnect: { id }
      }
    }
  })
  return NextResponse.json(result)
}