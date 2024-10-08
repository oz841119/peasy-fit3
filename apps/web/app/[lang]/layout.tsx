import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";

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
      <body className="dark">
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            { children }
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
