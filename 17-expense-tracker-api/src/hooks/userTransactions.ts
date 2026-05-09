"use client";

import { useEffect, useState } from "react";

export interface Transaction {
  _id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description?: string;
  date: string;
}

export default function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions",{
        credentials : "include"
      });
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    refetch: fetchTransactions,
  };
}
