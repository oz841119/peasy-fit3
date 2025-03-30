import {
	Tooltip as ShadcnUITooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../shadcnUI/tooltip";

export function Tooltip({
	children,
	text,
}: React.PropsWithChildren & { text: string }) {
	return (
		<TooltipProvider delayDuration={0}>
			<ShadcnUITooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<p>{text}</p>
				</TooltipContent>
			</ShadcnUITooltip>
		</TooltipProvider>
	);
}
