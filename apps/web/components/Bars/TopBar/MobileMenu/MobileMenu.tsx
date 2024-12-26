'use client'
import { Badge } from "@/components/shadcnUI/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/shadcnUI/sheet"
import { menu } from "@/constants/menu"
import { useLangToggler } from "@/hooks/useLangToggler"
import { getLocaleName, routing, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { EllipsisVertical, Languages, LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { HTMLAttributes, useEffect, useState } from "react"

interface Props {
  triggerClassName?: string
}

const RowTile = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('flex items-center h-10', className)}>{children}</div>
  )
}
export const MobileMenu = ({ triggerClassName = '' }: Props) => {
  const { data } = useSession()
  const userName = data?.user.name
  const { locales } = routing
  const currLocale = useLocale()
  const t = useTranslations()
  const { toggleLocale } = useLangToggler()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  return (
    <Sheet open={isOpen} onOpenChange={target => setIsOpen(target)}>
      <SheetTrigger asChild>
        <EllipsisVertical className={cn(triggerClassName)} onClick={() => setIsOpen(true)} />
      </SheetTrigger>
      <SheetContent side="left" className="max-w-72 sm:max-w-72 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left">Peasy Fit</SheetTitle>
          <SheetDescription className="sr-only">Peasy Fit menu</SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col text-sm">
          <RowTile className="font-bold text-xs text-muted-foreground">{ t('common.pages') }</RowTile>
          <div>
            {
              menu.map(item => (
                <RowTile key={item.name}>
                  <Link href={item.route} className={cn('flex gap-2 items-center text-muted-foreground', pathname === item.route && 'text-foreground')}>
                    { <item.icon width="16"/>}
                    { t(item.label) }
                  </Link>
                </RowTile>
              ))
            }
          </div>
          <div className="mt-auto">
            <div className="text-sm">
              <RowTile className="font-bold text-xs text-muted-foreground">{ t('common.setLanguage') }</RowTile>
              {
                locales.map(locale => (
                  <RowTile
                    key={locale}
                    onClick={() => { toggleLocale(locale) }}
                    className={currLocale !== locale ? 'text-muted-foreground' : ''}
                  >
                    <Languages className="w-4 mr-3" />
                    {getLocaleName(locale)}
                    {
                      currLocale === locale &&
                      <Badge variant="secondary" className="scale-75 origin-right">current</Badge>
                    }
                  </RowTile>
                ))
              }
            </div>
            <div className="flex text-sm items-center justify-between mt-6">
              <span className=" font-bold text-base">{userName}</span>
              <LogOut className="w-4" onClick={() => signOut()} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}