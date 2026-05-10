"use client";

interface BackdropProps {
  className?: string;
}

export function NebulaBackdrop({ className = "" }: BackdropProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 nebula-gradient opacity-70" />
      <div className="absolute inset-0 holo-grid opacity-15" />
      <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-white/7 blur-3xl" />
      <div className="absolute right-6 top-24 h-72 w-72 rounded-full bg-white/6 blur-3xl" />
    </div>
  );
}

export function Starfield() {
  return null;
}

export function Scanline() {
  return null;
}
