"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AnalyticsTone = "blue" | "green" | "yellow" | "red" | "slate";

const toneStyles: Record<AnalyticsTone, string> = {
  blue: "text-[#60A5FA]",
  green: "text-[#22C55E]",
  yellow: "text-[#EAB308]",
  red: "text-[#EF4444]",
  slate: "text-[#94A3B8]",
};

interface AnalyticsCardProps {
  label: string;
  value: string | number;
  detail?: string;
  icon?: LucideIcon;
  tone?: AnalyticsTone;
}

export default function AnalyticsCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "blue",
}: AnalyticsCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#64748B]">
              {label}
            </p>
            <p
              className={cn(
                "mt-3 text-3xl font-semibold",
                tone === "slate" ? "text-[#F8FAFC]" : toneStyles[tone],
              )}
            >
              {value}
            </p>
            {detail ? <p className="mt-2 text-sm text-[#94A3B8]">{detail}</p> : null}
          </div>
          {Icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#273244] bg-[#0F172A]">
              <Icon className={cn("h-5 w-5", toneStyles[tone])} />
            </div>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
