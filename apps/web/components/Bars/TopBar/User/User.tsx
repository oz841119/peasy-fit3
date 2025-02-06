'use client'
import { signOut, useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/shadcnUI/dropdown-menu";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { routing } from '@/i18n/routing'
import { Badge } from "@/components/shadcnUI/badge";
import { Skeleton } from "@/components/shadcnUI/skeleton";
import { cn } from "@/lib/utils";
import { useLangToggler } from "@/hooks/useLangToggler";
import { Button } from "@/components/shadcnUI/button";
interface Props {
  triggerClassName?: string
}
export function User({ triggerClassName = '' }: Props) {
  const t = useTranslations()
  const currLocale = useLocale();
  const { locales } = routing
  const { toggleLocale }= useLangToggler()
  const { data, status } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        { 
          <Button className="ml-auto" size="sm" variant="outline">
            <div className={cn('text-sm flex items-center gap-1', triggerClassName)}>
              { status === 'authenticated' ? data?.user.name || 'User' : <Skeleton className="w-16 h-full"/>}
              <ChevronDown size="16"/>
            </div>
          </Button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="justify-end cursor-pointer">{t('common.myAccount')}</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger arrowPosition="start">
            <span>{t('common.selectLanguage')}</span>
            <Languages className="ml-2 h-4 w-4" />
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {
                locales.map((locale => (
                  <DropdownMenuItem
                    className="cursor-pointer flex justify-between"
                    key={locale}
                    disabled={currLocale === locale}
                    onSelect={() => toggleLocale(locale)}
                  >
                    <span>{locale}</span>
                    {
                      currLocale === locale &&
                    <Badge variant="secondary" className="scale-75 origin-right">current</Badge>
                    }
                  </DropdownMenuItem>
                )))
              }
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem className="cursor-pointer justify-end font-bold" onClick={() => signOut()}>
          {t('common.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


