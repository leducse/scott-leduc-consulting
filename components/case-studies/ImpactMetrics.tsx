"use client";

import { motion } from "framer-motion";
import GradientCard from "../shared/GradientCard";

interface ImpactMetricsProps {
  metrics: { label: string; value: string; suffix?: string }[];
  gradient?: string;
}

export default function ImpactMetrics({
  metrics,
  gradient = "from-cyan-500 to-blue-500",
}: ImpactMetricsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <GradientCard gradient={gradient} hover={false} className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
            <div className="text-sm uppercase tracking-wide text-cyan-300 font-semibold">
              {metric.label}
            </div>
            {metric.suffix && (
              <div className="text-sm text-slate-200 mt-1">{metric.suffix}</div>
            )}
          </GradientCard>
        </motion.div>
      ))}
    </div>
  );
}


