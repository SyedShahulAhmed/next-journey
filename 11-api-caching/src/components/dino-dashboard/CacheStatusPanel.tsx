"use client";

import { motion } from "framer-motion";
import type { CacheStatus } from "./types";

type CacheStatusPanelProps = {
  status: CacheStatus;
  source: string;
  expiresIn: number;
};

const statusStyles: Record<CacheStatus, string> = {
  HIT: "text-cyan-300",
  MISS: "text-emerald-300",
  STALE: "text-amber-200",
  IDLE: "text-zinc-300",
  ERROR: "text-red-300",
};

export function CacheStatusPanel({ status, source, expiresIn }: CacheStatusPanelProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/20 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
        <span>Cache Status</span>
        <motion.span
          className="h-2.5 w-2.5 rounded-full bg-cyan-300"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      </div>

      <motion.p
        key={status}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pixel-title text-2xl ${statusStyles[status]}`}
      >
        {status}
      </motion.p>

      <p className="mt-2 text-xs text-zinc-300/90">{source || "Waiting for requests..."}</p>
      <p className="mt-3 font-mono text-sm text-zinc-200">
        TTL: <span className="text-cyan-300">{Math.max(0, Math.floor(expiresIn / 1000))}s</span>
      </p>
    </div>
  );
}
