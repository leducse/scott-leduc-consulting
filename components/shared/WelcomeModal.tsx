"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, BarChart3, Brain, Cloud, LineChart, Shield } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "decisionlayer_visited";

const services = [
  {
    title: "Statistical Analysis",
    description: "Causal inference & ROI validation",
    icon: BarChart3,
    aiEnhancement: "AI-powered pattern detection",
    href: "/services/statistical-analysis",
  },
  {
    title: "Machine Learning",
    description: "Predictive models & recommendations",
    icon: Brain,
    aiEnhancement: "AutoML & model optimization",
    href: "/services/machine-learning",
  },
  {
    title: "Cloud Architecture",
    description: "Serverless AWS solutions",
    icon: Cloud,
    aiEnhancement: "AI-native infrastructure",
    href: "/services/aws-architecture",
  },
  {
    title: "Business Intelligence",
    description: "Dashboards & KPI frameworks",
    icon: LineChart,
    aiEnhancement: "Natural language queries",
    href: "/services/business-intelligence",
  },
  {
    title: "Data Governance",
    description: "Data contracts & quality",
    icon: Shield,
    aiEnhancement: "LLM evaluation & guardrails",
    href: "/services/genai-governance",
  },
];

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(STORAGE_KEY);
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-6 lg:inset-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-4xl lg:w-full z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-h-[90vh] overflow-y-auto bg-[#0a1628] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="p-6 md:p-8 lg:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-3">
                    Welcome to
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Decision Layer
                  </h2>
                  <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                    The foundation between raw data and confident business decisions—
                    <span className="text-cyan-400"> powered by AI</span> at every layer.
                  </p>
                </div>

                {/* AI Enhancement Banner */}
                <div className="flex items-center justify-center gap-2 mb-8 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/20">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-200 text-sm">
                    AI-enhanced analytics across every service offering
                  </span>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <Link
                        key={service.title}
                        href={service.href}
                        onClick={handleClose}
                        className="group p-4 rounded-xl bg-[#111827] border border-white/10 hover:border-cyan-500/40 transition-all hover:bg-[#1a2332]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                            <IconComponent className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-slate-400 text-xs mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-cyan-400/80">
                              <Sparkles className="w-3 h-3" />
                              <span>{service.aiEnhancement}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm text-center sm:text-left">
                      Built by <span className="text-white">Scott LeDuc</span> — AWS Certified ML Engineer & Solutions Architect
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all"
                      >
                        Explore Site
                      </button>
                      <Link
                        href="/contact"
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all"
                      >
                        Get in Touch
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
