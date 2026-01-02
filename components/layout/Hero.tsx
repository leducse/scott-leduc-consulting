"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, Brain, Cloud } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-dots opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Decision Layer Analytics
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            <span className="gradient-text-animated">{SITE_CONFIG.tagline}</span>
          </motion.h1>

          {/* Subtitle with emphasis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--text-muted)] mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            Statistical validation. Machine learning. AWS architecture.
          </motion.p>
          
          {/* Value prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            Building the critical layer between raw data and confident business decisions—
            <span className="text-cyan-400"> with results you can defend.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 shimmer"
            >
              Request Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass-card text-[var(--foreground)] font-semibold text-lg transition-all hover:border-cyan-500/50 card-lift"
            >
              View Case Studies
            </Link>
          </motion.div>

          {/* Capability pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 pt-12 border-t border-[var(--card-border)]"
          >
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-sm font-medium text-white">Statistical Rigor</p>
                <p className="text-xs text-slate-500">p &lt; 0.05 validated</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-white">ML Engineering</p>
                <p className="text-xs text-slate-500">89%+ accuracy</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-violet-400" />
                </div>
                <p className="text-sm font-medium text-white">AWS Certified</p>
                <p className="text-xs text-slate-500">Production-ready</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
