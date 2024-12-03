'use client'
import { SideBar } from "@/components/Bars/SideBar/SideBar";
import { TopBar } from "@/components/Bars/TopBar/TopBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { data, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if(status !== 'loading' && !data) {
      router.push('/login')
    }
  }, [status, data, router])
  return (
    <div className="min-h-screen bg-muted/50 flex text-muted-foreground">
      <SideBar/>
      <main className="flex-1 px-6">
        <div className="mb-4">
          <TopBar/>
        </div>
        { children }
      </main>
    </div>
  )
}