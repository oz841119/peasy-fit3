import { menu } from "@/constants/menu";
import { Link, routing, usePathname } from "@/i18n/routing";
import { Languages, LogOut, SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "./SideBar.module.css";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcnUI/dropdown-menu";
import { useLangToggler } from "@/hooks/useLangToggler";
import { useLocale } from "next-intl";
const Hr = () => {
	return <hr className="w-10 border-muted-foreground my-6" />;
};
const Block = ({
	children,
	title,
}: { children: React.ReactNode; title: string }) => (
	<div className="flex flex-col items-center gap-4">
		<div className="text-xs text-muted-foreground text-center">{title}</div>
		{children}
	</div>
);

export const SideBar = () => {
	const pathname = usePathname();
	const { locales } = routing;
	const { toggleLocale } = useLangToggler();
	const currLocale = useLocale();
	return (
		<div className="py-4 w-20 bg-muted rounded-2xl flex flex-col items-center h-full overflow-y-auto">
			<h1 className="text-2xl font-bold">P</h1>
			<Hr />
			<Block title="MENU">
				<div className="flex flex-col gap-6">
					{menu.map((item) => (
						<Link
							href={item.route}
							key={item.name}
							data-active={pathname === item.route}
							className={
								cn(
									styles['hvr-bounce-to-right'],
									"h-10 w-10 flex items-center justify-center cursor-pointer rounded-lg",
									"data-[active=true]:bg-muted-foreground data-[active=true]:text-background"
								)
							}
						>
							<item.icon size={26} />
						</Link>
					))}
				</div>
			</Block>
			<Hr />
			<Block title="SETTINGS">
				<div className="flex flex-col gap-6 mb-12">
					<div className="cursor-pointer">
						<SettingsIcon size={26} />
					</div>
					<div className="cursor-pointer">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Languages size={26} />
							</DropdownMenuTrigger>
							<DropdownMenuContent side="right">
								{locales.map((locale) => (
									<DropdownMenuItem
										key={locale}
										onClick={() => {
											toggleLocale(locale);
										}}
										data-active={currLocale === locale}
										className="data-[active=true]:bg-muted-foreground data-[active=true]:text-background"
									>
										{locale}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</Block>
			<div className="mt-auto flex flex-col items-center">
				<Hr />
				<LogOut
					size={26}
					className="cursor-pointer"
					onClick={() => signOut()}
				/>
			</div>
		</div>
	);
};
