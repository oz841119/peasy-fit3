'use client'
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback } from "@/components/shadcnUI/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/shadcnUI/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { routing, useRouter, usePathname } from '@/i18n/routing'
import { Badge } from "@/components/shadcnUI/badge";
import { Skeleton } from "@/components/shadcnUI/skeleton";
import { cn } from "@/lib/utils";
import { useLangToggler } from "@/hooks/useLangToggler";
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
          <div className={cn('cursor-pointer self-stretch text-sm', triggerClassName)}>
            { status === 'authenticated' ? data?.user.name || 'User' : <Skeleton className="w-16 h-full"/>}
          </div>
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


