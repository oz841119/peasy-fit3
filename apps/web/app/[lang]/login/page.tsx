'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { LoginCard } from "@/components/Cards/LoginCard/LoginCard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if(session) {
    redirect('/dashboard')
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginCard/>
    </div>
  )
}