"use client";

import dynamic from "next/dynamic";

const CodexPageClient = dynamic(() => import("@/components/CodexPageClient"), {
  ssr: false,
});

export default function CodexNoSSR() {
  return <CodexPageClient />;
}
