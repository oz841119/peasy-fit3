"use client";
import { UserTrainingActiveStatus } from "@/components/Status/UserTrainingActiveStatus";
import { MAX_MOBILE_SIZE } from "@/constants";
import { menu } from "@/constants/menu";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { User } from "./User/User";
export function TopBar() {
	const windowSize = useWindowSize();
	const pathname = usePathname();
	const t = useTranslations();
	const pathLabel = useMemo(() => {
		const routeItem = menu.find((item) => item.route === pathname);
		return routeItem?.label;
	}, [pathname]);
	return (
		<div className="py-4 flex items-center">
			<div className="flex gap-2 items-end">
				{windowSize.width <= MAX_MOBILE_SIZE && (
					<h1 className="text-foreground font-bold text-xl">Peasy Fit</h1>
				)}
				<div className="text-sm">{pathLabel ? t(pathLabel) : "Unknown"}</div>
			</div>
			<div className="ml-auto flex gap-2 items-center">
				<Link href="/dashboard/session">
					<UserTrainingActiveStatus size="18" showName />
				</Link>
				{windowSize.width > MAX_MOBILE_SIZE ? (
					<User triggerClassName="ml-auto" />
				) : (
					<MobileMenu triggerClassName="ml-auto" />
				)}
			</div>
		</div>
	);
}
