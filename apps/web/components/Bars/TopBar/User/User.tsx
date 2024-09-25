'use client'
import { Avatar, AvatarFallback } from "@/components/shadcnUI/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/shadcnUI/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { routing, useRouter, usePathname } from '../../../../i18n/routing'
export function User() {
  const t = useTranslations()
  const currLocale = useLocale();
  const { locales } = routing
  const router = useRouter()
  const pathname = usePathname()
  const toggleLocale = (locale: typeof locales[number] ) => {
    router.push(pathname, { locale })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-auto cursor-pointer"><AvatarFallback><PersonIcon /></AvatarFallback></Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-end">{t('common.myAccount')}</DropdownMenuLabel>
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
                    key={locale}
                    disabled={currLocale === locale}
                    onSelect={() => toggleLocale(locale)}
                  >
                    <span>{locale}</span>
                  </DropdownMenuItem>
                )))
              }
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


