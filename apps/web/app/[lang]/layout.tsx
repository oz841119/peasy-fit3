import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Peast Fit",
  description: "Peast fit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  return (
    <html lang="zh-tw">
      <body className="dark">
        { children }
      </body>
    </html>
  );
}
