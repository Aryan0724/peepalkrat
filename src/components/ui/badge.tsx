import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "terracotta" | "forest" | "mustard";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-charcoal text-white",
    secondary: "bg-khadi/80 text-charcoal-light",
    outline: "border border-charcoal/20 text-charcoal",
    terracotta: "bg-terracotta-50 text-terracotta-700 border border-terracotta-200",
    forest: "bg-peepal-50 text-peepal-700 border border-peepal-100",
    mustard: "bg-mustard-100 text-amber-900 border border-mustard-500/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
