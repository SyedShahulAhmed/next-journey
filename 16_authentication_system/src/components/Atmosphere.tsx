"use client";

import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const leaves = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  x: (index * 7) % 100,
  delay: (index * 0.6) % 6,
  duration: 22 + (index % 7) * 3,
  size: 10 + (index % 4) * 4,
  drift: 8 + (index % 5) * 6,
}));

const ash = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  x: (index * 9) % 100,
  delay: (index * 0.45) % 8,
  duration: 18 + (index % 6) * 4,
  size: 3 + (index % 3) * 2,
  drift: 10 + (index % 4) * 5,
}));

export default function Atmosphere() {
  const { scrollY } = useScroll();
  const fogOne = useTransform(scrollY, [0, 800], [0, -80]);
  const fogTwo = useTransform(scrollY, [0, 800], [0, -140]);
  const fogThree = useTransform(scrollY, [0, 800], [0, -200]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 samurai-bg" />
      <div className="absolute inset-0 blood-halo" />
      <motion.div
        className="absolute inset-0 fog-layer"
        style={{ y: fogOne }}
      />
      <motion.div
        className="absolute inset-0 fog-layer fog-layer-two"
        style={{ y: fogTwo }}
      />
      <motion.div
        className="absolute inset-0 fog-layer fog-layer-three"
        style={{ y: fogThree }}
      />
      <div className="absolute inset-0 ink-wash" />
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute inset-0 leaf-field">
        {leaves.map((leaf) => (
          <span
            key={leaf.id}
            className="leaf"
            style={
              {
                "--x": `${leaf.x}%`,
                "--delay": `${leaf.delay}s`,
                "--duration": `${leaf.duration}s`,
                "--size": `${leaf.size}px`,
                "--drift": `${leaf.drift}px`,
              } as CSSProperties
            }
          />
        ))}
        {ash.map((particle) => (
          <span
            key={`ash-${particle.id}`}
            className="ash"
            style={
              {
                "--x": `${particle.x}%`,
                "--delay": `${particle.delay}s`,
                "--duration": `${particle.duration}s`,
                "--size": `${particle.size}px`,
                "--drift": `${particle.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 samurai-grain" />
    </div>
  );
}
