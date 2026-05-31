export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt?: string;
};

export type Room = {
  id: string;
  name: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
};

export type Message = {
  id: string;
  roomId: string;
  sender: User;
  content: string;
  createdAt: string;
  clientId?: string;
  status?: "sending" | "sent" | "failed";
};

export type OnlineUser = User & {
  lastSeen?: string;
};

export type RoomStats = {
  roomId: string;
  messageCount: number;
  createdAt?: string;
};
