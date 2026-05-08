"use client";

import { useState } from "react";

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
        alert(data.error);
        return;
      }
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
      className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: e.target.value,
            })
          }
          className="bg-black border border-white/10 rounded-lg p-3 outline-none"
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
          className="bg-black border border-white/10 rounded-lg p-3 outline-none"
        >
          <option value="income">income</option>
          <option value="expense">expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          className="bg-black border border-white/10 rounded-lg p-3 outline-none"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="bg-black border border-white/10 rounded-lg p-3 outline-none"
        />
      </div>

      <button
        disabled={loading}
        className="mt-6 bg-green-500 hover:bg-green-400 transition px-6 py-3 rounded-lg font-semibold text-black disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
