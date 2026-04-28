type Props = {
  current: number;
  total: number;
  label?: string;
  variant?: "enemy" | "player" | "neutral";
  showText?: boolean;
  pulse?: boolean;
  className?: string;
  size?: "sm" | "md";
};

export default function ProgressBar({
  current,
  total,
  label,
  variant = "neutral",
  showText = false,
  pulse = false,
  className = "",
  size = "md",
}: Props) {
  const percentage = (current / total) * 100;
  const barColor =
    variant === "enemy"
      ? "from-[#ff4a4a] via-[#ff7a18] to-[#ffbf52]"
      : variant === "player"
        ? "from-[#21f7a8] via-[#2dff9d] to-[#9bffcf]"
        : "from-white via-white/80 to-white";
  const trackHeight = size === "sm" ? "h-2" : "h-3.5";
  return (
    <div className={`w-full ${className}`}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-white/70">
          <span>{label}</span>
          {showText ? (
            <span className="text-white/60">
              {current} / {total}
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        className={`w-full ${trackHeight} rounded-full bg-white/10 overflow-hidden border border-white/10`}
      >
        <div
          className={`relative h-full bg-linear-to-r ${barColor} transition-all duration-500 ${
            pulse ? "glow-pulse" : ""
          }`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        >
          <span className="bar-sheen absolute inset-y-0 right-0 w-16" />
        </div>
      </div>
    </div>
  );
}
