import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "size-4 shrink-0 rounded border-zinc-300 text-violet-600 focus:ring-1 focus:ring-violet-600",
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";
