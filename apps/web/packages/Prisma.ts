import { PrismaClient } from '../../../packages/db/src/client/index'
const createPrisma = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof createPrisma>;
} & typeof global;

const prisma = globalThis && createPrisma()
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
export {
  prisma
}