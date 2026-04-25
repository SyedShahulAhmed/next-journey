type MetricsGridProps = {
  totalRequests: number;
  hitRate: number;
  avgResponseTime: number;
  activeCacheKeys: number;
};

export function MetricsGrid({
  totalRequests,
  hitRate,
  avgResponseTime,
  activeCacheKeys,
}: MetricsGridProps) {
  const cards = [
    { label: "Total Requests", value: totalRequests.toLocaleString(), accent: "text-cyan-300" },
    { label: "Cache Hit Rate", value: `${hitRate.toFixed(1)}%`, accent: "text-emerald-300" },
    { label: "Avg Response Time", value: `${avgResponseTime.toFixed(0)} ms`, accent: "text-zinc-100" },
    { label: "Active Cache Keys", value: activeCacheKeys.toString(), accent: "text-amber-200" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="glass-panel rounded-2xl border border-white/15 px-4 py-3"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{card.label}</p>
          <p className={`pixel-title mt-2 text-2xl ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
