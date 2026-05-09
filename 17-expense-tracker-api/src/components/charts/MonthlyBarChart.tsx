"use client";

import { Transaction } from "@/hooks/userTransactions";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  transactions: Transaction[];
}

export default function MonthlyBarChart({ transactions }: Props) {
  const monthlyData = [
    {
      name: "Transactions",
      income: transactions
        .filter((t) => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0),
      expense: transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0),
    },
  ];

  function formatCurrency(value: number) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  function HoloTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm shadow-cosmic backdrop-blur-md">
        <p className="text-white/60">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-white/90">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Constellation Analysis
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Sponsored Coins vs Scenario Costs
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
          Cycle view
        </div>
      </div>

      <div className="mt-6 h-75">
        {transactions.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/60">
            No probability data detected.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={300}
          >
            <BarChart data={monthlyData} barGap={8} barSize={18}>
              <defs>
                <linearGradient id="incomeGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d9d9dc" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#a0a1a5" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="expenseGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b9babd" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#8c8d91" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                stroke="#b7b8bc"
                tick={{ fill: "#d4d5d9", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#b7b8bc"
                tick={{ fill: "#d4d5d9", fontSize: 11 }}
              />
              <Tooltip content={<HoloTooltip />} />
              <Bar
                dataKey="income"
                name="Sponsored Coins"
                fill="url(#incomeGlow)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Scenario Costs"
                fill="url(#expenseGlow)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
