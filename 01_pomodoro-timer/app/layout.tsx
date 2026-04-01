import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "A sleek and modern Pomodoro timer built with Next.js, featuring customizable sessions, dynamic backgrounds, and motivational quotes to boost your productivity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}