"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { KeyRound, LogIn } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import GlowButton from "@/components/GlowButton";
import Toast from "@/components/Toast";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    const timer = window.setTimeout(() => setError(null), 4000);
    return () => window.clearTimeout(timer);
  }, [error]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(data.error ?? "The mist is heavy. Try again.");
    }
  };

  return (
    <AuthShell
      title="Enter the Dojo"
      subtitle="Breathe in. Align your focus. Let the path reveal itself."
      footer={
        <p>
          No seal yet?{" "}
          <Link href="/signup" className="text-[#8C7853] hover:text-[#E5E5E5]">
            Forge your identity
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <Toast message={error} onDismiss={() => setError(null)} />
        <div className="space-y-4">
          <label className="text-[11px] uppercase tracking-[0.35em] text-[#8C7853]/70">
            Email Seal
          </label>
          <input
            type="email"
            placeholder="wind@dojo.com"
            className="samurai-input"
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </div>
        <div className="space-y-4">
          <label className="text-[11px] uppercase tracking-[0.35em] text-[#8C7853]/70">
            Secret Oath
          </label>
          <input
            type="password"
            placeholder="Quiet strength"
            className="samurai-input"
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </div>

        <GlowButton
          type="submit"
          icon={<LogIn className="h-4 w-4" />}
          className="w-full"
        >
          Walk the Path
        </GlowButton>

        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#888888]">
          <span className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[#8C7853]" />
            Disciplined access
          </span>
          <span>Silent by design</span>
        </div>
      </form>
    </AuthShell>
  );
}
