import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Job } from "@/types/job";

const statusStyles: Record<Job["status"], string> = {
  Applied: "border-[#3B82F6]/40 bg-[#0F172A] text-[#60A5FA]",
  Interview: "border-[#EAB308]/40 bg-[#1A1708] text-[#EAB308]",
  Offer: "border-[#22C55E]/40 bg-[#0E1A12] text-[#22C55E]",
  Rejected: "border-[#EF4444]/40 bg-[#1A0D0D] text-[#EF4444]",
  Ghosted: "border-[#2F3A4D] bg-[#111827] text-[#94A3B8]",
  Saved: "border-[#3B82F6]/30 bg-[#0D1220] text-[#60A5FA]",
};

interface StatusBadgeProps {
  status: Job["status"];
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={cn("border", statusStyles[status], className)}>
      {status}
    </Badge>
  );
}
