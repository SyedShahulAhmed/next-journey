import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-(--border) bg-(--surface-secondary) px-4 text-sm text-(--text-primary) placeholder:text-(--muted) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
