import { create } from "zustand";

import type { Message, OnlineUser, Room, RoomStats } from "@/types";

type ChatState = {
  rooms: Room[];
  activeRoomId: string | null;
  messagesByRoom: Record<string, Message[]>;
  roomStats: Record<string, RoomStats>;
  onlineUsers: OnlineUser[];
  typingByRoom: Record<string, OnlineUser[]>;
  roomPresence: Record<string, string[]>;
  setRooms: (rooms: Room[]) => void;
  setActiveRoom: (roomId: string | null) => void;
  addRoom: (room: Room) => void;
  setMessages: (roomId: string, messages: Message[]) => void;
  addMessage: (roomId: string, message: Message) => void;
  replaceMessage: (roomId: string, clientId: string, message: Message) => void;
  markMessageFailed: (roomId: string, clientId: string) => void;
  setRoomStats: (roomId: string, stats: RoomStats) => void;
  setOnlineUsers: (users: OnlineUser[] | ((prev: OnlineUser[]) => OnlineUser[])) => void;
  setTypingUsers: (roomId: string, users: OnlineUser[]) => void;
  setRoomPresence: (roomId: string, members: string[]) => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  rooms: [],
  activeRoomId: null,
  messagesByRoom: {},
  roomStats: {},
  onlineUsers: [],
  typingByRoom: {},
  roomPresence: {},
  setRooms: (rooms) => set({ rooms }),
  setActiveRoom: (activeRoomId) => set({ activeRoomId }),
  addRoom: (room) =>
    set((state) => ({
      rooms: [room, ...state.rooms],
    })),
  setMessages: (roomId, messages) =>
    set((state) => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [roomId]: messages,
      },
    })),
  addMessage: (roomId, message) =>
    set((state) => {
      const existing = state.messagesByRoom[roomId] ?? [];
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [roomId]: [...existing, message],
        },
      };
    }),
  replaceMessage: (roomId, clientId, message) =>
    set((state) => {
      const existing = state.messagesByRoom[roomId] ?? [];
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [roomId]: existing.map((item) =>
            item.clientId === clientId ? { ...message, status: "sent" } : item,
          ),
        },
      };
    }),
  markMessageFailed: (roomId, clientId) =>
    set((state) => {
      const existing = state.messagesByRoom[roomId] ?? [];
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [roomId]: existing.map((item) =>
            item.clientId === clientId ? { ...item, status: "failed" } : item,
          ),
        },
      };
    }),
  setRoomStats: (roomId, stats) =>
    set((state) => ({
      roomStats: {
        ...state.roomStats,
        [roomId]: stats,
      },
    })),
  setOnlineUsers: (onlineUsers) =>
    set((state) => ({
      onlineUsers:
        typeof onlineUsers === "function" ? onlineUsers(state.onlineUsers) : onlineUsers,
    })),
  setTypingUsers: (roomId, users) =>
    set((state) => ({
      typingByRoom: {
        ...state.typingByRoom,
        [roomId]: users,
      },
    })),
  setRoomPresence: (roomId, members) =>
    set((state) => ({
      roomPresence: {
        ...state.roomPresence,
        [roomId]: members,
      },
    })),
}));
