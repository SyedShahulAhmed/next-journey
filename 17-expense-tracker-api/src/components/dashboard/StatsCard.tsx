import { ReactNode } from "react";

interface Props {
  title: string;
  amount: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  amount,
  icon,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white/70">{title}</h3>

        <div className="text-green-400">
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-bold">
        {amount}
      </h2>
    </div>
  );
}