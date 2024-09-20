import { TopBar } from "@/components/Bars/TopBar/TopBar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-muted/50">
      <TopBar></TopBar>
      { children }
    </div>
  )
}