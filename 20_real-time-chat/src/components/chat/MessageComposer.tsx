"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getSocket } from "@/lib/socket";
import { messageService } from "@/services";
import { useAuthStore, useChatStore } from "@/store";
import type { Message } from "@/types";

export function MessageComposer({ roomId }: { roomId: string }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useAuthStore();
  const { addMessage, replaceMessage, markMessageFailed } = useChatStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const emitTyping = (state: "start" | "stop") => {
    const socket = getSocket();
    if (!socket || !roomId) {
      return;
    }
    socket.emit(state === "start" ? "typing_start" : "typing_stop", { roomId });
  };

  const onChange = (next: string) => {
    setValue(next);

    if (!typingTimeout.current) {
      emitTyping("start");
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      emitTyping("stop");
      typingTimeout.current = null;
    }, 1400);
  };

  const handleSend = async () => {
    if (!value.trim() || !user) {
      return;
    }

    const clientId = nanoid();
    const optimistic: Message = {
      id: clientId,
      roomId,
      content: value.trim(),
      createdAt: new Date().toISOString(),
      clientId,
      status: "sending",
      sender: user,
    };

    addMessage(roomId, optimistic);
    setValue("");
    emitTyping("stop");
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
      typingTimeout.current = null;
    }

    const socket = getSocket();

    try {
      if (socket?.connected) {
        socket.emit("send_message", {
          roomId,
          content: optimistic.content,
          clientId,
        });
      } else {
        const saved = await messageService.sendMessage(roomId, optimistic.content, clientId);
        replaceMessage(roomId, clientId, saved);
      }
    } catch (error) {
      markMessageFailed(roomId, clientId);
      toast.error((error as Error).message || "Message failed to send");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-(--border) px-6 py-4">
      <div className="flex items-end gap-3 rounded-3xl border border-(--border) bg-(--surface-secondary) px-4 py-3">
        <Textarea
          ref={textareaRef}
          className="min-h-[44px] flex-1 resize-none border-none bg-transparent p-0 text-sm focus-visible:ring-0"
          placeholder="Type your message..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <Button size="icon" variant="primary" onClick={handleSend} disabled={!value.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
