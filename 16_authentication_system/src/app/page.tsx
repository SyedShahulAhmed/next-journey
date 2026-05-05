

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Leaf, ScrollText, Wind } from "lucide-react";
import Atmosphere from "@/components/Atmosphere";
import CursorGlow from "@/components/CursorGlow";

const reveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.8 } },
};

const features = [
  {
    title: "Discipline in Stillness",
    description: "A ritual of focus, where every motion has purpose and every pause has weight.",
    icon: Wind,
  },
  {
    title: "Ink and Mist",
    description: "Layers of fog and brush-stroke textures soften the silence between moments.",
    icon: Leaf,
  },
  {
    title: "Guiding Scrolls",
    description: "An interface built like a scroll: calm, spacious, and precise.",
    icon: ScrollText,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Atmosphere />
      <CursorGlow />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-24">
        <motion.div
          initial="initial"
          animate="animate"
          variants={reveal}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.55em] text-[#8C7853]/60">
            The way of silence
          </p>
          <h1 className="mt-6 text-5xl font-(--font-display) tracking-[0.12em] text-[#E5E5E5] md:text-6xl">
            Enter the Path
          </h1>
          <p className="mt-6 text-lg text-[#888888]">
            Walk into a world of wind, discipline, and quiet resolve. Each space is designed
            to breathe, to focus, and to honor the calm power of a samurai mind.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="samurai-button inline-flex items-center justify-center gap-2 rounded-full border border-[#3B0A0A]/70 bg-[#0A0A0A] px-6 py-3 text-xs uppercase tracking-[0.35em] text-[#E5E5E5] shadow-[0_0_50px_rgba(59,10,10,0.4)] transition duration-700 hover:border-[#5A0F0F]"
            >
              Begin Journey
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="samurai-button inline-flex items-center justify-center rounded-full border border-[#111111] bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.35em] text-[#888888] transition duration-700 hover:border-[#3B0A0A]/60"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel rounded-2xl px-6 py-7 transition duration-700 hover:-translate-y-1 hover:border-[#5A0F0F]/40"
            >
              <feature.icon className="h-5 w-5 text-[#8C7853]" />
              <h3 className="mt-4 text-lg font-(--font-display) tracking-[0.08em] text-[#E5E5E5]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-[#888888]">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="glass-panel rounded-3xl px-8 py-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#8C7853]/60">
                The silent vow
              </p>
              <h2 className="mt-4 text-3xl font-(--font-display) tracking-widest text-[#E5E5E5]">
                Move with calm intent.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-[#888888]">
                Every panel, every light, and every motion is restrained, deliberate, and
                cinematic. The interface exists to sharpen the mind, not distract it.
              </p>
            </div>
            <Link
              href="/login"
              className="samurai-button inline-flex items-center justify-center gap-2 rounded-full border border-[#3B0A0A]/50 bg-transparent px-6 py-3 text-xs uppercase tracking-[0.35em] text-[#8C7853] transition duration-700 hover:bg-[#3B0A0A]/20"
            >
              Enter the Dojo
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
