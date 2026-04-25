import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js API Caching",
  description: "A demo of API caching in Next.js 13.4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
