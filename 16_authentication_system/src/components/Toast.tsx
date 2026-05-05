"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

type ToastProps = {
  message: string | null;
  onDismiss: () => void;
};

export default function Toast({ message, onDismiss }: ToastProps) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.8 }}
      className="toast-panel flex items-start justify-between gap-4 rounded-2xl px-4 py-3 text-sm text-[#E5E5E5]"
      role="alert"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="text-[#888888] transition hover:text-[#E5E5E5]"
        aria-label="Dismiss message"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
