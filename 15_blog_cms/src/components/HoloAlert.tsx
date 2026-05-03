import { AlertTriangle, CircleDashed } from "lucide-react";

type HoloAlertProps = {
  title: string;
  description?: string;
  tone?: "info" | "error";
};

export default function HoloAlert({
  title,
  description,
  tone = "info",
}: HoloAlertProps) {
  const isError = tone === "error";

  return (
    <div
      className={`glass-panel flex items-start gap-3 rounded-2xl border px-4 py-4 ${
        isError
          ? "border-rose-400/50 bg-rose-500/10 text-rose-100"
          : "border-cyan-400/30 bg-cyan-500/5 text-cyan-100"
      }`}
    >
      <div className="mt-0.5">
        {isError ? (
          <AlertTriangle className="h-5 w-5 text-rose-300" />
        ) : (
          <CircleDashed className="h-5 w-5 text-cyan-200" />
        )}
      </div>
      <div>
        <div className="font-display text-sm tracking-[0.3em]">{title}</div>
        {description ? (
          <p className="mt-1 text-sm text-slate-200/70">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
