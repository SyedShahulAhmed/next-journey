import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
	if (!socket) {
		socket = io({
			path: "/api/socket",
			transports: ["websocket"],
			withCredentials: true,
		});
	}

	return socket;
}

export function disconnectSocket() {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
}
