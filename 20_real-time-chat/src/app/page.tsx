"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-10 text-(--text-primary)">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <motion.header
          className="flex flex-col gap-6 rounded-[32px] border border-(--border) bg-(--surface)/60 p-10 shadow-2xl"
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUp}
        >
          <Badge variant="info" className="w-fit">
            Calm real-time collaboration
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            A premium real-time chat workspace built for modern teams.
          </h1>
          <p className="max-w-2xl text-lg text-(--text-secondary)">
            Chat feels intentional, focused, and frictionless. Connect rooms, share context,
            and stay aligned with a calm interface inspired by the best SaaS products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="soft-glow">
              <Link href="/signup">
                Start chatting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-(--muted)">
            <span>Live rooms</span>
            <span>Presence-aware</span>
            <span>Secure by default</span>
          </div>
        </motion.header>

        <motion.section
          className="grid gap-6 md:grid-cols-3"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.15 }}
        >
          {[
            {
              title: "Realtime by design",
              icon: Zap,
              body: "Socket-first architecture with instant updates, typing indicators, and presence that feels natural.",
            },
            {
              title: "Calm, focused UI",
              icon: Sparkles,
              body: "Ocean-night palette, soft gradients, and minimal chrome so your team stays in flow.",
            },
            {
              title: "Secure access",
              icon: ShieldCheck,
              body: "JWT + HTTP-only cookies, server-side validation, and protected APIs to keep conversations safe.",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="glass-panel rounded-3xl p-6"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <feature.icon className="mb-4 h-6 w-6 text-(--accent)" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-(--text-secondary)">{feature.body}</p>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </main>
  );
}
