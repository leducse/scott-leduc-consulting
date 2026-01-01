"use client";

import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
  description?: string;
}

interface StatsVisualizationProps {
  title?: string;
  stats: Stat[];
  orientation?: "horizontal" | "vertical";
}

export default function StatsVisualization({
  title,
  stats,
  orientation = "horizontal",
}: StatsVisualizationProps) {
  const containerClass =
    orientation === "horizontal"
      ? "grid gap-6 md:grid-cols-3"
      : "flex flex-col gap-4";

  return (
    <div className="p-8 rounded-2xl glass-card">
      {title && (
        <h3 className="text-lg font-semibold text-[var(--text-muted)] mb-6 text-center">
          {title}
        </h3>
      )}
      <div className={containerClass}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center p-4 rounded-lg bg-[var(--background)]/50"
          >
            <div className="text-sm font-medium text-cyan-400 mb-1">
              {stat.value}
            </div>
            <div className="text-lg font-semibold text-[var(--foreground)]">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
                {stat.description}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
