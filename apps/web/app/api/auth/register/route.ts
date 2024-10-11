import { prisma } from '@/packages/Prisma'

export async function POST() {
  const b = await prisma.user.findMany()
  console.log(b);
  return Response.json([])
}