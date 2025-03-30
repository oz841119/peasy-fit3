import { prisma } from "@/packages/Prisma";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { handleAuth } from "../auth/[...nextauth]/auth";
export const POST = async (request: NextRequest) => {
	const [user, body] = await Promise.all([handleAuth(request), request.json()]);
	const targetExerciseList = body.exerciseList;
	if (!Array.isArray(targetExerciseList)) {
		return NextResponse.json("exerciseList must be an array", { status: 400 });
	}
	try {
		const createdList = await prisma.$transaction(
			async (tx) => {
				const upsertExerciseResult = await Promise.all(
					targetExerciseList.map((name) =>
						tx.exercise.upsert({
							where: { name },
							update: {},
							create: { name },
						}),
					),
				);
				const oldUser = await tx.user.findUnique({
					where: { id: user.userId as string },
					select: { exerciseList: true },
				});
				if (!oldUser) {
					throw "No found user";
				}
				const { exerciseList: updateUserExerciseList } = await tx.user.update({
					where: { id: user.userId as string },
					data: {
						exerciseList: {
							connect: upsertExerciseResult.map(({ id }) => ({ id })),
						},
					},
					select: { exerciseList: true },
				});
				const updatedDiff = updateUserExerciseList.filter(
					(exercise) =>
						!oldUser.exerciseList.some(({ id }) => id === exercise.id),
				);
				return {
					createdCount: updatedDiff.length,
					content: updatedDiff,
				};
			},
			{
				timeout: 20000,
			},
		);
		return NextResponse.json(createdList);
	} catch (err) {
		return NextResponse.json(err, { status: 400 });
	}
};

export const GET = async (request: NextRequest) => {
	const user = await getToken({ req: request, secret: "test" });
	if (user === null) {
		return NextResponse.json("Unauthorized", { status: 401 });
	}
		const result = await prisma.user.findUnique({
			where: { id: user.userId as string },
			select: { exerciseList: true },
		});
		return NextResponse.json(result?.exerciseList || []);
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
