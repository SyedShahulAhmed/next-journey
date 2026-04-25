"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { CacheRow } from "./types";

type CacheTableProps = {
  rows: CacheRow[];
  onDelete: (key: string) => Promise<void>;
  onFocusChange: (focused: boolean) => void;
};

function getBarColor(expiresIn: number) {
  if (expiresIn <= 10_000) return "bg-red-400";
  if (expiresIn <= 25_000) return "bg-amber-300";
  return "bg-cyan-300";
}

export function CacheTable({ rows, onDelete, onFocusChange }: CacheTableProps) {
  const [explodingKey, setExplodingKey] = useState<string | null>(null);

  const handleDelete = async (key: string) => {
    setExplodingKey(key);
    await onDelete(key);
    setTimeout(() => setExplodingKey(null), 350);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/20 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
        <span>Cache Table</span>
        <span className="font-mono text-zinc-300">terminal mode</span>
      </div>

      <div className="overflow-auto rounded-xl border border-white/10 bg-black/65">
        <table className="min-w-full text-left font-mono text-xs text-zinc-200">
          <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            <tr>
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Cached At</th>
              <th className="px-3 py-2">Expiry</th>
              <th className="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => {
                const percentage = Math.max(0, Math.min(100, (row.expiresIn / 60_000) * 100));
                return (
                  <tr
                    key={row.key}
                    className="border-t border-white/10 hover:bg-white/5"
                    onMouseEnter={() => onFocusChange(true)}
                    onMouseLeave={() => onFocusChange(false)}
                  >
                    <td className="px-3 py-3 text-cyan-300">[{row.key}]</td>
                    <td className="px-3 py-3">{new Date(row.cachedAt).toLocaleTimeString()}</td>
                    <td className="px-3 py-3">
                      <div className="w-36">
                        <div className="h-2 overflow-hidden rounded bg-white/10">
                          <motion.div
                            className={`h-full ${getBarColor(row.expiresIn)}`}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <p className="mt-1 text-[10px] text-zinc-400">{Math.floor(row.expiresIn / 1000)}s</p>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => handleDelete(row.key)}
                        className="rounded border border-red-300/70 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-red-200 transition hover:bg-red-400/20"
                      >
                        {explodingKey === row.key ? "💥" : "⚠ Destroy obstacle"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">
                  No active cache keys
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
