"use client";

import { motion } from "framer-motion";
import GradientCard from "../shared/GradientCard";

interface ServiceFeaturesProps {
  title: string;
  items: string[];
  icon?: string;
  gradient?: string;
}

export default function ServiceFeatures({
  title,
  items,
  icon = "✨",
  gradient = "from-purple-500 to-pink-500",
}: ServiceFeaturesProps) {
  return (
    <GradientCard gradient={gradient} className="h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3 text-slate-200">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start gap-3"
          >
            <span className="text-cyan-400 mt-1">•</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </GradientCard>
  );
}


