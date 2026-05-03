"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Sparkles, UserCircle2 } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 holo-aurora" />
        <div className="absolute inset-0 scanlines" />
        <div className="absolute -inset-16 particle-field" />
      </div>

      <header className="sticky top-0 z-40">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 pt-5">
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="glass-panel flex w-full items-center justify-between rounded-full px-5 py-3 backdrop-blur-xl"
          >
            <Link href="/" className="group flex items-center gap-3">
              <div className="holo-float h-10 w-10 rounded-full border border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_18px_rgba(74,199,255,0.35)]">
                <div className="flex h-full w-full items-center justify-center">
                  <Sparkles className="h-5 w-5 text-cyan-200 drop-shadow-[0_0_8px_rgba(110,243,255,0.85)]" />
                </div>
              </div>
              <div className="leading-tight">
                <div className="font-display text-sm tracking-[0.5em] text-cyan-100">JEDI CMS</div>
                <div className="text-[0.6rem] uppercase tracking-[0.4em] text-cyan-200/60">
                  Holo Archive
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/dashboard/create" className="holo-button holo-button-primary holo-sheen">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Link>
              </motion.div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.06, rotate: -2 }}
                whileTap={{ scale: 0.96 }}
                className="holo-icon-button holo-sheen"
                aria-label="Profile"
              >
                <UserCircle2 className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
