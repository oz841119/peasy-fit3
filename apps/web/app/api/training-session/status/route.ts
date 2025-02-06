import { NextRequest } from "next/server"
import { handleAuth } from "../../auth/[...nextauth]/auth"
import { prisma } from "@/packages/Prisma"

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