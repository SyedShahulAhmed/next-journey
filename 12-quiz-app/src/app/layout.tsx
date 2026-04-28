import type { Metadata } from "next";
import { Exo_2, Orbitron } from "next/font/google";
import "./styles/globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-orbitron",
});

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Next.js Quiz App",
  description: "A simple quiz application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${exo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
