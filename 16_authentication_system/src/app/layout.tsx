import type { Metadata } from "next";
import { Cormorant_Garamond, Yuji_Boku } from "next/font/google";
import "../styles/globals.css";

const displayFont = Yuji_Boku({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Path of the Silent Blade",
  description: "A cinematic authentication experience inspired by feudal Japan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] font-(--font-body) text-[#E5E5E5]">
        {children}
      </body>
    </html>
  );
}
