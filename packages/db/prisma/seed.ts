import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
	const alice = await prisma.user.upsert({
		where: { email: "test@test.com" },
		update: {},
		create: {
			email: "test@test.com",
			password: "test",
			salt: "test",
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
