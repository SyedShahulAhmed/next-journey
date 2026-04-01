import { useState } from "react";

interface ControlsBarProps {
  running: boolean;
  setRunning: (value: boolean) => void;
  handleMode: (mode: "focus" | "short" | "long") => void;
  onCustomTime: (hours: number, minutes: number) => void;
}

const ControlsBar = ({ running, setRunning, handleMode, onCustomTime }: ControlsBarProps) => {
  const [customHours, setCustomHours] = useState(0);
  const [customMin, setCustomMin] = useState(0);
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <div className="relative z-20 pb-8 px-8 flex flex-col items-center gap-6 pointer-events-auto">
      {/* MAIN CONTROLS */}
      <div className="flex gap-4 pointer-events-auto" style={{
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))"
      }}>
        <button
          onClick={() => setRunning(true)}
          className={`px-8 py-3 rounded-full font-medium uppercase tracking-wider text-sm transition-all duration-300 pointer-events-auto ${
            running
              ? "bg-white/10 text-white/50 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-white hover:from-green-500/50 hover:to-emerald-500/50 border border-green-500/60 backdrop-blur-sm"
          }`}
          disabled={running}
        >
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
          className={`px-8 py-3 rounded-full font-medium uppercase tracking-wider text-sm transition-all duration-300 pointer-events-auto ${
            !running
              ? "bg-white/10 text-white/50 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-500/40 to-orange-500/40 text-white hover:from-yellow-500/50 hover:to-orange-500/50 border border-yellow-500/60 backdrop-blur-sm"
          }`}
          disabled={!running}
        >
          Pause
        </button>

        <button
          onClick={() => handleMode("focus")}
          className="px-8 py-3 rounded-full font-medium uppercase tracking-wider text-sm bg-gradient-to-r from-red-500/40 to-rose-500/40 text-white hover:from-red-500/50 hover:to-rose-500/50 border border-red-500/60 transition-all duration-300 pointer-events-auto backdrop-blur-sm"
        >
          Reset
        </button>

        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="px-6 py-3 rounded-full font-medium text-white hover:bg-white/20 bg-white/15 border border-white/30 transition-all duration-300 pointer-events-auto backdrop-blur-sm"
          title="Custom Time"
        >
          ≡
        </button>
      </div>

   {showCustomInput && (
  <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
    
    <div className="flex items-center gap-6 px-6 py-4 rounded-2xl 
      bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">

      {/* LABEL */}
      <label className="text-white/70 text-xs tracking-widest uppercase">
        Set Time
      </label>

      {/* INPUTS */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={customHours.toString().padStart(2, "0")}
          onChange={(e) =>
            setCustomHours(Math.min(23, Math.max(0, Number(e.target.value))))
          }
          className="w-12 text-center text-lg font-medium 
          bg-transparent border border-white/20 rounded-md py-1 text-white 
          focus:outline-none focus:border-white/40"
        />

        <span className="text-white/50">:</span>

        <input
          type="number"
          value={customMin.toString().padStart(2, "0")}
          onChange={(e) =>
            setCustomMin(Math.min(59, Math.max(0, Number(e.target.value))))
          }
          className="w-12 text-center text-lg font-medium 
          bg-transparent border border-white/20 rounded-md py-1 text-white 
          focus:outline-none focus:border-white/40"
        />
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={() => {
          onCustomTime(customHours, customMin);
          setShowCustomInput(false);
          setCustomHours(0);
          setCustomMin(0);
        }}
        className="px-4 py-1.5 rounded-md text-sm font-medium 
        bg-white/20 hover:bg-white/30 text-white transition"
      >
        Apply
      </button>

      {/* CLOSE */}
      <button
        onClick={() => setShowCustomInput(false)}
        className="text-white/50 hover:text-white text-lg"
      >
        ✕
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default ControlsBar;
