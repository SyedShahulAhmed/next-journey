import "../styles/globals.css";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Shortly",
  description: "Premium URL Shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark font-sans", spaceGrotesk.variable, cormorant.variable)}
    >
      <body className="min-h-screen bg-[#0b0d10] text-[#DFD0B8] antialiased">
        <div className="app-shell">
          <div className="app-bg" aria-hidden="true">
            <span className="orb orb-one" />
            <span className="orb orb-two" />
            <span className="orb orb-three" />
            <span className="moon-glow" />
            <span className="fog fog-one" />
            <span className="fog fog-two" />
            <span className="bats" />
          </div>
          <div className="app-content">{children}</div>
        </div>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
