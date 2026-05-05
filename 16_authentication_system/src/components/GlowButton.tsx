"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type GlowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  icon?: ReactNode;
};

const variantClasses: Record<NonNullable<GlowButtonProps["variant"]>, string> = {
  primary:
    "bg-[#0A0A0A] text-[#E5E5E5] border border-[#3B0A0A]/60 hover:border-[#5A0F0F]",
  ghost:
    "bg-white/5 text-[#E5E5E5] border border-white/10 hover:bg-white/10",
  outline:
    "bg-transparent text-[#8C7853] border border-[#3B0A0A]/40 hover:bg-[#3B0A0A]/15",
};

export default function GlowButton({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: GlowButtonProps) {
  const classes = [
    "samurai-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs uppercase tracking-[0.32em] transition duration-700",
    "shadow-[0_0_40px_rgba(59,10,10,0.35)] hover:shadow-[0_0_50px_rgba(90,15,15,0.4)]",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
