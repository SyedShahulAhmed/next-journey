"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Command,
  Radar,
  Sparkles,
  Wallet,
} from "lucide-react";

const navItems = [
  { label: "Star Stream", icon: Command, active: true },
  { label: "Scenario Logs", icon: Activity },
  { label: "Constellation Analysis", icon: Radar },
  { label: "Probability Reserve", icon: Wallet },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden h-full w-full flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm lg:flex"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/80">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
            Star Stream
          </p>
          <h2 className="text-lg font-semibold text-white">
            Scenario Control
          </h2>
        </div>
      </div>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                item.active
                  ? "border-white/20 bg-white/10 text-white shadow-star"
                  : "border-transparent text-white/60 hover:border-white/15 hover:bg-white/5"
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">
          System
        </p>
        <p className="mt-2 text-sm text-white/80">
          Probability synchronization complete.
        </p>
      </div>
    </motion.aside>
  );
}