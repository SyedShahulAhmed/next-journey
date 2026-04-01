interface TopBarProps {
  mode: "focus" | "short" | "long";
  handleMode: (mode: "focus" | "short" | "long") => void;
  currentTime: Date;
  formatClock: (date: Date) => string;
  is24Hour: boolean;
  setIs24Hour: (value: boolean) => void;
  sessions: number;
  onSettingsClick: () => void;
}

const TopBar = ({
  mode,
  handleMode,
  currentTime,
  formatClock,
  is24Hour,
  setIs24Hour,
  sessions,
  onSettingsClick,
}: TopBarProps) => {
  return (
    <div className="relative z-20 flex justify-between items-start p-8 pointer-events-auto">
      {/* LEFT: MODE SELECTOR */}
      <div className="flex gap-2 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-1.5 pointer-events-auto shadow-lg" style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.05)"
      }}>
        {["focus", "short", "long"].map((m) => (
          <button
            key={m}
            onClick={() => handleMode(m as any)}
            className={`px-5 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-300 pointer-events-auto ${
              mode === m
                ? "bg-white/20 text-white border border-white/30 shadow-lg backdrop-blur-sm"
                : "text-white/60 hover:text-white/80 hover:bg-white/10"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* RIGHT: CLOCK & SETTINGS */}
      <div className="flex items-center gap-6 pointer-events-auto">
        <div className="flex flex-col items-end text-white/70 text-sm pointer-events-auto">
          <span className="font-light text-xs tracking-wider">{formatClock(currentTime)}</span>
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity duration-200 mt-1 pointer-events-auto"
          >
            {is24Hour ? "24h" : "12h"}
          </button>
        </div>

        <div className="w-px h-8 bg-white/10" />

        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest opacity-60 font-medium">Sessions</p>
            <p className="text-lg font-light">{sessions}</p>
          </div>

          <button
            onClick={onSettingsClick}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 text-lg pointer-events-auto backdrop-blur-sm shadow-lg"
          >
            ⚙
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
