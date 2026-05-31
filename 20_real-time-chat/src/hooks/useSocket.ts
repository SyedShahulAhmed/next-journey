"use client";

import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

import { getSocket, disconnectSocket } from "@/lib/socket";
import { useChatStore } from "@/store";
import type { Message, OnlineUser, User } from "@/types";

export function useSocket(user: User | null, activeRoomId: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const [socketReady, setSocketReady] = useState(false);
  const activeRoomRef = useRef<string | null>(activeRoomId);
  const {
    addMessage,
    replaceMessage,
    setOnlineUsers,
    setTypingUsers,
    setRoomPresence,
  } = useChatStore();

  useEffect(() => {
    activeRoomRef.current = activeRoomId;
  }, [activeRoomId]);

  useEffect(() => {
    if (!user) {
      disconnectSocket();
      socketRef.current = null;
      setSocketReady(false);
      return;
    }

    let mounted = true;

    async function initSocket() {
      await fetch("/api/socket");

      if (!mounted) {
        return;
      }

      const socket = getSocket();
      socketRef.current = socket;
      setSocketReady(true);

      if (activeRoomRef.current) {
        socket.emit("join_room", { roomId: activeRoomRef.current });
      }

      socket.on("presence_sync", (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });

      socket.on("user_online", (payload: OnlineUser) => {
        setOnlineUsers((prev) => {
          const exists = prev.find((item) => item.id === payload.id);
          if (exists) {
            return prev;
          }
          return [...prev, payload];
        });
      });

      socket.on("user_offline", (payload: { userId: string }) => {
        setOnlineUsers((prev) => prev.filter((item) => item.id !== payload.userId));
      });

      socket.on(
        "receive_message",
        (payload: Message & { roomId: string; clientId?: string }) => {
          if (payload.clientId) {
            replaceMessage(payload.roomId, payload.clientId, payload);
          } else {
            addMessage(payload.roomId, payload);
          }
        },
      );

      socket.on(
        "typing_update",
        (payload: { roomId: string; users: OnlineUser[] }) => {
          setTypingUsers(payload.roomId, payload.users);
        },
      );

      socket.on(
        "room_presence",
        (payload: { roomId: string; members: string[] }) => {
          setRoomPresence(payload.roomId, payload.members);
        },
      );
    }

    initSocket();

    return () => {
      mounted = false;
      setSocketReady(false);
      socketRef.current?.off();
    };
  }, [user, addMessage, replaceMessage, setOnlineUsers, setTypingUsers, setRoomPresence]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) {
      return;
    }

    if (activeRoomId) {
      socket.emit("join_room", { roomId: activeRoomId });
    }

    return () => {
      if (activeRoomId) {
        socket.emit("leave_room", { roomId: activeRoomId });
      }
    };
  }, [activeRoomId, socketReady]);
}
