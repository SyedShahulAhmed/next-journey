"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  LayoutGrid,
  LogOut,
  Settings2,
  UserCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings2 },
  { label: "Profile", href: "/profile", icon: UserCircle2 },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  }

  const content = (
    <div className="flex h-full flex-col gap-8 px-6 py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#273244] bg-[#111827]">
          <LayoutGrid className="h-5 w-5 text-[#60A5FA]" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Job</p>
          <p className="text-lg font-semibold text-[#F8FAFC]">TrackMyJob</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition",
                isActive
                  ? "border-[#3B82F6]/40 bg-[#111827] text-white"
                  : "border-transparent text-[#94A3B8] hover:border-[#273244] hover:bg-[#111827]",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-3xl border border-[#273244]/70 bg-[#111827]/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
            Weekly goal
          </p>
          <p className="mt-3 text-2xl font-semibold text-[#F8FAFC]">12</p>
          <p className="text-sm text-[#94A3B8]">Applications sent</p>
          <div className="mt-4 h-2 w-full rounded-full bg-[#1C2430]">
            <div className="h-2 w-3/4 rounded-full bg-[#3B82F6]" />
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#273244]/70 bg-[#0B0F14]/95 backdrop-blur-xl md:block">
        {content}
      </aside>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-[#273244]/70 bg-[#0B0F14]/95 backdrop-blur-xl md:hidden"
            >
              {content}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
