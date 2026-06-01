import { fetchJson } from "@/lib/api";
import type { Room, RoomStats } from "@/types";

function mapRoom(room: any): Room {
  return {
    id: room._id ?? room.id,
    name: room.name,
    description: room.description,
    createdBy: room.createdBy?.toString?.() ?? room.createdBy,
    createdAt: room.createdAt,
  };
}

export async function getRooms() {
  const data = await fetchJson<{ rooms: any[] }>("/api/rooms");
  return data.rooms.map(mapRoom);
}

export async function createRoom(name: string, description?: string) {
  const data = await fetchJson<{ room: any }>("/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
  return mapRoom(data.room);
}

export async function getRoomStats(roomId: string) {
  const data = await fetchJson<{ stats: RoomStats }>(
    `/api/rooms/${encodeURIComponent(roomId)}`,
  );
  return data.stats;
}
