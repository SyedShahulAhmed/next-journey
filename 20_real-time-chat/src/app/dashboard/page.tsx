"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, PanelRight } from "lucide-react";

import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { InfoPanel } from "@/components/dashboard/InfoPanel";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket";
import { authService, messageService, roomService } from "@/services";
import { useSocket } from "@/hooks/useSocket";
import { useAuthStore, useChatStore } from "@/store";

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { rooms, activeRoomId, setActiveRoom, setRooms, setMessages } = useChatStore();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useSocket(user, activeRoomId);

  useEffect(() => {
    async function init() {
      try {
        const currentUser = await authService.me();
        setUser(currentUser);
      } catch {
        router.push("/login");
      }
    }

    init().finally(() => setLoading(false));
  }, [router, setUser]);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadRooms() {
      const data = await roomService.getRooms();
      setRooms(data);
      if (!activeRoomId && data.length > 0) {
        setActiveRoom(data[0].id);
      }
    }

    loadRooms().catch(() => undefined);
  }, [user, activeRoomId, setActiveRoom, setRooms]);

  useEffect(() => {
    if (!activeRoomId) {
      return;
    }

    messageService
      .getMessages(activeRoomId)
      .then((messages) => setMessages(activeRoomId, messages))
      .catch(() => undefined);
  }, [activeRoomId, setMessages]);

  useEffect(() => {
    if (activeRoomId) {
      setSidebarOpen(false);
    }
  }, [activeRoomId]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const socket = getSocket();
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    setConnected(socket.connected);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-(--text-secondary)">
        Loading workspace...
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <div className="hidden h-full w-[280px] lg:flex">
        <Sidebar />
      </div>

      <div className="flex h-full flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-(--border) bg-(--surface)/70 px-4 py-3 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <div className="text-sm font-semibold">Workspace</div>
          <Button variant="ghost" size="icon" onClick={() => setInfoOpen(true)}>
            <PanelRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex h-full flex-1">
          <ChatPanel connected={connected} />
          <div className="hidden h-full w-[320px] xl:flex">
            <InfoPanel />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <motion.div
              className="relative h-full w-[280px]"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <Sidebar />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {infoOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setInfoOpen(false)} />
            <motion.div
              className="relative h-full w-[320px]"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <InfoPanel />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}