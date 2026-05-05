"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { Fingerprint, UserPlus } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import GlowButton from "@/components/GlowButton";
import Toast from "@/components/Toast";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    const timer = window.setTimeout(() => setError(null), 4000);
    return () => window.clearTimeout(timer);
  }, [error]);

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.error ?? "The seal fails. Try again.");
    }
  };

  return (
    <AuthShell
      title="Forge Your Identity"
      subtitle="Create a seal worthy of the path you are about to walk."
      caption="First Vow"
      footer={
        <p>
          Already sworn?{" "}
          <Link href="/login" className="text-[#8C7853] hover:text-[#E5E5E5]">
            Enter the dojo
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSignup} className="space-y-6">
        <Toast message={error} onDismiss={() => setError(null)} />
        <div className="space-y-4">
          <label className="text-[11px] uppercase tracking-[0.35em] text-[#8C7853]/70">
            Chosen Name
          </label>
          <input
            placeholder="Shadow of the Wind"
            className="samurai-input"
            onChange={(event) =>
              setForm({ ...form, name: event.target.value })
            }
          />
        </div>
        <div className="space-y-4">
          <label className="text-[11px] uppercase tracking-[0.35em] text-[#8C7853]/70">
            Email Seal
          </label>
          <input
            type="email"
            placeholder="mist@dojo.com"
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
            placeholder="Stone and flame"
            className="samurai-input"
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </div>

        <GlowButton
          type="submit"
          icon={<UserPlus className="h-4 w-4" />}
          className="w-full"
        >
          Begin Your Journey
        </GlowButton>

        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#888888]">
          <span className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-[#8C7853]" />
            Sealed in ink
          </span>
          <span>Quiet and secure</span>
        </div>
      </form>
    </AuthShell>
  );
}
