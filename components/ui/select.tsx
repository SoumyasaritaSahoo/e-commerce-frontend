import { SelectHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = "", ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100",
        className,
      )}
      {...props}
    />
  ),
);
Select.displayName = "Select";
