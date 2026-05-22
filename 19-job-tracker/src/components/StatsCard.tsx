"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsTone = "blue" | "green" | "yellow" | "red" | "slate";

const toneStyles: Record<StatsTone, { card: string; icon: string; iconWrap: string }> = {
  blue: {
    card: "border-[#273244]",
    icon: "text-[#60A5FA]",
    iconWrap: "border-[#3B82F6]/40 bg-[#0F172A]",
  },
  green: {
    card: "border-[#273244]",
    icon: "text-[#22C55E]",
    iconWrap: "border-[#22C55E]/40 bg-[#0E1A12]",
  },
  yellow: {
    card: "border-[#273244]",
    icon: "text-[#EAB308]",
    iconWrap: "border-[#EAB308]/40 bg-[#1A1708]",
  },
  red: {
    card: "border-[#273244]",
    icon: "text-[#EF4444]",
    iconWrap: "border-[#EF4444]/40 bg-[#1A0D0D]",
  },
  slate: {
    card: "border-[#273244]",
    icon: "text-[#94A3B8]",
    iconWrap: "border-[#2F3A4D] bg-[#111827]",
  },
};

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  tone?: StatsTone;
  caption?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  tone = "blue",
  caption,
}: StatsCardProps) {
  const styles = toneStyles[tone];

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Card className={cn("p-6", styles.card)}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#94A3B8]">{title}</p>
            <p className="mt-3 text-3xl font-semibold text-[#F8FAFC]">{value}</p>
            {caption ? (
              <p className="mt-2 text-xs text-[#64748B]">{caption}</p>
            ) : null}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl border",
              styles.iconWrap,
            )}
          >
            <Icon className={cn("h-5 w-5", styles.icon)} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
