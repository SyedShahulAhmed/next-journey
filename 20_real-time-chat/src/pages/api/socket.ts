import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "@/types/socket";
import { Server } from "socket.io";
import { parse } from "cookie";

import { connectDb } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Message from "@/models/Message";
import Room from "@/models/Room";
import User from "@/models/User";

export const config = {
  api: {
    bodyParser: false,
  },
};

type OnlineUser = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  lastSeen?: string;
};

type SocketUser = OnlineUser & { socketIds: Set<string> };

type PresenceState = {
  onlineUsers: Map<string, SocketUser>;
  roomMembers: Map<string, Set<string>>;
  roomTyping: Map<string, Map<string, OnlineUser>>;
};

const globalState = global as unknown as {
  socketPresence?: PresenceState;
};

if (!globalState.socketPresence) {
  globalState.socketPresence = {
    onlineUsers: new Map(),
    roomMembers: new Map(),
    roomTyping: new Map(),
  };
}

const presence = globalState.socketPresence;

function mapOnlineUsers() {
  return Array.from(presence.onlineUsers.values()).map(({ socketIds, ...rest }) => rest);
}

function emitPresence(io: Server) {
  io.emit("presence_sync", mapOnlineUsers());
}

function updateRoomPresence(io: Server, roomId: string) {
  const members = presence.roomMembers.get(roomId);
  io.to(roomId).emit("room_presence", {
    roomId,
    members: members ? Array.from(members) : [],
  });
}

function updateTyping(io: Server, roomId: string) {
  const users = presence.roomTyping.get(roomId);
  io.to(roomId).emit("typing_update", {
    roomId,
    users: users ? Array.from(users.values()) : [],
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    res.status(200).json({ ok: true });
    return;
  }

  await connectDb();

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  res.socket.server.io = io;

  io.use(async (socket, next) => {
    try {
      const cookieHeader = socket.request.headers.cookie ?? "";
      const parsed = parse(cookieHeader || "");
      const token = parsed.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = verifyToken(token);

      if (!decoded || typeof decoded !== "object") {
        return next(new Error("Unauthorized"));
      }

      const userId = (decoded as { userId: string }).userId;

      const user = await User.findById(userId).select("username email avatar");

      if (!user) {
        return next(new Error("Unauthorized"));
      }

      socket.data.user = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      };

      return next();
    } catch {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user as OnlineUser;
    const existing = presence.onlineUsers.get(user.id);

    if (existing) {
      existing.socketIds.add(socket.id);
    } else {
      presence.onlineUsers.set(user.id, {
        ...user,
        socketIds: new Set([socket.id]),
      });
      io.emit("user_online", user);
    }

    emitPresence(io);

    socket.on("join_room", async ({ roomId }: { roomId: string }) => {
      if (!roomId) {
        return;
      }

      const room = await Room.findById(roomId);
      if (!room) {
        return;
      }

      const previousRoom = socket.data.activeRoomId as string | undefined;
      if (previousRoom && previousRoom !== roomId) {
        socket.leave(previousRoom);
        const members = presence.roomMembers.get(previousRoom);
        if (members) {
          members.delete(user.id);
          updateRoomPresence(io, previousRoom);
        }
      }

      socket.data.activeRoomId = roomId;
      socket.join(roomId);

      if (!presence.roomMembers.has(roomId)) {
        presence.roomMembers.set(roomId, new Set());
      }

      presence.roomMembers.get(roomId)?.add(user.id);
      updateRoomPresence(io, roomId);
    });

    socket.on("leave_room", ({ roomId }: { roomId: string }) => {
      if (!roomId) {
        return;
      }

      socket.leave(roomId);
      const members = presence.roomMembers.get(roomId);
      if (members) {
        members.delete(user.id);
        updateRoomPresence(io, roomId);
      }
    });

    socket.on(
      "send_message",
      async ({ roomId, content, clientId }: { roomId: string; content: string; clientId?: string }) => {
        if (!roomId || !content?.trim()) {
          return;
        }

        const room = await Room.findById(roomId);
        if (!room) {
          return;
        }

        const message = await Message.create({
          sender: user.id,
          room: roomId,
          content: content.trim(),
          clientId,
        });

        await message.populate({
          path: "sender",
          select: "username email avatar",
        });

        io.to(roomId).emit("receive_message", {
          id: message._id.toString(),
          roomId: roomId,
          content: message.content,
          createdAt: message.createdAt,
          clientId,
          sender: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        });
      },
    );

    socket.on("typing_start", ({ roomId }: { roomId: string }) => {
      if (!roomId) {
        return;
      }

      if (!presence.roomTyping.has(roomId)) {
        presence.roomTyping.set(roomId, new Map());
      }

      presence.roomTyping.get(roomId)?.set(user.id, user);
      updateTyping(io, roomId);
    });

    socket.on("typing_stop", ({ roomId }: { roomId: string }) => {
      if (!roomId) {
        return;
      }

      presence.roomTyping.get(roomId)?.delete(user.id);
      updateTyping(io, roomId);
    });

    socket.on("disconnect", () => {
      const tracked = presence.onlineUsers.get(user.id);
      if (tracked) {
        tracked.socketIds.delete(socket.id);
        if (tracked.socketIds.size === 0) {
          presence.onlineUsers.delete(user.id);
          io.emit("user_offline", { userId: user.id });
        }
      }

      presence.roomMembers.forEach((members, roomId) => {
        if (members.has(user.id)) {
          members.delete(user.id);
          updateRoomPresence(io, roomId);
        }
      });

      presence.roomTyping.forEach((users, roomId) => {
        if (users.has(user.id)) {
          users.delete(user.id);
          updateTyping(io, roomId);
        }
      });

      emitPresence(io);
    });
  });

  res.status(200).json({ ok: true });
}
