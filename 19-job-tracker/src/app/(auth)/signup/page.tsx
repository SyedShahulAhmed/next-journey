"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
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
      toast.success("Signup Successful");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111827] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Create Account</h1>

          <p className="text-slate-400">Start tracking your job applications</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Name</label>

            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>

            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer text-sky-400 hover:text-sky-300"
          >
            Login
          </span>
        </p>
      </div>
    </main>
  );
}
