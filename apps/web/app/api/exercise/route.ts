import { prisma } from "@/packages/Prisma";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { handleAuth } from "../auth/[...nextauth]/auth";
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const targetExerciseList = body["exerciseList"];
  if (!Array.isArray(targetExerciseList) && targetExerciseList.length > 0) {
    return NextResponse.json("exerciseList must be an array", { status: 400 });
  }
  const createManyResult = await prisma.exercise.createMany({
    skipDuplicates: true,
    data: targetExerciseList.map((name: string) => ({ name })),
  });
  console.log(createManyResult);
  const user = await getToken({ req: request, secret: "test" });
  if (user === null) {
    return NextResponse.json("Unauthorized", { status: 401 });
  } else {
    const exerciseList = await prisma.exercise.findMany({
      where: {
        name: {
          in: targetExerciseList,
        },
      },
    });
    await prisma.user.update({
      where: { id: user.userId as string },
      data: {
        exerciseList: {
          connect: exerciseList.map((exercise) => ({ id: exercise.id })),
        },
      },
    });
    return NextResponse.json({
      createdCount: createManyResult.count,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const user = await getToken({ req: request, secret: "test" });
  if (user === null) {
    return NextResponse.json("Unauthorized", { status: 401 });
  } else {
    const result = await prisma.user.findUnique({
      where: { id: user.userId as string },
      select: { exerciseList: true },
    });
    return NextResponse.json(result?.exerciseList || []);
  }
};

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json();
  const user = await handleAuth(request);
  const result = await prisma.user.update({
    where: { id: user.userId as string },
    data: {
      exerciseList: {
        disconnect: { id },
      },
    },
  });
  return NextResponse.json(result);
};
