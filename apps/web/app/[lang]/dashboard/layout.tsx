import { SideBar } from "@/components/Bars/SideBar/SideBar";
import { TopBar } from "@/components/Bars/TopBar/TopBar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-muted/50 flex text-muted-foreground">
      <SideBar/>
      <main className="flex-1 px-6">
        <TopBar></TopBar>
        { children }
      </main>
    </div>
  )
}