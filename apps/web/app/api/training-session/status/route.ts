import { NextRequest } from "next/server"
import { handleAuth } from "../../auth/[...nextauth]/auth"
import { prisma } from "@/packages/Prisma"
import { z } from "zod"

export const GET = async (request: NextRequest) => {
  const user = await handleAuth(request)
  const userId = user.userId
  const userCurrentTrainingSessionStatus = await prisma.userCurrentTrainingSessionStatus.findUnique({
    where: {
      userId
    }
  })
  if(userCurrentTrainingSessionStatus === null) {
    return Response.json(false)
  } else {
    return Response.json(userCurrentTrainingSessionStatus.isActive) 
  }
}

const patchSchema = z.object({
  isActive: z.boolean(),
})
export const PATCH = async (request: NextRequest) => {
  const [body, user] = await Promise.all([request.json(), handleAuth(request)])
  const parsedBody = patchSchema.parse(body)
  const userId = user.userId
  const userCurrentTrainingSessionStatus = await prisma.userCurrentTrainingSessionStatus.findUnique({
    where: { userId }
  })
  if(userCurrentTrainingSessionStatus === null) {
    if(parsedBody.isActive) {
      console.log('dddd:' + userId);
      
      const statusAndResult = await prisma.$transaction(async (tx) => {
        const createdSession = await tx.trainingSession.create({
          data: {
            userId,
            startAt: new Date(),
          }
        })
        const _createdSessionStatus = await tx.userCurrentTrainingSessionStatus.create({
          data: {
            userId,
            isActive: true,
            trainingSessionId: createdSession.id
          }
        })
        return {
          status: _createdSessionStatus,
          result: createdSession
        }
      })
      return Response.json(statusAndResult)
    } else {
      return Response.json('Training session status is not created', { status: 409 })
    }
  }
  if(parsedBody.isActive === userCurrentTrainingSessionStatus.isActive) {
    return Response.json('Identical training session status active', { status: 409 })
  } else {
    if(parsedBody.isActive) {
      const statusAndResult = await prisma.$transaction(async (tx) => {
        const createdSession = await tx.trainingSession.create({
          data: {
            userId,
            startAt: new Date(),
          }
        })
        const _updatedSessionStatus = await tx.userCurrentTrainingSessionStatus.update({
          where: { userId },
          data: {
            isActive: true,
            trainingSessionId: createdSession.id
          }
        })
        return {
          status: _updatedSessionStatus,
          result: createdSession
        }
      })
      return Response.json(statusAndResult)
    } else {
      const statusAndResult = await prisma.$transaction(async (tx) => {
        const _updatedSessionStatus = await tx.userCurrentTrainingSessionStatus.update({
          where: { userId },
          data: { isActive: false }
        })
        const updatedSession = await tx.trainingSession.update({
          where: { id: userCurrentTrainingSessionStatus.trainingSessionId },
          data: { endAt: new Date() }
        })
        return {
          status: _updatedSessionStatus,
          result: updatedSession
        }
      })
      return Response.json(statusAndResult)
    }
  }
}