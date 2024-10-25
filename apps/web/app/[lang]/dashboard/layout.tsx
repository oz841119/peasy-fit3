'use client'
import { SideBar } from "@/components/Bars/SideBar/SideBar";
import { TopBar } from "@/components/Bars/TopBar/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { data, status } = useSession()
  const router = useRouter()
  if(status !== 'loading' && !data) {
    router.push('/login')
    return
  }
  return (
    <div className="min-h-screen bg-muted/50 flex text-muted-foreground">
      <SideBar/>
      <main className="flex-1 px-6">
        <div className="mb-4">
          <TopBar/>
        </div>
        { children }
      </main>
      <Toaster />
    </div>
  )
}