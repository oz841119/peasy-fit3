import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
import { SessionProvider } from "@/provider/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Peasy Fit",
  description: "Peasy fit",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="zh-tw">
      {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async></script> */}
      <body className="dark min-w-screen">
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>
              { children }
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
