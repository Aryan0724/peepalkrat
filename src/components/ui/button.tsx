import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "editorial";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary: "bg-charcoal text-white hover:bg-terracotta-600 shadow-sm active:scale-[0.99]",
      secondary: "bg-khadi/60 text-charcoal hover:bg-khadi active:scale-[0.99]",
      outline: "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal/5",
      ghost: "text-charcoal hover:bg-black/5",
      link: "text-terracotta-600 underline-offset-4 hover:underline p-0 h-auto",
      editorial:
        "bg-terracotta-600 text-white tracking-widest uppercase text-xs font-semibold hover:bg-terracotta-700 shadow-sm hover:shadow active:scale-[0.99]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-sm",
      md: "h-11 px-5 text-sm rounded-sm",
      lg: "h-13 px-8 text-base rounded-sm",
      icon: "h-10 w-10 rounded-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
