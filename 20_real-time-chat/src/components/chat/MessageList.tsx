"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime } from "@/lib/utils";
import { useAuthStore, useChatStore } from "@/store";

export function MessageList({ roomId }: { roomId: string }) {
  const { messagesByRoom } = useChatStore();
  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const messages = messagesByRoom[roomId] || [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.scrollTop = container.scrollHeight;
  }, [messages.length]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-6">
      <AnimatePresence initial={false}>
        {messages.map((message) => {
          const isOwn = message.sender.id === user?.id;
          return (
            <motion.div
              key={message.clientId ?? message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="mb-6 flex gap-3"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={message.sender.avatar} alt={message.sender.username} />
                <AvatarFallback>{message.sender.username?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-(--text-primary)">
                    {message.sender.username}
                  </span>
                  <span className="text-xs text-(--muted)">
                    {formatTime(message.createdAt)}
                  </span>
                  {message.status === "sending" ? (
                    <span className="text-xs text-(--muted)">Sending...</span>
                  ) : null}
                  {message.status === "failed" ? (
                    <span className="text-xs text-(--danger)">Failed</span>
                  ) : null}
                </div>
                <div
                  className={
                    isOwn
                        ? "mt-2 rounded-2xl border border-[rgba(125,211,252,0.2)] bg-[rgba(125,211,252,0.08)] px-4 py-3 text-sm text-(--text-primary)"
                        : "mt-2 rounded-2xl border border-(--border) bg-(--surface-secondary) px-4 py-3 text-sm text-(--text-primary)"
                  }
                >
                  {message.content}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
