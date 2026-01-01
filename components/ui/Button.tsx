"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
  secondary:
    "bg-white text-purple-600 border border-purple-200 hover:border-purple-300 hover:shadow-lg",
  ghost: "bg-transparent text-purple-600 hover:bg-purple-50",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props;
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
        {...(restProps as any)}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;


