"use client";

import { Hash } from "lucide-react";

import { cn } from "@/lib/utils";
import { useChatStore } from "@/store";

type RoomListProps = {
  search: string;
};

export function RoomList({ search }: RoomListProps) {
  const { rooms, activeRoomId, setActiveRoom } = useChatStore();
  const normalized = search.toLowerCase();

  const filtered = rooms.filter((room) =>
    room.name.toLowerCase().includes(normalized),
  );

  return (
    <div className="space-y-2">
      {filtered.map((room) => {
        const isActive = room.id === activeRoomId;
        return (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-left text-sm transition",
              isActive
                ? "border-(--accent) bg-(--hover) text-(--text-primary)"
                : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text-primary)",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl",
                isActive ? "bg-[rgba(125,211,252,0.16)]" : "bg-(--surface-secondary)",
              )}
            >
              <Hash className="h-4 w-4" />
            </span>
            <span className="flex-1 truncate">{room.name}</span>
          </button>
        );
      })}
      {filtered.length === 0 ? (
        <p className="text-xs text-(--muted)">No rooms found.</p>
      ) : null}
    </div>
  );
}
