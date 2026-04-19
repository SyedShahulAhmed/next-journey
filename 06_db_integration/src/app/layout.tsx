import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DB Integration",
  description: "A Next.js app with database integration ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-100 text-gray-900 antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
