"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, LogOut, ScrollText, Shield, User } from "lucide-react";
import Atmosphere from "@/components/Atmosphere";
import CursorGlow from "@/components/CursorGlow";
import GlowButton from "@/components/GlowButton";
import LoadingSigil from "@/components/LoadingSigil";

type UserProfile = {
  name: string;
  email: string;
};

const actions = [
  {
    title: "Review the Scrolls",
    description: "Check your rituals, goals, and the vow you set in motion.",
    icon: ScrollText,
  },
  {
    title: "Guard the Path",
    description: "Strengthen your seals and maintain disciplined access.",
    icon: Shield,
  },
  {
    title: "Refine the Oath",
    description: "Adjust your profile and the tone of your journey.",
    icon: KeyRound,
  },
];

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

  if (!user) {
    return (
      <main className="relative min-h-screen overflow-hidden px-6 py-20">
        <Atmosphere />
        <CursorGlow />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center gap-6">
          <LoadingSigil label="Summoning your command" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Atmosphere />
      <CursorGlow />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-[#8C7853]/60">
              Samurai Command Center
            </p>
            <h1 className="mt-4 text-4xl font-(--font-display) tracking-widest text-[#E5E5E5]">
              Welcome, {user.name}
            </h1>
            <p className="mt-3 text-sm text-[#888888]">
              The mist settles, the path remains clear. Move with precision.
            </p>
          </div>
          <GlowButton
            variant="outline"
            icon={<LogOut className="h-4 w-4" />}
            onClick={handleLogout}
          >
            Leave the Dojo
          </GlowButton>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1.6 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3B0A0A]/60 bg-[#0A0A0A]">
                <User className="h-5 w-5 text-[#8C7853]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8C7853]/60">
                  Profile Seal
                </p>
                <p className="text-lg font-(--font-display) tracking-[0.08em] text-[#E5E5E5]">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm text-[#888888]">
              <p>Email: {user.email}</p>
              <p>Role: Guardian of the path</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.6 }}
            className="glass-panel rounded-2xl p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#8C7853]/60">
                  Actions
                </p>
                <h2 className="mt-3 text-2xl font-(--font-display) tracking-[0.08em] text-[#E5E5E5]">
                  Shape the journey
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {actions.map((action) => (
                <div
                  key={action.title}
                  className="rounded-2xl border border-[#111111] bg-[#0A0A0A] p-4 transition duration-700 hover:-translate-y-1 hover:border-[#5A0F0F]/40 hover:shadow-[0_0_30px_rgba(59,10,10,0.3)]"
                >
                  <action.icon className="h-5 w-5 text-[#8C7853]" />
                  <p className="mt-4 text-sm font-(--font-display) tracking-[0.08em] text-[#E5E5E5]">
                    {action.title}
                  </p>
                  <p className="mt-2 text-xs text-[#888888]">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
