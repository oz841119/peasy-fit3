import { IconLink } from "@/components/Widgets/IconLink/IconLink"
import { Dice6, House, SquarePlus } from "lucide-react"
import Link from "next/link"

export const SideBar = () => {
  return (
    <aside className="px-2 py-5 bg-background">
      <nav className="gap-4 flex flex-col">
        <IconLink
          href="/"
          icon={<House width="20"/>}
        />
        <IconLink
          href="/dashboard/training-record"
          icon={<Dice6 width="20"/>}
        />
        <IconLink
          href="/dashboard/add-record"
          icon={<SquarePlus width="20"/>}
        />
      </nav>
    </aside>
  )
}