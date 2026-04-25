type ControlsPanelProps = {
  userId: string;
  setUserId: (value: string) => void;
  autoRun: boolean;
  setAutoRun: (enabled: boolean) => void;
  loading: boolean;
  onFetch: () => Promise<void>;
  onClearCurrent: () => Promise<void>;
};

export function ControlsPanel({
  userId,
  setUserId,
  autoRun,
  setAutoRun,
  loading,
  onFetch,
  onClearCurrent,
}: ControlsPanelProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/20 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
        <span>Control Deck</span>
        <span className="text-cyan-300">live</span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <input
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          placeholder="all, 1, 2, 3 ... or fail"
          className="rounded-lg border border-white/20 bg-black/45 px-3 py-2 font-mono text-sm text-zinc-100 outline-none transition focus:border-cyan-300"
        />

        <button
          onClick={onFetch}
          disabled={loading}
          className="rounded-lg border border-cyan-300/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Fetching" : "Run Request"}
        </button>

        <button
          onClick={onClearCurrent}
          className="rounded-lg border border-red-300/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-200 transition hover:bg-red-300/15"
        >
          Clear Current
        </button>
      </div>

      <label className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-300">
        <input
          type="checkbox"
          checked={autoRun}
          onChange={(event) => setAutoRun(event.target.checked)}
          className="h-4 w-4 accent-cyan-300"
        />
        Auto-run every 4s
      </label>
    </div>
  );
}
