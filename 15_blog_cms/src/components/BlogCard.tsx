"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScanEye } from "lucide-react";

type Blog = {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  author: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const fallbackExcerpt = blog.content
    ? `${blog.content.slice(0, 140)}${blog.content.length > 140 ? "..." : ""}`
    : "No excerpt transmitted yet.";
  const excerpt = blog.excerpt || fallbackExcerpt;

  return (
    <Link href={`/post/${blog._id}`}>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        whileHover={{ y: -6, rotateX: 4, rotateY: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="group glass-panel holo-sheen relative overflow-hidden rounded-2xl border border-cyan-500/20 p-5 shadow-[0_0_30px_rgba(74,199,255,0.15)]"
      >
        <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-cyan-50">
            {blog.title}
          </h2>
          <motion.div
            animate={{ y: [0, -2, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ScanEye className="h-5 w-5 text-cyan-300/80 drop-shadow-[0_0_8px_rgba(110,243,255,0.75)]" />
          </motion.div>
        </div>

        <div className="holo-divider my-3" />

        <p className="text-sm text-slate-300/80">{excerpt}</p>

        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-cyan-200/60">
          {blog.author}
        </div>
      </motion.article>
    </Link>
  );
}
