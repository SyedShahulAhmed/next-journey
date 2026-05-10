"use client";

import { Transaction } from "@/hooks/userTransactions";
import { AnimatePresence, motion } from "framer-motion";
import {
  Filter,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import EditTransactionModal from "../forms/EditTransactionModal";
import { toast } from "sonner";

interface Props {
  transactions: Transaction[];
  loading: boolean;
  refetch: () => void;
}

export default function TransactionTable({
  transactions,
  loading,
  refetch,
}: Props) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "income" | "expense"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<
    "latest" | "oldest" | "amount-high" | "amount-low"
  >("latest");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      }
      toast.success("Scenario record deleted");
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((item) => item.category));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const filtered = useMemo(() => {
    const min = minAmount ? Number(minAmount) : null;
    const max = maxAmount ? Number(maxAmount) : null;

    let result = transactions.filter((transaction) => {
      const matchesQuery =
        transaction.category.toLowerCase().includes(query.toLowerCase()) ||
        (transaction.description || "")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || transaction.category === categoryFilter;
      const matchesMin = min === null || transaction.amount >= min;
      const matchesMax = max === null || transaction.amount <= max;
      return (
        matchesQuery &&
        matchesType &&
        matchesCategory &&
        matchesMin &&
        matchesMax
      );
    });

    if (sortOrder === "oldest") {
      result = [...result].reverse();
    }

    if (sortOrder === "amount-high") {
      result = [...result].sort((a, b) => b.amount - a.amount);
    }

    if (sortOrder === "amount-low") {
      result = [...result].sort((a, b) => a.amount - b.amount);
    }

    return result;
  }, [
    transactions,
    query,
    typeFilter,
    categoryFilter,
    sortOrder,
    minAmount,
    maxAmount,
  ]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60 shadow-cosmic backdrop-blur-sm">
        Synchronizing scenario records...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cosmic backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
            Scenario Logs
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Constellation Records
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/60">
          <Filter className="h-4 w-4" />
          Star Stream Filter
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 focus-within:border-white/25">
          <Search className="h-4 w-4 text-white/60" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search scenario records"
            className="w-full bg-transparent text-white outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          <SlidersHorizontal className="h-4 w-4 text-white/60" />
          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as "all" | "income" | "expense")
            }
            className="bg-transparent text-white outline-none"
          >
            <option value="all" className="bg-abyss">
              All types
            </option>
            <option value="income" className="bg-abyss">
              Sponsored Coins
            </option>
            <option value="expense" className="bg-abyss">
              Scenario Costs
            </option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="bg-transparent text-white outline-none"
          >
            <option value="all" className="bg-abyss">
              All categories
            </option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-abyss">
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(
                event.target.value as
                  | "latest"
                  | "oldest"
                  | "amount-high"
                  | "amount-low",
              )
            }
            className="bg-transparent text-white outline-none"
          >
            <option value="latest" className="bg-abyss">
              Latest first
            </option>
            <option value="oldest" className="bg-abyss">
              Oldest first
            </option>
            <option value="amount-high" className="bg-abyss">
              Highest amount
            </option>
            <option value="amount-low" className="bg-abyss">
              Lowest amount
            </option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Amount range
        </span>
        <input
          type="number"
          value={minAmount}
          onChange={(event) => setMinAmount(event.target.value)}
          placeholder="Min"
          className="w-24 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
        />
        <input
          type="number"
          value={maxAmount}
          onChange={(event) => setMaxAmount(event.target.value)}
          placeholder="Max"
          className="w-24 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
        />
      </div>

      <div className="mt-6 space-y-4">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <p className="text-lg font-semibold text-white">
                No scenario records found.
              </p>
              <p className="mt-2 text-sm text-white/60">
                The Star Stream awaits your first scenario.
              </p>
            </motion.div>
          ) : (
            filtered.map((transaction) => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                whileHover={{ scale: 1.01 }}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                    {transaction.category}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {transaction.description || "Scenario record"}
                  </p>
                  <p className="text-xs text-white/40">
                    {transaction.type === "income"
                      ? "Sponsored Coins"
                      : "Scenario Costs"}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-semibold font-mono ${
                      transaction.type === "income"
                        ? "text-white/75"
                        : "text-white/55"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-white/40">
                    {transaction.date || "Unknown cycle"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedTransaction(transaction)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-white/25 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition hover:border-white/25 hover:text-white/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
