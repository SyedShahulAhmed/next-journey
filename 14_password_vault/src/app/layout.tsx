import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";

import "../styles/globals.css";

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-terminal",
});

export const metadata: Metadata = {
  title: "Password Vault",
  description:
    "A secure and user-friendly password vault built with Next.js, allowing users to safely store and manage their passwords with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${shareTechMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-terminal">
        {children}
      </body>
    </html>
  );
}
