"use client";

import { motion } from "framer-motion";

type LoadingSigilProps = {
  label?: string;
};

export default function LoadingSigil({ label }: LoadingSigilProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <motion.div
        className="loading-sigil h-20 w-20 rounded-full"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-sm uppercase tracking-[0.3em] text-[#8C7853]/60">
        {label ?? "Gathering the mist"}
      </p>
    </div>
  );
}
