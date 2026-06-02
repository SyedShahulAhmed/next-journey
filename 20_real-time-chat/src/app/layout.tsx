import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { Toaster } from "sonner";

import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Real-Time Chat",
  description: "A premium real-time chat workspace built with Next.js and Socket.IO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${manrope.variable} ${sora.variable} min-h-full flex flex-col bg-(--background) text-(--text-primary)`}
      >
        {children}
        <Toaster
          richColors
          theme="dark"
          toastOptions={{
            className:
              "border border-(--border) bg-(--surface) text-(--text-primary)",
          }}
        />
      </body>
    </html>
  );
}
