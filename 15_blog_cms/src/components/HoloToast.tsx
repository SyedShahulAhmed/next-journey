"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

type HoloToastProps = {
  open: boolean;
  message: string;
  tone?: "success" | "error";
};

export default function HoloToast({
  open,
  message,
  tone = "success",
}: HoloToastProps) {
  const isError = tone === "error";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-[0_0_24px_rgba(74,199,255,0.25)] backdrop-blur-xl ${
            isError
              ? "border-rose-400/50 bg-rose-500/10 text-rose-100"
              : "border-cyan-400/50 bg-cyan-500/10 text-cyan-100"
          }`}
        >
          {isError ? (
            <AlertTriangle className="h-5 w-5 text-rose-300" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-cyan-200" />
          )}
          <span className="text-sm tracking-wide">{message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
