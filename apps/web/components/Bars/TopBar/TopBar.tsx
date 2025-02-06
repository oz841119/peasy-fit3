'use client'
import { useWindowSize } from "@/hooks/useWindowSize";
import { NavBreadcrumb } from "./NavBreadcrumb/NavBreadcrumb";
import { User } from "./User/User";
import { MAX_MOBILE_SIZE } from "@/constants";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { Link, usePathname } from "@/i18n/routing";
import { menu } from "@/constants/menu";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Dumbbell } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
export function TopBar() {
  const windowSize = useWindowSize()
  const pathname = usePathname()
  const t = useTranslations()
  const pathLabel = useMemo(() => {
    const routeItem = menu.find(item => item.route === pathname)
    return routeItem?.label
  }, [pathname])
  const isInTraining = true;
  return (
    <div className="py-4 flex items-center">
      {/* <NavBreadcrumb></NavBreadcrumb> */}
      <div className="flex gap-2 items-end">
        {windowSize.width <= MAX_MOBILE_SIZE && <h1 className="text-foreground font-bold text-xl">Peasy Fit</h1>}
        <div className="text-sm">{pathLabel ? t(pathLabel) : 'Unknown'}</div>
      </div>
      <div className="ml-auto flex gap-2 items-center">
        <Tooltip text={isInTraining ? t('common.inTraining') : t('common.notInTraining')}>
          <Link href="/dashboard/session">
            <Dumbbell color={isInTraining ? 'green' : 'red'} size="18" />
          </Link>
        </Tooltip>
        {
          windowSize.width > MAX_MOBILE_SIZE
            ? <User triggerClassName="ml-auto"></User>
            : <MobileMenu triggerClassName="ml-auto" />
        }
      </div>
    </div>
  )
}




