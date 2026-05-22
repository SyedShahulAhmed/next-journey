"use client";

import { Bell, Menu } from "lucide-react";

import SearchBar from "@/components/SearchBar";

interface TopNavbarProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  actions?: React.ReactNode;
  showSearch?: boolean;
}

export default function TopNavbar({
  title,
  subtitle,
  onMenuClick,
  actions,
  showSearch = true,
}: TopNavbarProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#273244]/70 bg-[#0B0F14]/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-[220px] flex-1 items-center gap-3">
            <button
              onClick={onMenuClick}
              className="rounded-xl border border-[#273244]/70 bg-[#111827]/80 p-2 text-[#CBD5E1] transition hover:border-[#3B82F6]/60 hover:text-white md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#64748B]">
                Welcome back
              </p>
              <h1 className="text-2xl font-semibold text-[#F8FAFC]">{title}</h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-[#94A3B8]">{subtitle}</p>
              ) : null}
            </div>
          </div>
          {showSearch ? (
            <div className="min-w-[240px] flex-1 md:max-w-[360px]">
              <SearchBar placeholder="Search applications" />
            </div>
          ) : null}
          <div className="flex items-center gap-3">
            {actions}
            <button className="relative rounded-2xl border border-[#273244]/70 bg-[#111827]/80 p-2 text-[#CBD5E1] transition hover:border-[#3B82F6]/60 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[#3B82F6]" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-[#273244]/70 bg-[#111827]/80 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C2430] text-sm font-semibold text-white">
                JT
              </div>
              <div className="hidden text-xs text-[#94A3B8] md:block">
                Premium
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
