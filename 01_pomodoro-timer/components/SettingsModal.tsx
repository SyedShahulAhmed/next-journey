interface SettingsModalProps {
  settings: {
    focus: number;
    short: number;
    long: number;
    interval: number;
  };
  setSettings: (settings: any) => void;
  bgImage: string | null;
  setBgImage: (value: string | null) => void;
  effect: "none" | "rain" | "snow" | "stars";
  setEffect: (value: "none" | "rain" | "snow" | "stars") => void;
  gifList: string[];
  onClose: () => void;
}

const SettingsModal = ({
  settings,
  setSettings,
  bgImage,
  setBgImage,
  effect,
  setEffect,
  gifList,
  onClose,
}: SettingsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/25 rounded-3xl p-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl pointer-events-auto" onClick={(e) => e.stopPropagation()} style={{
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.08)"
      }}>
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/15">
          <h2 className="text-3xl font-light tracking-widest bg-gradient-to-r from-blue-200 via-white to-green-200 bg-clip-text text-transparent">⚙ SETTINGS</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* TIMER SETTINGS SECTION */}
        <div className="mb-8 pointer-events-auto">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-4 flex items-center gap-2">
            <span className="text-blue-400">⏱</span> Timer Duration
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs opacity-60 block mb-2 font-medium">Focus (min)</label>
              <input
                type="number"
                value={settings.focus}
                onChange={(e) =>
                  setSettings({ ...settings, focus: +e.target.value })
                }
                min="1"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/50 transition-all pointer-events-auto backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-2 font-medium">
                Short Break (min)
              </label>
              <input
                type="number"
                value={settings.short}
                onChange={(e) =>
                  setSettings({ ...settings, short: +e.target.value })
                }
                min="1"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/50 transition-all pointer-events-auto backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-2 font-medium">Long Break (min)</label>
              <input
                type="number"
                value={settings.long}
                onChange={(e) =>
                  setSettings({ ...settings, long: +e.target.value })
                }
                min="1"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/50 transition-all pointer-events-auto backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-2 font-medium">
                Sessions/Long Break
              </label>
              <input
                type="number"
                value={settings.interval}
                onChange={(e) =>
                  setSettings({ ...settings, interval: +e.target.value })
                }
                min="1"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/50 transition-all pointer-events-auto backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* ATMOSPHERE EFFECTS SECTION */}
        <div className="mb-8 pointer-events-auto">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-4 flex items-center gap-2">
            <span className="text-green-400">✨</span> Atmosphere
          </h3>
          <div className="flex gap-3 flex-wrap">
            {["none", "rain", "snow", "stars"].map((e) => (
              <button
                key={e}
                onClick={() => setEffect(e as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 pointer-events-auto ${
                  effect === e
                    ? "bg-gradient-to-r from-white/30 to-white/20 text-white border border-white/50 shadow-lg backdrop-blur-sm"
                    : "bg-white/10 text-white/70 border border-white/25 hover:text-white/90 hover:bg-white/15 backdrop-blur-sm"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* BACKGROUND SECTION */}
        <div className="mb-8 pointer-events-auto">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-4 flex items-center gap-2">
            <span className="text-purple-400">🖼</span> Background
          </h3>
          <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pb-2">
            {gifList.map((gif, i) => (
              <div
                key={i}
                onClick={() => setBgImage(gif)}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 pointer-events-auto backdrop-blur-sm ${
                  bgImage === gif
                    ? "border-white/60 ring-2 ring-white/40 shadow-lg"
                    : "border-white/25 hover:border-white/50 hover:shadow-md"
                }`}
              >
                <img
                  src={gif}
                  alt={`bg-${i}`}
                  className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {bgImage === gif && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setBgImage(null)}
            className="mt-4 w-full px-4 py-2 rounded-lg bg-white/5 border border-white/25 text-white/70 text-sm hover:bg-white/15 hover:text-white/90 transition-all duration-300 pointer-events-auto backdrop-blur-sm font-medium"
          >
            Remove Background
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 pt-6 border-t border-white/15 pointer-events-auto">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/30 font-medium uppercase tracking-wider text-sm hover:from-white/30 hover:to-white/20 transition-all duration-300 pointer-events-auto backdrop-blur-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
