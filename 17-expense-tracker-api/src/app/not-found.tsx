"use client";

import { NebulaBackdrop, Scanline, Starfield } from "@/components/orv/Backdrop";
import { motion } from "framer-motion";
import { AlertTriangle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white">
      <NebulaBackdrop />
      <Starfield />
      <Scanline />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-cosmic backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/70">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Scenario Not Found
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                This world-line does not exist.
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/70">
            The constellation cannot locate this path. Probability collapse
            detected in the Star Stream.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm tracking-[0.14em] text-white/85 shadow-cosmic transition hover:border-white/35 hover:bg-white/15"
            >
              Return to Star Stream
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm tracking-[0.14em] text-white/70 transition hover:border-white/35 hover:text-white"
            >
              <Sparkles className="h-4 w-4" />
              Scenario Console
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
