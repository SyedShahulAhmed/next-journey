"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { NebulaBackdrop, Scanline, Starfield } from "@/components/orv/Backdrop";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white">
      <NebulaBackdrop />
      <Starfield />
      <Scanline />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-cosmic backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/70">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Access Star Stream
              </p>
              <h1 className="mt-1 text-2xl font-semibold">Enter Scenario</h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/60">
            Probability synchronization required. Constellation authorization
            pending.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="relative block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/25">
              <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
                Email
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-4 w-full bg-transparent text-base text-white outline-none"
              />
            </label>

            <label className="relative block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/25">
              <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
                Password
              </span>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="mt-4 w-full bg-transparent text-base text-white outline-none"
              />
            </label>

            <button
              disabled={loading}
              className="w-full rounded-full border border-white/20 bg-white/10 py-3 text-sm tracking-[0.14em] text-white/85 shadow-cosmic transition hover:border-white/35 hover:bg-white/15 disabled:opacity-60"
            >
              {loading ? "Synchronizing..." : "Access Star Stream"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/50">
            <span className="flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Scenario access granted
            </span>
            <Link href="/signup" className="text-white/70 hover:text-white">
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
