"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  gradient?: string;
  hover?: boolean;
  className?: string;
}

export default function GradientCard({
  children,
  gradient = "from-cyan-500 to-blue-500",
  hover = true,
  className = "",
}: GradientCardProps) {
  const CardWrapper = hover ? motion.div : "div";
  const motionProps = hover
    ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <CardWrapper
      {...motionProps}
      className={`relative p-6 rounded-xl glass-card overflow-hidden ${className}`}
    >
      {/* Gradient accent line at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </CardWrapper>
  );
}
