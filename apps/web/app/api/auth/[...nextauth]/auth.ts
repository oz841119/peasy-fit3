import { prisma } from "@/packages/Prisma";
import { NextAuthOptions } from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextRequest, NextResponse } from "next/server";
CredentialsProvider
export const authOptions: NextAuthOptions = {
  secret: 'test',
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        console.log(123213213213213);
        
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
        console.log(user);
        return user
      },
    })
  ],
}

export const handleAuth = async (req: NextRequest) => {
  const user = await getToken({req: req, secret: 'test'})
  if(user === null) {
    throw NextResponse.json('Unauthorized', { status: 401 })
  } else {
    return user
  }
}
