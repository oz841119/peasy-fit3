import { cn } from "@/lib/utils";
import type { MouseEventHandler, ReactNode } from "react";
interface Props {
	text: string;
	className?: string;
	onClick: MouseEventHandler<HTMLDivElement>;
	Icon?: ReactNode;
}
export const Chip = ({ className, text, onClick, Icon }: Props) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				"px-3 py-1.5 text-sm rounded-full border bg-background hover:bg-accent transition-colors cursor-pointer select-none flex gap-2 items-center w-fit shadow-sm",
				className,
			)}
		>
			{text}
			{Icon}
		</div>
	);
};
