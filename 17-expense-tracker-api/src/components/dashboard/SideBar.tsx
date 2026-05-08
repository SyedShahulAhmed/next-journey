import { LayoutDashboard, Wallet } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-zinc-950 p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-green-400 mb-10">
        FinTrack
      </h2>

      <nav className="space-y-4">
        <div className="flex items-center gap-3 text-white/80 hover:text-green-400 cursor-pointer transition">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 text-white/80 hover:text-green-400 cursor-pointer transition">
          <Wallet size={20} />
          <span>Transactions</span>
        </div>
      </nav>
    </aside>
  );
}