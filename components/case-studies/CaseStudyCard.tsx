"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  suffix?: string;
}

interface CaseStudyCardProps {
  title: string;
  tagline: string;
  metrics: Metric[];
  gradient: string;
  href: string;
}

export default function CaseStudyCard({
  title,
  tagline,
  metrics,
  gradient,
  href,
}: CaseStudyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} className="block h-full">
        <div className="h-full rounded-xl glass-card overflow-hidden group cursor-pointer">
          {/* Gradient header */}
          <div className={`h-2 bg-gradient-to-r ${gradient}`} />
          
          <div className="p-6">
            {/* Tagline */}
            <p className="text-sm font-medium text-cyan-400 mb-2">{tagline}</p>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metrics.slice(0, 4).map((metric) => (
                <div
                  key={metric.label}
                  className="p-3 rounded-lg bg-[var(--background)]/50"
                >
                  <div className="text-lg font-bold text-[var(--foreground)]">
                    {metric.value}
                    {metric.suffix && (
                      <span className="text-xs text-[var(--text-muted)] font-normal">
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Link indicator */}
            <div className="flex items-center gap-2 text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View case study</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
