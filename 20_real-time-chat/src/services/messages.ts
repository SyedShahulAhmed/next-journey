import { fetchJson } from "@/lib/api";
import type { Message } from "@/types";

function mapMessage(message: any): Message {
  const sender = message.sender || {};
  return {
    id: message._id ?? message.id,
    roomId: message.room?.toString?.() ?? message.room,
    content: message.content,
    createdAt: message.createdAt,
    clientId: message.clientId,
    sender: {
      id: sender._id ?? sender.id,
      username: sender.username,
      email: sender.email,
      avatar: sender.avatar,
    },
  };
}

export async function getMessages(roomId: string) {
  const data = await fetchJson<{ messages: any[] }>(
    `/api/messages?roomId=${encodeURIComponent(roomId)}`,
  );
  return data.messages.map(mapMessage);
}

export async function sendMessage(roomId: string, content: string, clientId: string) {
  const data = await fetchJson<{ message: any }>("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, content, clientId }),
  });
  return mapMessage(data.message);
}
