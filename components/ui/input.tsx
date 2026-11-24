import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", icon, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500",
          icon ? "pl-9" : undefined,
          className,
        )}
        {...props}
      />
    );

    if (!icon) return input;

    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </span>
        {input}
      </div>
    );
  },
);
Input.displayName = "Input";
