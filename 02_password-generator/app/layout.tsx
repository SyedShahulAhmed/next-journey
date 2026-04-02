import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Generate strong and secure passwords with our easy-to-use password generator. Create unique passwords for your online accounts to enhance your security and protect your personal information.",
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
