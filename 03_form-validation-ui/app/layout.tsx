import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Form Validation UI",
  description: "A simple form validation UI built with Next.js",
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
