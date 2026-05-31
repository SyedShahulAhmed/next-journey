import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-transparent px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        subtle: "bg-(--surface-secondary) text-(--text-secondary)",
        info: "bg-(--glow) text-(--accent)",
        success: "bg-[rgba(52,211,153,0.12)] text-(--success)",
      },
    },
    defaultVariants: {
      variant: "subtle",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
