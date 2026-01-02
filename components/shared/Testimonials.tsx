"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
          Client Feedback
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          What partners say about working together
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]/50 backdrop-blur-sm h-full flex flex-col">
              {/* Quote icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-cyan-400/40" />
                <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                  {testimonial.highlight}
                </span>
              </div>
              
              {/* Quote text */}
              <blockquote className="text-[var(--text-muted)] flex-grow mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="font-semibold text-[var(--foreground)]">
                  {testimonial.author}
                </div>
                <div className="text-sm text-[var(--text-light)]">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


