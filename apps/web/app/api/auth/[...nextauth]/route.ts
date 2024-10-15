import { prisma } from "@/packages/Prisma"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        console.log(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
            password: credentials?.password
          },
          select: {
            id: true,
            email: true
          }
        })
        return user
      },
    })
  ]
})

export { handler as GET, handler as POST }