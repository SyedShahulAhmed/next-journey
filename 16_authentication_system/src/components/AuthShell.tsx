"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Atmosphere from "./Atmosphere";
import CursorGlow from "./CursorGlow";

type AuthShellProps = {
  title: string;
  subtitle: string;
  caption?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  caption,
  footer,
  children,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-20">
      <Atmosphere />
      <CursorGlow />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel w-full rounded-3xl px-8 py-10 shadow-[0_0_70px_rgba(59,10,10,0.25)]"
        >
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#8C7853]/70">
              {caption ?? "Silent Entry"}
            </p>
            <h1 className="mt-4 text-3xl font-(--font-display) tracking-[0.08em] text-[#E5E5E5]">
              {title}
            </h1>
            <p className="mt-3 text-sm text-[#888888]">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>
        </motion.div>

        {footer ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.6 }}
            className="text-center text-sm text-[#888888]"
          >
            {footer}
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}
