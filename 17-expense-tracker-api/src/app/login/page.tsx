"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      if (!res.ok) {
        alert("Login failed");
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
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 text-center">Welcome Back</h1>

        <p className="text-white/50 text-center mb-8">
          Login to your finance dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-green-400 transition"
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
            className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-green-400 transition"
          />

          <button
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-xl disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white/50 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
}
