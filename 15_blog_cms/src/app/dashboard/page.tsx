import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, FileText, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="space-y-6"
    >
      <div className="glass-panel holo-sheen rounded-3xl border border-cyan-500/30 px-6 py-8">
        <div className="font-display text-sm text-cyan-100">Command Core</div>
        <h1 className="mt-3 text-3xl font-semibold text-cyan-50">Admin Console</h1>
        <p className="mt-2 text-sm text-slate-200/70">
          Monitor archive health and launch new transmissions from the command deck.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/create" className="holo-button holo-button-primary holo-sheen">
              <Plus className="h-4 w-4" />
              Create Log
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <div className="holo-button holo-sheen border border-cyan-400/30 bg-cyan-500/10 text-cyan-100">
              <Activity className="h-4 w-4" />
              Systems Nominal
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="glass-panel holo-sheen rounded-2xl border border-cyan-500/20 p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
              Total Logs
            </span>
            <FileText className="h-5 w-5 text-cyan-200/70" />
          </div>
          <div className="mt-4 text-3xl font-semibold text-cyan-50">128</div>
          <p className="mt-2 text-xs text-slate-200/60">
            Archive density stable.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="glass-panel holo-sheen rounded-2xl border border-cyan-500/20 p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
              Live Signals
            </span>
            <Activity className="h-5 w-5 text-cyan-200/70" />
          </div>
          <div className="mt-4 text-3xl font-semibold text-cyan-50">12</div>
          <p className="mt-2 text-xs text-slate-200/60">
            Uplink stability high.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="glass-panel holo-sheen rounded-2xl border border-cyan-500/20 p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
              Alerts
            </span>
            <Activity className="h-5 w-5 text-amber-200/70" />
          </div>
          <div className="mt-4 text-3xl font-semibold text-cyan-50">02</div>
          <p className="mt-2 text-xs text-slate-200/60">
            Minor energy fluctuations.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}