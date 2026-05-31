"use client";

import { useMemo, useState } from "react";
import { LogOut, Search, Users } from "lucide-react";
import { toast } from "sonner";

import { CreateRoomDialog } from "@/components/chat/CreateRoomDialog";
import { RoomList } from "@/components/chat/RoomList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services";
import { useAuthStore, useChatStore } from "@/store";

export function Sidebar() {
  const { user, setUser } = useAuthStore();
  const { onlineUsers } = useChatStore();
  const [search, setSearch] = useState("");

  const onlineCount = useMemo(() => onlineUsers.length, [onlineUsers]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Logged out");
      window.location.href = "/login";
    } catch (error) {
      toast.error((error as Error).message || "Unable to logout");
    }
  };

  return (
    <aside className="flex h-full w-full flex-col gap-6 border-r border-(--border) bg-(--surface)/70 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--muted)">Rooms</p>
          <h2 className="text-xl font-semibold">Ocean Chat</h2>
        </div>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted)" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search rooms"
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-(--muted)">
          <span>Active rooms</span>
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3" />
            {onlineCount} online
          </div>
        </div>
        <RoomList search={search} />
      </div>

      <CreateRoomDialog />

      <div className="mt-auto space-y-4 rounded-3xl border border-(--border) bg-(--surface-secondary) p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.username || "User"} />
            <AvatarFallback>{user?.username?.slice(0, 2) || "ME"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-semibold">{user?.username || ""}</p>
            <p className="text-xs text-(--text-secondary)">{user?.email || ""}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-between" onClick={handleLogout}>
          Logout
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
