"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Brain, Cloud, LineChart, Database, Sparkles } from "lucide-react";

const iconComponents = {
  BarChart3,
  Brain,
  Cloud,
  LineChart,
  Database,
  Sparkles,
} as const;

interface ServiceCardProps {
  title: string;
  description: string;
  icon: keyof typeof iconComponents;
  gradient: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  gradient,
  href,
}: ServiceCardProps) {
  const IconComponent = iconComponents[icon] || Sparkles;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} className="block h-full">
        <div className="h-full p-6 rounded-xl glass-card group cursor-pointer">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
            {description}
          </p>

          {/* Link indicator */}
          <div className="flex items-center gap-2 text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
