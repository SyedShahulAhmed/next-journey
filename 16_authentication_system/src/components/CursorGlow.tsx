"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!glowRef.current) return;
      const offsetX = event.clientX - 120;
      const offsetY = event.clientY - 120;
      glowRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 h-60 w-60 rounded-full cursor-glow"
      aria-hidden="true"
    />
  );
}
