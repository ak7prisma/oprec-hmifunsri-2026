import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  target?: string;
  className?: string;
}

export const Button = ({
  children,
  className = "",
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  target,
  ...props
}: ButtonProps) => {
  
  // Base
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

  // VARIANTS
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02]",
    secondary: "bg-white/80 border border-slate-200 text-slate-700 hover:bg-white hover:border-pink-300 hover:text-pink-600 backdrop-blur-sm shadow-sm",
    outline: "border-2 border-pink-500 text-pink-600 hover:bg-pink-50",
    ghost: "bg-transparent text-slate-600 hover:bg-pink-50/50 hover:text-pink-600",
  };

  // Sizes
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const IconWrapper = icon ? (
    <span className={`${iconPosition === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"} transition-transform duration-300`}>
      {icon}
    </span>
  ) : null;

  if (href) {
    return (
      <Link href={href} target={target} className={`${combinedClassName} group`}>
        {iconPosition === "left" && IconWrapper}
        {children}
        {iconPosition === "right" && IconWrapper}
      </Link>
    );
  }

  return (
    <button className={`${combinedClassName} group`} {...props}>
      {iconPosition === "left" && IconWrapper}
      {children}
      {iconPosition === "right" && IconWrapper}
    </button>
  );
};