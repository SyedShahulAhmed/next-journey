"use client";

import { ArrowLeft, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignup() {
    try {
      if (
        formData.name.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === ""
      ) {
        toast.error("Name, email and password are required");
        return;
      }
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      toast.success("Account created");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-[#948979] transition hover:text-[#DFD0B8]"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#948979]/40 bg-[#222831]/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#948979]">
            <Sparkles size={14} />
            Create workspace
          </div>
          <h1 className="font-heading text-4xl md:text-5xl">
            Create your Shortly workspace.
          </h1>
          <p className="text-[#948979]">
            Build your workspace, configure your dashboard, and start shortening
            links with centralized control.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-[#948979]">
            <span>Unlimited redirects</span>
            <span>QR codes</span>
            <span>API access</span>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#948979]/40 bg-[#222831]">
              <Wand2 size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#948979]">
                New account
              </p>
              <p className="font-heading text-2xl">Sign up</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="app-input w-full rounded-2xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="app-input w-full rounded-2xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="app-input w-full rounded-2xl px-4 py-3"
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#DFD0B8] py-3 text-sm font-semibold text-[#222831] shadow-[0_0_28px_rgba(223,208,184,0.3)] transition hover:-translate-y-px"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}

              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-x[#948979]">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="cursor-pointer text-[#DFD0B8]"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
