"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface OracleNote {
  id: string;
  title: string;
  message: string;
  tone?: "warning" | "success" | "info";
}

interface OracleAdvisorProps {
  notes: OracleNote[];
}

export default function OracleAdvisor({ notes }: OracleAdvisorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
            Oracle / Constellation Advisor
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Predictive Scenario Insights
          </h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70">
          <MessageSquare className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  note.tone === "warning"
                    ? "bg-white/45"
                    : note.tone === "success"
                    ? "bg-white/55"
                    : "bg-white/35"
                }`}
              />
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                {note.title}
              </p>
            </div>
            <p className="mt-3 text-white/90">{note.message}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
