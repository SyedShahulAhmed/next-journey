"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  const score = Number(params.get("score") ?? 0);
  const total = Number(params.get("total") ?? 0);
  const victory = total > 0 && score >= total * 0.6;
  const title = victory ? "Victory" : "Defeat";
  const subtitle = victory
    ? "Your strikes shattered the boss armor."
    : "The boss still stands. Train and return.";
  const particles = Array.from({ length: 12 }, (_, index) => index);
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 battle-bg battle-animate" />
      <div className="absolute inset-0 particle-layer">
        {particles.map((spark) => (
          <span key={`spark-${spark}`} />
        ))}
      </div>
      <div className="absolute inset-0 vignette" />
      <div className="pointer-events-none absolute inset-0 result-burst" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <div
          className={`arena-card w-full max-w-2xl rounded-3xl border border-white/10 px-8 py-10 animate-fade-up ${
            victory ? "victory-glow" : "defeat-shake"
          }`}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.5em] text-white/60">
            Battle Outcome
          </p>
          <h1 className="font-display mt-4 text-4xl md:text-5xl tracking-[0.2em]">
            {title}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/50">
            Score {score} / {total}
          </p>

          <p className="mt-6 text-base text-white/70">{subtitle}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("quiz-progress");
            router.push("/quiz");
          }}
          className="ripple-btn press-pop mt-8 rounded-2xl border border-[#ff7a18]/60 bg-[#11070c] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(255,122,24,0.35)] transition hover:scale-[1.04] hover:border-[#ffbf52]/80"
        >
          Restart Battle
        </button>
      </div>
    </main>
  );
}
