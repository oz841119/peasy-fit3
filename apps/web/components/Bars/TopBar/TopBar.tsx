'use client'
import { useWindowSize } from "@/hooks/useWindowSize";
import { User } from "./User/User";
import { MAX_MOBILE_SIZE } from "@/constants";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { Link, usePathname } from "@/i18n/routing";
import { menu } from "@/constants/menu";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { UserTrainingActiveStatus } from "@/components/Status/UserTrainingActiveStatus";
export function TopBar() {
  const windowSize = useWindowSize()
  const pathname = usePathname()
  const t = useTranslations()
  const pathLabel = useMemo(() => {
    const routeItem = menu.find(item => item.route === pathname)
    return routeItem?.label
  }, [pathname])
  return (
    <div className="py-4 flex items-center">
      <div className="flex gap-2 items-end">
        {windowSize.width <= MAX_MOBILE_SIZE && <h1 className="text-foreground font-bold text-xl">Peasy Fit</h1>}
        <div className="text-sm">{pathLabel ? t(pathLabel) : 'Unknown'}</div>
      </div>
      <div className="ml-auto flex gap-2 items-center">
          <Link href="/dashboard/session">
            <UserTrainingActiveStatus size="18" showName/>
          </Link>
        {
          windowSize.width > MAX_MOBILE_SIZE
            ? <User triggerClassName="ml-auto"></User>
            : <MobileMenu triggerClassName="ml-auto" />
        }
      </div>
    </div>
  )
}




