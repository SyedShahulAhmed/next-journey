"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <span className="particle particle-1" />
        <span className="particle particle-2" />
        <span className="particle particle-3" />
        <span className="particle particle-4" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-24 pt-8">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#948979]/40 bg-[#222831] text-lg font-semibold text-[#DFD0B8] shadow-[0_0_30px_rgba(148,137,121,0.2)]">
              S
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#948979]">
                Shortly
              </p>
              <p className="font-heading text-xl">Analytics Suite</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-[#948979] md:flex">
            <span>Features</span>
            <span>Analytics</span>
            <span>Security</span>
            <span>Developers</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="rounded-2xl border border-[#948979]/40 px-5 py-2 text-sm text-[#DFD0B8] transition hover:border-[#DFD0B8]/60 hover:bg-white/5"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="rounded-2xl bg-[#DFD0B8] px-5 py-2 text-sm font-semibold text-[#222831] shadow-[0_0_25px_rgba(223,208,184,0.25)] transition hover:shadow-[0_0_35px_rgba(223,208,184,0.4)]"
            >
              Get Started
            </button>
          </div>
        </nav>

        <section className="mt-16 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#948979]/40 bg-[#222831]/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#948979]">
              Performance analytics
            </p>
            <h1 className="font-heading text-5xl leading-tight md:text-7xl">
              Shorten links with confidence.
              <span className="block bg-linear-to-r from-[#DFD0B8] to-[#948979] bg-clip-text text-transparent">
                Measure performance.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-[#948979]">
              Shortly is a premium URL shortener for teams who value clarity,
              security, and reliable analytics. Build, track, and share links
              with a professional SaaS experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/signup")}
                className="rounded-2xl bg-[#DFD0B8] px-6 py-3 text-sm font-semibold text-[#222831] shadow-[0_0_28px_rgba(223,208,184,0.35)] transition hover:-translate-y-px"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => router.push("/login")}
                className="rounded-2xl border border-[#948979]/40 px-6 py-3 text-sm text-[#DFD0B8] transition hover:border-[#DFD0B8]/60"
              >
                View Dashboard
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#948979]">
              <span>99.99% uptime</span>
              <span>Private workspaces</span>
              <span>API-first</span>
            </div>
          </motion.div>

          <div className="relative">
            <div className="glass-panel rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.3em] text-[#948979]">
                  Live Analytics
                </p>
                <span className="rounded-full border border-[#948979]/40 px-3 py-1 text-xs text-[#DFD0B8]">
                  Updated now
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-[#948979]/20 bg-[#15181d]/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                      Monthly clicks
                    </p>
                    <p className="font-heading text-3xl">284,320</p>
                  </div>
                  <div className="flex h-12 items-end gap-1">
                    {[24, 36, 18, 44, 52, 40, 58].map((value, index) => (
                      <span
                        key={`bar-${index}`}
                        className="w-2 rounded-full bg-linear-to-t from-[#393E46] to-[#DFD0B8]"
                        style={{ height: `${value}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[#948979]">
                  <span>+18% vs last month</span>
                  <span>Peak: 12:48 AM</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {["short.ly/alpha", "short.ly/beta", "short.ly/launch"].map(
                  (link) => (
                    <div
                      key={link}
                      className="flex items-center justify-between rounded-2xl border border-[#948979]/20 bg-[#1a1f26]/70 px-4 py-3 text-sm"
                    >
                      <span className="text-[#DFD0B8]">{link}</span>
                      <span className="text-[#948979]">1.4k</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full border border-[#948979]/30 bg-[#222831]/60 shadow-[0_0_50px_rgba(148,137,121,0.25)]" />
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Executive dashboards",
              description:
                "A focused workspace built for clarity and rich analytics.",
              icon: <BarChart3 size={18} />,
            },
            {
              title: "Zero-trust security",
              description:
                "Encrypted sessions, private workspaces, and secure redirects.",
              icon: <ShieldCheck size={18} />,
            },
            {
              title: "Fast API",
              description:
                "Ship links at speed with a minimal, developer-first API.",
              icon: <Zap size={18} />,
            },
          ].map((feature) => (
            <div key={feature.title} className="glass-panel rounded-3xl p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#948979]/40 bg-[#222831] text-[#DFD0B8]">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-heading text-2xl">{feature.title}</h3>
              <p className="mt-3 text-sm text-[#948979]">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
              Campaign intelligence
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">
              Measure every click in real time.
            </h2>
            <p className="mt-4 text-[#948979]">
              Deep analytics, QR scans, device targeting, and geo breakdowns.
              Keep your audience insights in one centralized analytics
              workspace.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Real-time trends", "Location heatmaps", "Custom slugs"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#948979]/40 px-3 py-1 text-xs text-[#DFD0B8]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="glass-panel rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-[#948979]">
                Industry ready
              </p>
              <ArrowUpRight size={18} className="text-[#DFD0B8]" />
            </div>
            <div className="mt-6 space-y-4">
              {["Product teams", "Marketing teams", "Enterprise teams"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-[#948979]/20 bg-[#15181d]/70 px-4 py-3"
                  >
                    <span className="text-[#DFD0B8]">{item}</span>
                    <span className="text-xs text-[#948979]">Ready</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#948979]/30 bg-[#15181d]/80 px-8 py-10 shadow-[0_0_40px_rgba(148,137,121,0.2)] lg:flex-row lg:items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">
              Ready to launch?
            </h2>
            <p className="mt-3 text-[#948979]">
              Create an account and turn every link into a measurable
              experience.
            </p>
          </div>
          <button
            onClick={() => router.push("/signup")}
            className="rounded-2xl bg-[#DFD0B8] px-6 py-3 text-sm font-semibold text-[#222831] shadow-[0_0_30px_rgba(223,208,184,0.3)]"
          >
            Create your workspace
          </button>
        </section>
      </div>
    </main>
  );
}
