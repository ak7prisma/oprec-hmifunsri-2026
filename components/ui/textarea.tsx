import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm md:text-base ring-offset-white placeholder:text-slate-400",
          "text-slate-800 font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50 focus-visible:border-pink-400 focus-visible:bg-white",
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
Textarea.displayName = "Textarea";

export { Textarea };