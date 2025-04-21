import { NextRequest } from "next/server";
import { prisma } from "@/packages/Prisma";
import { handleAuth } from "../../auth/[...nextauth]/auth";

export const GET = async (request: NextRequest) => {
  const user = await handleAuth(request);
  const userId = user.userId;
  const trainingSessionId = request.nextUrl.searchParams.get("id");
  if (!trainingSessionId) {
    return Response.json(
      { error: "Training session ID is required" },
      { status: 400 }
    );
  }
  const trainingSession = await prisma.trainingSession.findUnique({
    where: {
      id: trainingSessionId,
    },
    select: {
      id: true,
      name: true,
      startAt: true,
      endAt: true,
      trainings: {
        select: {
          id: true,
          reps: true,
          weight: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });
  return Response.json(trainingSession);
};
