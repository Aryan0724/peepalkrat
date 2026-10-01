import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-sm border border-stone-300 bg-white px-3.5 py-2 text-sm text-charcoal shadow-sm transition-colors placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-terracotta-500 focus-visible:border-terracotta-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
