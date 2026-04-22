import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Splitter App",
  description:
    "A simple app to split expenses among friends and keep track of who owes what.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
