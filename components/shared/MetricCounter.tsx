"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MetricCounterProps {
  value: string;
  label: string;
  description?: string;
}

export default function MetricCounter({
  value,
  label,
  description,
}: MetricCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="text-center p-6 rounded-xl glass-card"
    >
      <div
        className="text-4xl md:text-5xl font-black gradient-text mb-2"
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
      >
        {value}
      </div>
      <div className="text-lg font-semibold text-[var(--foreground)] mb-1">
        {label}
      </div>
      {description && (
        <div className="text-sm text-[var(--text-muted)]">{description}</div>
      )}
    </motion.div>
  );
}
