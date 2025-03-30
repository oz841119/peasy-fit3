import { PrismaClient } from "@peasy-fit/db";
const createPrisma = () => {
	return new PrismaClient();
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
	prismaGlobal?: ReturnType<typeof createPrisma>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? createPrisma();
if (process.env.NODE_ENV !== "production") {
	globalThis.prismaGlobal = prisma;
}
export { prisma };
