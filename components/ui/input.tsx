import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm md:text-base",
          "text-slate-800 placeholder:text-slate-400 font-medium",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50 focus-visible:border-pink-500 focus-visible:bg-white",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-300 ease-in-out shadow-sm hover:border-pink-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };