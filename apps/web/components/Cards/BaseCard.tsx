import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnUI/card";
import { cn } from "@/lib/utils";
import type { PropsWithCrCn } from "@/types";
interface Props extends PropsWithCrCn {
	title: string;
	description: string;
}
export const BaseCard = ({
	className,
	children,
	title,
	description,
}: Props) => {
	return (
		<Card className={cn(className)}>
			<CardHeader className="px-3 py-4 sm:px-6 sm:py-6">
				<CardTitle>{title}</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="px-3 py-4 sm:px-6 sm:py-6">
				{children}
			</CardContent>
			<CardFooter />
		</Card>
	);
};
