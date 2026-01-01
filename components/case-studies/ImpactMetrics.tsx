"use client";

import { motion } from "framer-motion";
import GradientCard from "../shared/GradientCard";

interface ImpactMetricsProps {
  metrics: { label: string; value: string; suffix?: string }[];
  gradient?: string;
}

export default function ImpactMetrics({
  metrics,
  gradient = "from-purple-500 to-pink-500",
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
            <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
            <div className="text-sm uppercase tracking-wide text-purple-500 font-semibold">
              {metric.label}
            </div>
            {metric.suffix && (
              <div className="text-sm text-gray-600 mt-1">{metric.suffix}</div>
            )}
          </GradientCard>
        </motion.div>
      ))}
    </div>
  );
}


