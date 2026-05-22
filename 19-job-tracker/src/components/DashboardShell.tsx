"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  showSearch?: boolean;
}

export default function DashboardShell({
  title,
  subtitle,
  actions,
  children,
  showSearch = true,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen md:pl-72">
        <TopNavbar
          title={title}
          subtitle={subtitle}
          actions={actions}
          showSearch={showSearch}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="px-4 pb-12 pt-6 md:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
