import type { NextApiResponse } from "next";
import type { Server as SocketIOServer } from "socket.io";
import type { Socket } from "net";

type SocketServer = Socket & {
  server: {
    io?: SocketIOServer;
  };
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: SocketServer;
};
