"use client";

import { motion } from "framer-motion";

import { useChatStore } from "@/store";

export function TypingIndicator({ roomId }: { roomId: string }) {
  const { typingByRoom } = useChatStore();
  const users = typingByRoom[roomId] || [];

  if (users.length === 0) {
    return null;
  }

  const names = users.map((user) => user.username).slice(0, 2).join(", ");
  const suffix = users.length > 2 ? "and others" : "";

  return (
    <div className="flex items-center gap-3 px-6 py-2 text-xs text-(--text-secondary)">
      <motion.div
        className="flex gap-1"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
      </motion.div>
      <span>
        {names} {suffix} typing...
      </span>
    </div>
  );
}
