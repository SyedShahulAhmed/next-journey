"use client";

import { motion } from "framer-motion";

type GameOverOverlayProps = {
  visible: boolean;
  onRestart: () => void;
};

export function GameOverOverlay({ visible, onRestart }: GameOverOverlayProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-black/80 backdrop-blur-sm"
    >
      <div className="rounded-2xl border border-red-300/50 bg-black/70 p-8 text-center shadow-[0_0_40px_rgba(255,75,75,0.2)]">
        <p className="pixel-title text-3xl text-red-300">GAME OVER</p>
        <p className="mt-2 text-sm text-zinc-300">API stream interrupted. Restart cache engine.</p>
        <button
          onClick={onRestart}
          className="mt-5 rounded-md border border-cyan-300/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-300/20"
        >
          Restart Engine
        </button>
      </div>
    </motion.div>
  );
}
