import { menu } from "@/constants/menu";
import { Link, usePathname } from "@/i18n/routing";
import { LogOut, Languages } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLangToggler } from "@/hooks/useLangToggler";
import { useLocale } from "next-intl";
import { routing, getLocaleName } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const useOutsideClick = (callback: () => void) => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [callback]);
	return {
		ref
	};
};

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

export const SideBar_new = () => {
	const pathname = usePathname();
	const currLocale = useLocale() as (typeof routing.locales)[number];
	const { toggleLocale } = useLangToggler();
	const [showLangMenu, setShowLangMenu] = useState(false);
	const { ref: langMenuRef } = useOutsideClick(() => setShowLangMenu(false));

	return (
		<div className="py-4 w-20 bg-muted rounded-2xl flex flex-col items-center h-full">
			<h1 className="text-2xl font-bold">P</h1>
			<Hr />
			<Block title="MENU">
				<div className="flex flex-col gap-6">
					{menu.map((item) => (
						<Link
							href={item.route}
							key={item.name}
							data-active={pathname === item.route}
							className="
                  cursor-pointer h-10 w-10 flex items-center justify-center rounded-lg 
                  hover:bg-foreground
                  data-[active=true]:bg-muted-foreground data-[active=true]:text-background
                "
						>
							<item.icon size={26} />
						</Link>
					))}
				</div>
			</Block>
			<Hr />
			<Block title="SETTINGS">
				<div className="flex flex-col gap-6" ref={langMenuRef}>
					<div
						className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-lg hover:bg-foreground relative"
						onClick={() => setShowLangMenu(!showLangMenu)}
						title="Language"
					>
						<Languages size={26} />

						{showLangMenu && (
							<div className="absolute left-14 top-0 w-40 bg-background/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden z-10 border border-border/50 animate-in slide-in-from-left-2 duration-200">
								<div className="px-3 py-2 border-b border-border/30">
									<h3 className="text-xs font-medium text-muted-foreground">Select Language</h3>
								</div>
								{routing.locales.map((locale) => (
									<button
										type="button"
										key={locale}
										className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2 transition-colors ${currLocale === locale
											? "bg-primary/10 text-primary font-medium"
											: "hover:bg-accent"
											}`}
										onClick={(e) => {
											e.stopPropagation();
											toggleLocale(locale);
											setShowLangMenu(false);
										}}
									>
										<span className="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-primary/10 text-primary">
											{locale === "en-US" ? "EN" : "中"}
										</span>
										<span>{getLocaleName(locale)}</span>
										{currLocale === locale && (
											<span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
										)}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</Block>
			<LogOut
				size={26}
				className="mt-auto cursor-pointer"
				onClick={() => signOut()}
			/>
		</div>
	);
};
