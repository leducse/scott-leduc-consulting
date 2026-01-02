"use client";

import { motion } from "framer-motion";
import GradientCard from "../shared/GradientCard";

interface MethodologyStep {
  name: string;
  description: string;
}

interface MethodologyProps {
  title: string;
  steps: MethodologyStep[];
}

export default function Methodology({ title, steps }: MethodologyProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-100 mb-2">{title}</h2>
        <p className="text-slate-400">
          A proven approach combining statistical rigor, automation, and AWS best practices.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <GradientCard className="h-full" gradient="from-cyan-500 to-blue-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-[#0a1628] font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {step.name}
                  </h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </div>
            </GradientCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


