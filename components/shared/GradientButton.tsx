"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

type GradientButtonProps = LinkProps | ButtonProps;

export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  showArrow = false,
  href,
  type,
  disabled,
  onClick,
  ...rest
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105",
    secondary:
      "glass-card text-[var(--foreground)] hover:border-cyan-500/50",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none"
    : "";

  const baseClasses = `group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    );
  }

  return (
    <button
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
      {...rest}
    >
      {children}
      {showArrow && !disabled && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}
