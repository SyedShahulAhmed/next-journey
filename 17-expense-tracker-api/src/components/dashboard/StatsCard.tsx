"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  subtext?: string;
  pulse?: boolean;
}

function useCountUp(value: number, duration = 900) {
  const previousRef = useRef(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const from = previousRef.current;
    const to = value;
    previousRef.current = value;

    if (from === to) {
      return;
    }

    let frameId: number | undefined;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const nextValue = Math.round(from + (to - from) * progress);
      setDisplay(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [value, duration]);

  return display;
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function StatsCard({
  title,
  value,
  icon,
  subtext,
  pulse,
}: Props) {
  const animatedValue = useCountUp(value, 1200);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm transition hover:shadow-star ${
        pulse ? "animate-probability-pulse" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="relative flex items-center justify-between">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/55">
            {title}
          </h3>
          <p className="mt-3 text-3xl font-semibold text-white md:text-4xl font-mono">
            {formatCurrency(animatedValue)}
          </p>
          {subtext ? <p className="mt-2 text-sm text-white/60">{subtext}</p> : null}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/70">
          {icon}
        </div>
      </div>
    </div>
  );
}