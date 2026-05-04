"use client";

import BlogCard from "@/components/BlogCard";
import HoloAlert from "@/components/HoloAlert";
import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutGrid, Plus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type Blog = {
  _id: string
  title: string
  content: string
  excerpt?: string
  author: string
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch logs");
        }
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch(() => setError("Archive uplink disrupted. Retry shortly."))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="glass-panel holo-sheen relative overflow-hidden rounded-3xl border border-cyan-500/30 px-6 py-8"
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeInOut" }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5 holo-pulse" />
              Holo Archive
            </div>
            <h1 className="text-3xl font-semibold text-cyan-50 md:text-4xl">
              Jedi Survivor CMS Control Deck
            </h1>
            <p className="max-w-2xl text-sm text-slate-200/70">
              Curate, transmit, and refine mission logs inside a live holographic archive. Each post is sealed with
              neon fidelity and cinematic motion.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeInOut" }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/dashboard/create" className="holo-button holo-button-primary holo-sheen">
              <Plus className="h-4 w-4" />
              Create Log
            </Link>
            <div className="holo-button holo-sheen border border-cyan-400/30 bg-cyan-500/10 text-cyan-100">
              <LayoutGrid className="h-4 w-4" />
              Feed Online
            </div>
          </motion.div>
        </div>
      </motion.section>

      {error ? (
        <HoloAlert
          tone="error"
          title="Transmission Error"
          description={error}
        />
      ) : null}

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="glass-panel skeleton h-44 rounded-2xl border border-cyan-500/10"
            />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <HoloAlert
          title="No logs found in the archive..."
          description="The archive is silent. Begin a new transmission to populate the grid."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
