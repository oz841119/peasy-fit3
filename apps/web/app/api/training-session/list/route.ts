import { NextRequest } from "next/server"
import { handleAuth } from "../../auth/[...nextauth]/auth"
import { prisma } from "@/packages/Prisma"

export const GET = async (request: NextRequest) => {
  const user = await handleAuth(request)
  const userId = user.userId
  const trainingSessions = await prisma.trainingSession.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      name: true
    }
  })
  return Response.json(trainingSessions)
}