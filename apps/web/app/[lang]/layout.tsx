import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
import { SessionProvider } from "@/provider/SessionProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from 'next/font/google'
export const metadata: Metadata = {
	title: "Peasy Fit",
	description: "Peasy fit",
};

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const messages = await getMessages();
	return (
		<html lang="zh-TW" suppressHydrationWarning className={inter.className}>
			{/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async></script> */}
			<body className="dark min-w-screen">
				<SessionProvider>
					<NextIntlClientProvider messages={messages}>
						<ReactQueryProvider>{children}</ReactQueryProvider>
					</NextIntlClientProvider>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
