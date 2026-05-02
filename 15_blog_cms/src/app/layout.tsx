import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Next.js Blog CMS",
  description:
    "A simple and efficient blog content management system built with Next.js, allowing users to create, edit, and manage their blog posts with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">⚡ Blog CMS</h1>
        </div>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
