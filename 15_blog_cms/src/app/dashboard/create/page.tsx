"use client";

import HoloAlert from "@/components/HoloAlert";
import HoloToast from "@/components/HoloToast";
import { motion } from "framer-motion";
import { Loader2, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title || !content) {
      setError("All fields are required to transmit a log.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author: "lucy",
        }),
      });

      if (!res.ok) {
        throw new Error("Transmission failed");
      }

      await res.json();
      setTitle("");
      setContent("");
      setToastOpen(true);
    } catch (submitError) {
      setError("Transmission failed. Stabilize uplink and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!toastOpen) {
      return;
    }
    const timer = setTimeout(() => setToastOpen(false), 2400);
    return () => clearTimeout(timer);
  }, [toastOpen]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="mx-auto max-w-2xl"
    >
      <HoloToast open={toastOpen} message="Transmission complete." />

      <div className="glass-panel holo-sheen rounded-3xl border border-cyan-500/30 px-6 py-8">
        <div className="font-display text-sm text-cyan-100">Create Log</div>
        <h1 className="mt-3 text-3xl font-semibold text-cyan-50">New Archive Transmission</h1>
        <p className="mt-2 text-sm text-slate-200/70">
          Channel a new record into the Jedi archive. Fields glow as your signal stabilizes.
        </p>

        {error ? (
          <div className="mt-5">
            <HoloAlert tone="error" title="Transmission Error" description={error} />
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="group space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 transition group-focus-within:text-cyan-100">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter log title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="holo-input"
            />
          </div>

          <div className="group space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 transition group-focus-within:text-cyan-100">
              Content
            </label>
            <textarea
              placeholder="Write your transmission..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="holo-input min-h-[180px]"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="holo-button holo-button-primary holo-sheen w-full justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <SendHorizontal className="h-4 w-4" />
                Publish Log
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
