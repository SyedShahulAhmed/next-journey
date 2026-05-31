"use client";

import { useEffect } from "react";
import { Calendar, MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { roomService } from "@/services";
import { useChatStore } from "@/store";

export function InfoPanel() {
  const { activeRoomId, rooms, onlineUsers, roomStats, setRoomStats } = useChatStore();
  const room = rooms.find((item) => item.id === activeRoomId);

  useEffect(() => {
    if (!activeRoomId) {
      return;
    }

    roomService
      .getRoomStats(activeRoomId)
      .then((stats) => setRoomStats(activeRoomId, stats))
      .catch(() => undefined);
  }, [activeRoomId, setRoomStats]);

  if (!room) {
    return (
      <aside className="flex h-full w-full flex-col border-l border-(--border) bg-(--surface)/60 p-6">
        <div className="text-sm text-(--text-secondary)">Select a room to view details.</div>
      </aside>
    );
  }

  const stats = roomStats[room.id];

  return (
    <aside className="flex h-full w-full flex-col gap-6 border-l border-(--border) bg-(--surface)/60 p-6">
      <div>
        <Badge variant="info">Room details</Badge>
        <h3 className="mt-3 text-lg font-semibold">{room.name}</h3>
        <p className="mt-2 text-sm text-(--text-secondary)">
          {room.description || "Focus conversations, capture context, stay aligned."}
        </p>
      </div>

      <div className="space-y-3 rounded-3xl border border-(--border) bg-(--surface-secondary) p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-(--text-secondary)">Messages</span>
          <span className="font-semibold">{stats?.messageCount ?? 0}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-(--text-secondary)">Created</span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-(--muted)" />
            {stats?.createdAt ? formatDate(stats.createdAt) : "-"}
          </span>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 text-sm text-(--text-secondary)">
          <MessageCircle className="h-4 w-4" />
          Online now
        </div>
        <div className="space-y-3">
          {onlineUsers.slice(0, 6).map((user) => (
            <div key={user.id} className="flex items-center gap-3 rounded-2xl border border-(--border) bg-(--surface-secondary) p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-(--muted)">Active now</p>
              </div>
            </div>
          ))}
          {onlineUsers.length === 0 ? (
            <p className="text-sm text-(--muted)">No one online yet.</p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
