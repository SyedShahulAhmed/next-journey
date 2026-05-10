"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

export default function AddTransactionForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }
      toast.success("Scenario record added");
      setForm({
        amount: "",
        type: "expense",
        category: "",
        description: "",
      });

      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
            Record Scenario
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Initialize Scenario Log
          </h2>
        </div>
        <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
          Broadcast
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/25">
          <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
            Amount
          </span>
          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            className="mt-4 w-full bg-transparent text-base text-white outline-none"
          />
        </label>

        <label className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/25">
          <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
            Scenario Type
          </span>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
            className="mt-4 w-full bg-transparent text-base text-white outline-none"
          >
            <option value="income" className="bg-abyss">
              Sponsored Coins
            </option>
            <option value="expense" className="bg-abyss">
              Scenario Costs
            </option>
          </select>
        </label>

        <label className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/25">
          <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
            Category
          </span>
          <input
            type="text"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="mt-4 w-full bg-transparent text-base text-white outline-none"
          />
        </label>

        <label className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/25">
          <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
            Description
          </span>
          <input
            type="text"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="mt-4 w-full bg-transparent text-base text-white outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          disabled={loading}
          className="relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm tracking-[0.14em] text-white/85 shadow-cosmic transition hover:border-white/35 hover:bg-white/15 disabled:opacity-60"
        >
          {loading ? "Broadcasting..." : "Record Scenario"}
        </button>
        <button
          type="reset"
          className="rounded-full border border-white/20 px-6 py-3 text-sm tracking-[0.14em] text-white/60 transition hover:border-white/35 hover:text-white"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
