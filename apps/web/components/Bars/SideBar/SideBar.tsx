'use client'
import { menu } from "@/constants/menu"
import { usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const SideBar = () => {
  const t = useTranslations()
  const pathname = usePathname()
  return (
    <aside className="py-5 bg-background px-2">
      <div className="mb-6 text-xl font-bold text-foreground px-3">Peasy Fit</div>
      <nav className="gap-4 flex flex-col">

        {
          menu.map(item => (
            <Link
              href={item.route}
              className={cn(
                'flex gap-2 px-4 py-2',
                pathname === item.route && 'text-foreground',
                'hover:bg-sidebar-accent rounded-xl'
              )}
              key={item.name}
            >
              { <item.icon width="20"/> }
              { t(item.label) }
            </Link>
          ))
        }
      </nav>
    </aside>
  )
}