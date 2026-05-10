"use client";

import { NebulaBackdrop, Scanline, Starfield } from "@/components/orv/Backdrop";
import { motion } from "framer-motion";
import { Activity, Radar, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Constellation Analysis",
    description: "Track scenario costs with luminous constellation analytics.",
    icon: Radar,
  },
  {
    title: "Scenario Logs",
    description: "Record every probability shift with cinematic system logs.",
    icon: Activity,
  },
  {
    title: "Probability Reserve",
    description: "Monitor reserves with a glowing stability index.",
    icon: ShieldAlert,
  },
];

const previews = [
  {
    label: "Broadcast Window",
    detail: "Live scenario feed synced across constellations.",
  },
  {
    label: "Star Stream Grid",
    detail: "Holographic allocation maps and energy trends.",
  },
  {
    label: "Oracle Panel",
    detail: "AI guidance for stabilizing probability storms.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white">
      <NebulaBackdrop />
      <Starfield />
      <Scanline />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-16"
      >
        <header className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              The Star Stream Has Opened
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Star Stream: Scenario Finance Manager
            </h1>
            <p className="text-lg text-white/70">
              A constellation is watching. Record every scenario, monitor
              probability reserves, and navigate the dimensional economy with a
              premium ORV-inspired interface.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm tracking-[0.14em] text-white/85 shadow-cosmic transition hover:border-white/35 hover:bg-white/15"
              >
                Enter Scenario
              </Link>
              <Link
                href="/signup"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm tracking-[0.14em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Register Incarnation
              </Link>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.18em] text-white/60">
              <Sparkles className="h-4 w-4" />
              Probability synchronization complete.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Constellation Preview
              </p>
              <Radar className="h-5 w-5 text-white/70" />
            </div>
            <div className="mt-6 space-y-4">
              {previews.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/70">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-nebula backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Scenario Initiation
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Your scenario begins here.
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Activate the Star Stream dashboard to track every probability
                shift with cinematic clarity.
              </p>
            </div>
            <Link
              href="/signup"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm tracking-[0.14em] text-white/85 shadow-cosmic transition hover:border-white/35 hover:bg-white/15"
            >
              Begin Scenario
            </Link>
          </div>
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/50">
          <span>Star Stream Interface</span>
          <span>Constellation Broadcast Systems</span>
        </footer>
      </motion.div>
    </main>
  );
}
