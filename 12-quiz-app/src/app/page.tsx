"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 battle-bg battle-animate" />
      <div className="absolute inset-0 vignette" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="arena-card w-full max-w-xl rounded-3xl border border-white/10 px-8 py-10">
          <p className="text-[0.7rem] uppercase tracking-[0.5em] text-white/60">
            Battle Arena
          </p>
          <h1 className="font-display mt-5 text-4xl md:text-5xl tracking-[0.2em]">
            Quiz Game
          </h1>
          <p className="mt-4 text-sm text-white/70">
            Enter the arena. Answer correctly to drain the boss HP. Miss, and your
            HP shatters.
          </p>

          <button
            onClick={() => router.push("/quiz")}
            className="ripple-btn press-pop mt-8 rounded-2xl border border-[#ff7a18]/60 bg-[#11070c] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(255,122,24,0.35)] transition hover:scale-[1.04] hover:border-[#ffbf52]/80"
          >
            Start Battle
          </button>
        </div>
      </div>
    </main>
  );
}
