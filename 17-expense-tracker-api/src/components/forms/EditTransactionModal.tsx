"use client";

import { Transaction } from "@/hooks/userTransactions";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  transaction: Transaction;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditTransactionModal({
  transaction,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState({
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    description: transaction.description || "",
  });

  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`/api/transactions/${transaction._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }
      toast.success("Scenario record updated");
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-aura-strong backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Dimensional Update
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Edit Scenario</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          <label className="relative block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/30">
            <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.3em] text-white/55">
              Amount
            </span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: Number(e.target.value),
                })
              }
              className="mt-4 w-full bg-transparent text-base text-white outline-none"
            />
          </label>

          <label className="relative block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/30">
            <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.3em] text-white/55">
              Scenario Type
            </span>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "income" | "expense",
                })
              }
              className="mt-4 w-full bg-transparent text-base text-white outline-none"
            >
              <option value="income" className="bg-slate-950">
                Sponsored Coins
              </option>
              <option value="expense" className="bg-slate-950">
                Scenario Costs
              </option>
            </select>
          </label>

          <label className="relative block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/30">
            <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.3em] text-white/55">
              Category
            </span>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="mt-4 w-full bg-transparent text-base text-white outline-none"
            />
          </label>

          <label className="relative block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition focus-within:border-white/30">
            <span className="absolute left-4 top-2 text-[10px] uppercase tracking-[0.3em] text-white/55">
              Description
            </span>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="mt-4 w-full bg-transparent text-base text-white outline-none"
            />
          </label>

          <button
            disabled={loading}
            className="w-full rounded-full border border-white/20 bg-white/10 py-3 text-xs uppercase tracking-[0.4em] text-white/80 shadow-cosmic transition hover:border-white/40 hover:bg-white/15 disabled:opacity-60"
          >
            {loading ? "Synchronizing..." : "Update Scenario"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
