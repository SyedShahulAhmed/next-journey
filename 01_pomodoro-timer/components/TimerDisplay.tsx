interface TimerDisplayProps {
  time: number;
  totalTime: number;
  formatTime: (seconds: number) => string;
}

const TimerDisplay = ({ time, totalTime, formatTime }: TimerDisplayProps) => {
  const radius = 115;
  const circumference = 2 * Math.PI * radius;
  const progress = time / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* OUTER GLOW BACKDROP - Creates immersive focus */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400/30 via-purple-400/20 to-indigo-400/30 blur-3xl opacity-70" />

      {/* INNER GLOW LAYER - Subtle depth */}
      <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500/10 to-violet-500/10 blur-xl opacity-50" />

      {/* PREMIUM SVG TIMER RING */}
      <svg 
        width="320" 
        height="320" 
        viewBox="0 0 320 320" 
        className="absolute inset-0 z-10"
        style={{ filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 60px rgba(99, 102, 241, 0.15))" }}
      >
        <defs>
          {/* PREMIUM GRADIENT: Light Blue → Indigo → Violet */}
          <linearGradient id="premiumTimerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />          {/* Lightest blue */}
            <stop offset="25%" stopColor="#93c5fd" />         {/* Light blue */}
            <stop offset="50%" stopColor="#818cf8" />         {/* Soft indigo */}
            <stop offset="75%" stopColor="#a78bfa" />         {/* Indigo-violet blend */}
            <stop offset="100%" stopColor="#c4b5fd" />        {/* Subtle violet */}
          </linearGradient>

          {/* SOFT GLOW FILTER - Not neon, subtle and elegant */}
          <filter id="premiumGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feFlood floodColor="rgba(59, 130, 246, 0.4)" result="coloredBlood" />
            <feComposite in="coloredBlood" in2="coloredBlur" operator="in" result="soft-glow" />
            <feComposite in="soft-glow" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="glowedShapeDepth" />
            <feComposite in="glowedShapeDepth" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>

          {/* CENTER RADIAL GRADIENT - Creates focus point */}
          <radialGradient id="centerFocus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* BACKGROUND RING - Subtle foundation */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* PROGRESS RING - Premium animated stroke */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="url(#premiumTimerGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter="url(#premiumGlow)"
          className="transition-all ease-out"
          style={{
            transitionDuration: "1000ms",
            transform: "rotate(-90deg)",
            transformOrigin: "160px 160px",
          }}
        />

        {/* CENTER GLOW CIRCLE - Depth and focus */}
        <circle
          cx="160"
          cy="160"
          r={radius + 25}
          fill="url(#centerFocus)"
          opacity="0.4"
        />
      </svg>

      {/* PERFECTLY CENTERED TEXT CONTAINER - Locked to center with proper constraints */}
      <div 
        className="absolute z-20 flex flex-col items-center justify-center"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "240px",
          width: "auto",
        }}
      >
        {/* TIMER DISPLAY - Fits comfortably inside circle */}
        <div
          className="text-4xl font-light tracking-widest text-white select-none text-center"
          style={{
            textShadow: `
              0 0 20px rgba(59, 130, 246, 0.25),
              0 0 40px rgba(99, 102, 241, 0.15),
              0 0 60px rgba(139, 92, 246, 0.1)
            `,
            letterSpacing: "0.12em",
            fontWeight: 300,
            lineHeight: 1.1,
            wordSpacing: "-0.15em",
          }}
        >
          {formatTime(time)}
        </div>

        {/* MODE LABEL - Minimal and elegant */}
        <div 
          className="mt-4 text-xs uppercase tracking-[0.28em] text-white/60 font-light text-center"
          style={{
            textShadow: "0 0 10px rgba(255,255,255,0.08)",
            letterSpacing: "0.28em",
          }}
        >
          Focus Time
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
