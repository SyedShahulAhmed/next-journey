"use client";

import { Transaction } from "@/hooks/userTransactions";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  transactions: Transaction[];
}

const COLORS = ["#d6d6d8", "#bdbdc1", "#a3a4a8", "#8b8c90", "#76777b"];

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function HoloTooltip({ active, payload }: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm shadow-cosmic backdrop-blur-md">
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-white/90">
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function ExpensePieChart({ transactions }: Props) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap: Record<string, number> = {};

  expenses.forEach((exp) => {
    if (categoryMap[exp.category]) {
      categoryMap[exp.category] += exp.amount;
    } else {
      categoryMap[exp.category] = exp.amount;
    }
  });

  const data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Constellation Analysis
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Scenario Cost Constellation
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
          Live
        </div>
      </div>

      <div className="mt-6 h-75">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/60">
            No scenario costs detected.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={300}
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={4}
                stroke="#2a2b2f"
                strokeWidth={2}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<HoloTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
