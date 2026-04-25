"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { LogLine } from "./types";

type LiveLogsProps = {
  logs: LogLine[];
};

const toneMap: Record<LogLine["level"], string> = {
  info: "text-zinc-300",
  success: "text-cyan-300",
  warn: "text-amber-200",
  error: "text-red-300",
};

export function LiveLogs({ logs }: LiveLogsProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/20 p-4">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
        <span>Live Logs</span>
        <span className="typing-cursor font-mono text-cyan-300">streaming</span>
      </div>

      <div className="h-40 space-y-1 overflow-auto rounded-xl border border-white/10 bg-black/65 p-3 font-mono text-xs">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.p
              key={log.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className={`typing-line ${toneMap[log.level]}`}
            >
              {log.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
