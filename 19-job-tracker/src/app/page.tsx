import Link from "next/link";

import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="container-custom flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#273244]/70 bg-[#111827]/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#94A3B8]">
              <Sparkles className="h-4 w-4 text-[#60A5FA]" />
              Premium Job Tracker
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#F8FAFC] md:text-5xl">
              A focused dashboard for every application, every follow-up,
              every offer.
            </h1>
            <p className="mt-5 text-lg text-[#94A3B8]">
              Organize your pipeline, understand momentum, and move with
              confidence. Built for professionals who treat job search like a
              product.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#60A5FA]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#2F3A4D] bg-[#111827]/70 px-6 py-3 text-sm font-semibold text-[#CBD5E1] transition hover:border-[#3B82F6]/60"
              >
                View workspace
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[#273244]/70 bg-[#111827]/70 p-6 backdrop-blur-xl">
            <div className="rounded-3xl border border-[#273244]/70 bg-[#151B23]/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">
                Weekly summary
              </p>
              <p className="mt-4 text-3xl font-semibold text-[#F8FAFC]">18</p>
              <p className="text-sm text-[#94A3B8]">Active applications</p>
              <div className="mt-6 space-y-3">
                {["Applied", "Interview", "Offer"].map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-[#273244]/70 bg-[#0F172A] px-4 py-3"
                  >
                    <span className="text-sm text-[#CBD5E1]">{label}</span>
                    <span className="text-sm text-[#60A5FA]">
                      {index === 0 ? "12" : index === 1 ? "4" : "2"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}