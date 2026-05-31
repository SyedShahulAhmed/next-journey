"use client";

import { useEffect, useMemo, useState } from "react";

import { MessageComposer } from "@/components/chat/MessageComposer";
import { MessageList } from "@/components/chat/MessageList";
import { RoomHeader } from "@/components/chat/RoomHeader";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChatStore } from "@/store";

export function ChatPanel({ connected }: { connected: boolean }) {
  const { activeRoomId } = useChatStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = useMemo(() => {
    if (!activeRoomId) {
      return (
        <div className="flex flex-1 items-center justify-center text-(--text-secondary)">
          Select a room to begin the conversation.
        </div>
      );
    }

    return (
      <>
        <MessageList roomId={activeRoomId} />
        <TypingIndicator roomId={activeRoomId} />
        <MessageComposer roomId={activeRoomId} />
      </>
    );
  }, [activeRoomId]);

  return (
    <section className="flex h-full flex-1 flex-col bg-(--background)">
      <RoomHeader connected={connected} />
      {mounted ? content : null}
    </section>
  );
}
