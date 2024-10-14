import { IconLink } from "@/components/Widgets/IconLink/IconLink"
import { Dice6, House, SquarePlus, Baby, BicepsFlexed } from "lucide-react"

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
        <IconLink
          href="/dashboard/exercise"
          icon={<BicepsFlexed width="20"/>}
        />
        <IconLink
          href="/dashboard/dev-cards"
          icon={<Baby width="20"/>}
        />
      </nav>
    </aside>
  )
}