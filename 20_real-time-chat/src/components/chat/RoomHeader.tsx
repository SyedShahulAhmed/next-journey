"use client";

import { Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { useChatStore } from "@/store";

type RoomHeaderProps = {
  connected: boolean;
};

export function RoomHeader({ connected }: RoomHeaderProps) {
  const { rooms, activeRoomId, roomPresence } = useChatStore();
  const room = rooms.find((item) => item.id === activeRoomId);
  const members = activeRoomId ? roomPresence[activeRoomId] || [] : [];

  if (!room) {
    return (
      <div className="flex items-center justify-between border-b border-(--border) px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">Select a room</h2>
          <p className="text-sm text-(--text-secondary)">Choose a space to start chatting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-b border-(--border) px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold">{room.name}</h2>
        <p className="text-sm text-(--text-secondary)">
          {room.description || "Focused conversation channel"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="subtle">{members.length} members</Badge>
        <motion.div
          className="flex items-center gap-2 text-xs text-(--text-secondary)"
          animate={{ opacity: connected ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {connected ? (
            <Wifi className="h-4 w-4 text-(--success)" />
          ) : (
            <WifiOff className="h-4 w-4 text-(--danger)" />
          )}
          {connected ? "Connected" : "Reconnecting"}
        </motion.div>
      </div>
    </div>
  );
}
