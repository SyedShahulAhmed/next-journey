import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import "@/styles/globals.css";

const headingFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Wizard's Ledger",
  description: "Wizard CV builder with live preview and export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
