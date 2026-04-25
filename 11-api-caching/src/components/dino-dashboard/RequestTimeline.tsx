"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "./types";

type RequestTimelineProps = {
  events: TimelineEvent[];
  speed: number;
};

const eventMap: Record<TimelineEvent["type"], { icon: string; label: string; tone: string }> = {
  miss: { icon: "🌵", label: "Cache miss", tone: "text-emerald-300" },
  stale: { icon: "🐦", label: "Stale cache", tone: "text-amber-200" },
  hit: { icon: "💎", label: "Cache hit", tone: "text-cyan-300" },
  error: { icon: "☠", label: "API error", tone: "text-red-300" },
};

export function RequestTimeline({ events, speed }: RequestTimelineProps) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl border border-white/20 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
        <span>Request Timeline</span>
        <span className="font-mono text-cyan-300">Track velocity x{speed.toFixed(2)}</span>
      </div>

      <div className="relative h-24 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70">
        <div className="absolute bottom-2 left-0 h-[3px] w-full bg-[repeating-linear-gradient(90deg,_rgba(255,255,255,0.6)_0px,_rgba(255,255,255,0.6)_4px,_rgba(255,255,255,0)_4px,_rgba(255,255,255,0)_10px)]" />

        {events.map((event, index) => {
          const detail = eventMap[event.type];
          const duration = Math.max(2.8, 8 / Math.max(speed, 0.8));

          return (
            <motion.div
              key={event.id}
              className="absolute bottom-4"
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: "-25%", opacity: [0, 1, 1, 0.1], y: [0, -2, 0] }}
              transition={{
                duration,
                ease: "linear",
                delay: index * 0.05,
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">{detail.icon}</span>
                <span className={`pixel-title text-[10px] ${detail.tone}`}>{detail.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
