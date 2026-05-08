"use client";

import Sidebar from "@/components/dashboard/SideBar";
import StatsCard from "@/components/dashboard/StatsCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import AddTransactionForm from "@/components/forms/AddTransactionForm";
import useTransactions from "@/hooks/userTransactions";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

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
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Expense Dashboard</h1>
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
            });

            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-400 transition px-5 py-3 rounded-xl font-semibold"
        >
          Logout
        </button>
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatsCard
            title="Balance"
            amount={`$${balance}`}
            icon={<DollarSign />}
          />

          <StatsCard
            title="Income"
            amount={`$${totalIncome}`}
            icon={<TrendingUp />}
          />

          <StatsCard
            title="Expenses"
            amount={`$${totalExpense}`}
            icon={<TrendingDown />}
          />
        </div>

        {/* Form */}
        <div className="mb-10">
          <AddTransactionForm onSuccess={refetch} />
        </div>

        {/* Transactions */}
        <TransactionTable transactions={transactions} loading={loading} />
      </section>
    </main>
  );
}
