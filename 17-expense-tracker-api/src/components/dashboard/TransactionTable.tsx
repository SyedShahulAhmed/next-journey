import { Transaction } from "@/hooks/userTransactions";

interface Props {
  transactions: Transaction[];
  loading: boolean;
}

export default function TransactionTable({ transactions, loading }: Props) {
  if (loading) {
    return <div className="text-white/60">Loading transactions...</div>;
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between bg-black rounded-xl p-4 border border-white/5"
          >
            <div>
              <h3 className="font-semibold">{transaction.category}</h3>

              <p className="text-sm text-white/50">{transaction.description}</p>
            </div>

            <div className="text-right">
              <p
                className={`font-bold ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${transaction.amount}
              </p>

              <p className="text-xs text-white/40">{transaction.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
