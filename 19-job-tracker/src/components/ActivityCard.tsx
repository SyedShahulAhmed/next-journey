"use client";

import { motion } from "framer-motion";

import StatusBadge from "@/components/StatusBadge";
import { Job } from "@/types/job";

interface ActivityCardProps {
  title: string;
  description: string;
  time: string;
  status: Job["status"];
}

export default function ActivityCard({
  title,
  description,
  time,
  status,
}: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start justify-between gap-4 rounded-2xl border border-[#273244]/70 bg-[#111827]/60 px-4 py-3"
    >
      <div>
        <p className="text-sm font-medium text-[#F8FAFC]">{title}</p>
        <p className="mt-1 text-xs text-[#94A3B8]">{description}</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#64748B]">
          {time}
        </p>
      </div>
      <StatusBadge status={status} />
    </motion.div>
  );
}
