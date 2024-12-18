import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: '...',
  description: '...',
}
export default async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions)
    if(session) {
      redirect('/dashboard')
    }
  return children
}