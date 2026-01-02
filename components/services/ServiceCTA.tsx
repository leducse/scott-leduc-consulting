"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

interface ServiceCTAProps {
  headline?: string;
  subheadline?: string;
}

export default function ServiceCTA({
  headline = "Ready to transform your data into impact?",
  subheadline = "Let's discuss how we can help you achieve measurable business outcomes.",
}: ServiceCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
      <div className="absolute inset-0 glass-card" />
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-6">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        
        <h2
          className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          {headline}
        </h2>
        
        <p className="text-lg text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/process"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass-card text-[var(--foreground)] font-semibold text-lg transition-all hover:border-cyan-500/50"
          >
            View Our Process
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
