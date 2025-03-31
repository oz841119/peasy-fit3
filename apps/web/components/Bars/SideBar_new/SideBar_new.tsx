import { menu } from "@/constants/menu";
import { Link, usePathname } from "@/i18n/routing";
import { LogOut, SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "./SideBar.module.css";
import { cn } from "@/lib/utils";
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
							className={
								cn("cursor-pointer h-10 w-10 flex items-center justify-center rounded-lg data-[active=true]:bg-muted-foreground data-[active=true]:text-background", styles['hvr-bounce-to-right'])
							}
						>
							<item.icon size={26} />
						</Link>
					))}
				</div>
			</Block>
			<Hr />
			{/* <Block title="SETTINGS">
        <div className="flex flex-col gap-6">
          <div className="cursor-pointer">
            <SettingsIcon size={26}/>
          </div>
        </div>
      </Block> */}
			<LogOut
				size={26}
				className="mt-auto cursor-pointer"
				onClick={() => signOut()}
			/>
		</div>
	);
};
