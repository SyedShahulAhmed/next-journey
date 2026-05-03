import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import AppShell from "@/components/AppShell";
import "../styles/globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jedi CMS",
  description:
    "A premium, holographic Blog CMS interface with cinematic motion and immersive controls.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
