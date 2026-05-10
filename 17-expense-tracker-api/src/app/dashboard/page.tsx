"use client";

import ExpensePieChart from "@/components/charts/ExpensePieChart";
import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import Sidebar from "@/components/dashboard/SideBar";
import StatsCard from "@/components/dashboard/StatsCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import AddTransactionForm from "@/components/forms/AddTransactionForm";
import { NebulaBackdrop, Scanline, Starfield } from "@/components/orv/Backdrop";
import OracleAdvisor from "@/components/orv/OracleAdvisor";
import useTransactions from "@/hooks/userTransactions";
import { motion } from "framer-motion";
import { LogOut, Radar, Sparkles, Wallet } from "lucide-react";

const oracleNotes = [
  {
    id: "oracle-1",
    title: "Secretive Plotter",
    message:
      "High expenditure on consumables detected. Consolidate to improve probability reserve.",
    tone: "warning" as const,
  },
  {
    id: "oracle-2",
    title: "Dokkaebi Broadcast",
    message:
      "A constellation is observing your financial scenario. Maintain steady sponsorship flow.",
    tone: "info" as const,
  },
  {
    id: "oracle-3",
    title: "Nebula Core",
    message: "Scenario costs stabilized. Probability synchronization complete.",
    tone: "success" as const,
  },
];

export default function DashboardPage() {
  const { transactions, loading, refetch } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white">
      <NebulaBackdrop />
      <Starfield />
      <Scanline />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10"
      >
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <Sidebar />

          <section className="space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Star Stream: Scenario Finance Manager
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                    Scenario Command Console
                  </h1>
                  <p className="mt-2 text-sm text-white/60">
                    A constellation is observing your financial scenario.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
                    <Sparkles className="h-4 w-4" />
                    System Boot-up
                  </div>
                  <button
                    onClick={async () => {
                      await fetch("/api/auth/logout", {
                        method: "POST",
                      });

                      window.location.href = "/login";
                    }}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:border-white/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Exit Scenario
                  </button>
                </div>
              </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
              <StatsCard
                title="Probability Reserve"
                value={balance}
                subtext="Primary stability index"
                pulse
                icon={<Wallet className="h-6 w-6" />}
              />
              <StatsCard
                title="Sponsored Coins"
                value={totalIncome}
                subtext="Constellation sponsorship flow"
                icon={<Sparkles className="h-6 w-6" />}
              />
              <StatsCard
                title="Scenario Costs"
                value={totalExpense}
                subtext="Active broadcast expenditure"
                icon={<Radar className="h-6 w-6" />}
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <ExpensePieChart transactions={transactions} />
                <MonthlyBarChart transactions={transactions} />
              </div>
              <OracleAdvisor notes={oracleNotes} />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <AddTransactionForm onSuccess={refetch} />
              <TransactionTable
                transactions={transactions}
                loading={loading}
                refetch={refetch}
              />
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
