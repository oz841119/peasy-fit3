import { prisma } from "@/packages/Prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const names = searchParams.get("names");
  if (names) {
    const exerciseList = await prisma.exercise.findMany({
      where: {
        name: { in: names?.split(",") || [] },
      },
    });
    return NextResponse.json(exerciseList);
  } else {
    return NextResponse.json([]);
  }
};