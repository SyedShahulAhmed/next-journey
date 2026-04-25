"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type DinoEngineProps = {
  speed: number;
  jumpTick: number;
  glowTick: number;
  loading: boolean;
  score: number;
  requestRate: number;
};

const FRAME_A = [
  "00111110000000",
  "01111111100000",
  "11111111110000",
  "11101111110000",
  "11111111111100",
  "01111101111110",
  "00111100111100",
  "00110000110000",
];

const FRAME_B = [
  "00111110000000",
  "01111111100000",
  "11111111110000",
  "11101111110000",
  "11111111111100",
  "01111101111110",
  "00111101110000",
  "00011000111000",
];

const PIXEL_SIZE = 6;

export function DinoEngine({
  speed,
  jumpTick,
  glowTick,
  loading,
  score,
  requestRate,
}: DinoEngineProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 0 ? 1 : 0));
    }, Math.max(90, 220 / Math.max(speed, 0.8)));

    return () => clearInterval(interval);
  }, [speed]);

  const activeFrame = useMemo(() => (frame === 0 ? FRAME_A : FRAME_B), [frame]);

  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl border border-white/20 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-300">
        <p>Cache Engine Runner</p>
        <p className="text-cyan-300">SPEED x{speed.toFixed(2)}</p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.72, ease: "easeInOut", repeat: Infinity }}
          className="relative"
        >
          <div key={jumpTick} className={jumpTick > 0 ? "dino-jump" : undefined}>
            <div key={glowTick} className={glowTick > 0 ? "dino-glow-flash" : undefined}>
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(14, ${PIXEL_SIZE}px)`, gap: 1 }}
              >
                {activeFrame.flatMap((row, rowIndex) =>
                  row.split("").map((cell, colIndex) => (
                    <span
                      key={`${rowIndex}-${colIndex}`}
                      className={cell === "1" ? "bg-zinc-100" : "bg-transparent"}
                      style={{ width: PIXEL_SIZE, height: PIXEL_SIZE }}
                    />
                  )),
                )}
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-2 left-0 h-[2px] w-24 bg-cyan-300/70"
            animate={{ scaleX: loading ? [1, 1.3, 1] : [1, 1.07, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: loading ? 0.35 : 0.75, repeat: Infinity }}
          />
        </motion.div>

        <div className="space-y-2 text-right text-sm text-zinc-200">
          <p className="font-mono text-2xl text-cyan-300">{score.toLocaleString()}</p>
          <p className="uppercase tracking-[0.2em] text-zinc-400">Requests Processed</p>
          <p className="font-mono text-xs text-zinc-300">Traffic: {requestRate.toFixed(1)} req/min</p>
        </div>
      </div>
    </div>
  );
}
