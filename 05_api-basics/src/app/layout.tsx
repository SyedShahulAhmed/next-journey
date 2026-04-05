import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Basics",
  description: "  Learn the basics of API routes in Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
