"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/shadcnUI/breadcrumb";
import { capitalizeFirstLetter } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function getPath(breadcrumbList: string[]) {
	return `/${breadcrumbList.join("/")}`;
}

function IntermediateBreadcrumbItem({
	children,
	href,
}: { children: ReactNode; href: string }) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href={href}>{children}</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
		</>
	);
}
export function NavBreadcrumb() {
	const pathname = usePathname();
	const START_PATH_INDEX = 2; // Index 1 is locale
	const breadcrumbList = pathname?.split("/").slice(START_PATH_INDEX);
	if (!breadcrumbList) return null;
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<IntermediateBreadcrumbItem href="/">Home</IntermediateBreadcrumbItem>
				{breadcrumbList.map((breadcrumb, index) => {
					const text = capitalizeFirstLetter(breadcrumb);
					const isCurrPage = index === breadcrumbList.length - 1;
					if (!isCurrPage) {
						const path = getPath(breadcrumbList.slice(0, index + 1));
						return (
							<IntermediateBreadcrumbItem href={path} key={text}>
								{text}{" "}
							</IntermediateBreadcrumbItem>
						);
					}
					return <BreadcrumbPage key={text}>{text}</BreadcrumbPage>;
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
