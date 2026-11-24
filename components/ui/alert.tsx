import { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type AlertVariant = "error" | "success" | "info";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const variantClasses: Record<AlertVariant, string> = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

export function Alert({ variant = "info", className = "", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
