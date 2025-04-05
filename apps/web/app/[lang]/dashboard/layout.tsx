"use client";
import { SideBar } from "@/components/Bars/SideBar/SideBar";
import { TopBar } from "@/components/Bars/TopBar/TopBar";
import { MAX_MOBILE_SIZE } from "@/constants";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
	const { data, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status !== "loading" && !data) {
			router.push("/login");
		}
	}, [status, data, router]);
	const windowSize = useWindowSize();
	if (!windowSize.width) return null;
	return (
		<div className="min-h-screen bg-muted/50 flex text-muted-foreground">
			{windowSize.width > MAX_MOBILE_SIZE && (
				<div className="px-4 bg-black py-6 max-h-screen sticky top-0">
					<SideBar />
				</div>
			)}
			<main className="flex-1 px-4 max-w-full bg-background md:py-6 md:h-screen">
				{windowSize.width <= MAX_MOBILE_SIZE && (
					<div className="mb-4">
						<TopBar />
					</div>
				)}
				<div className="bg-muted rounded-2xl p-2 md:h-full">
					<div className="flex flex-col gap-4 md:h-full p-2 overflow-auto">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
