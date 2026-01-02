"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Layers, Target, Zap, Award } from "lucide-react";
import Link from "next/link";
import { COMPETITIVE_ADVANTAGE } from "@/lib/content";

const STORAGE_KEY = "scottleduc_visited";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem(STORAGE_KEY);
    if (!hasVisited) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

  const handleLearnMore = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

  const icons = [Layers, Target, Zap, Award];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50 overflow-auto max-h-[90vh]"
          >
            <div className="relative bg-[#0a1628] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                {/* Header */}
                <div className="space-y-2 pr-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
                    Welcome
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {COMPETITIVE_ADVANTAGE.headline}
                  </h2>
                  <p className="text-slate-300">
                    {COMPETITIVE_ADVANTAGE.subheadline}
                  </p>
                </div>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {COMPETITIVE_ADVANTAGE.capabilities.slice(0, 4).map((cap, index) => (
                    <div
                      key={cap.layer}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">
                        {cap.layer}
                      </div>
                      <div className="text-slate-300 text-sm line-clamp-2">
                        {cap.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Value Props */}
                <div className="space-y-3">
                  {COMPETITIVE_ADVANTAGE.valueProps.slice(0, 2).map((prop, index) => {
                    const IconComponent = icons[index];
                    return (
                      <div key={prop.title} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">
                            {prop.title}
                          </h3>
                          <p className="text-slate-400 text-sm line-clamp-2">
                            {prop.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/about"
                    onClick={handleLearnMore}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all"
                  >
                    Learn More About Me
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleClose}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
                  >
                    Explore the Site
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
