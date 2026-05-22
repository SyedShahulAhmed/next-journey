import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[#273244]/70 bg-[#111827]/70 p-10 text-center backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#273244] bg-[#0B0F14]">
        <Icon className="h-6 w-6 text-[#94A3B8]" />
      </div>
      <h3 className="text-xl font-semibold text-[#F8FAFC]">{title}</h3>
      <p className="mt-2 text-sm text-[#94A3B8]">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
