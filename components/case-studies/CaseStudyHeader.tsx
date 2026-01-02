"use client";

import { motion } from "framer-motion";
import GradientButton from "../shared/GradientButton";

interface CaseStudyHeaderProps {
  title: string;
  tagline: string;
  summary: string;
  primaryMetric?: string;
  ctaHref?: string;
}

export default function CaseStudyHeader({
  title,
  tagline,
  summary,
  primaryMetric,
  ctaHref = "/contact",
}: CaseStudyHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-16 md:py-24">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm uppercase tracking-[0.35em] text-cyan-400 font-semibold"
        >
          {tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-slate-100"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto"
        >
          {summary}
        </motion.p>
        {primaryMetric && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0f2744] border border-cyan-500/30 text-cyan-400 font-semibold shadow-lg shadow-cyan-500/10"
          >
            <span className="text-3xl">★</span>
            <span>{primaryMetric}</span>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <GradientButton href={ctaHref} size="lg">
            Start a project like this
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}


