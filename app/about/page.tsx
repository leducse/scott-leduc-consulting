"use client";

import GradientCard from "@/components/shared/GradientCard";
import GradientButton from "@/components/shared/GradientButton";
import { SITE_CONFIG } from "@/lib/constants";
import { 
  BarChart3, 
  Rocket, 
  Building2, 
  TrendingUp,
  Layers,
  Brain,
  Server,
  LineChart,
  Shield,
  MessageSquare,
  Mail,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const capabilities = [
    { layer: "Strategy", description: "Business problems → analytical frameworks", icon: TrendingUp },
    { layer: "Statistics", description: "Causal inference with PSM, DiD, bootstrap", icon: BarChart3 },
    { layer: "Data Science", description: "ML models with 89%+ accuracy", icon: Brain },
    { layer: "Engineering", description: "Serverless AWS architectures", icon: Server },
    { layer: "Visualization", description: "Executive dashboards at scale", icon: LineChart },
    { layer: "Governance", description: "Data contracts & GenAI readiness", icon: Shield },
  ];

  const valueProps = [
    {
      title: "Statistical Rigor",
      description: "Propensity score matching, difference-in-differences, and causal inference that validates ROI with p < 0.05 significance—numbers executives can defend.",
      icon: BarChart3,
    },
    {
      title: "Production-Ready Solutions",
      description: "Strategy doesn't stop at the slide deck. Models get deployed, dashboards go live, pipelines run in production.",
      icon: Rocket,
    },
    {
      title: "Enterprise Scale Experience",
      description: "First SA operations member for AWS SLG & EDU, supporting 1,200+ builders across 18 global sub-regions serving 10,200+ customers.",
      icon: Building2,
    },
    {
      title: "Business-First Perspective",
      description: "MS in Business Analytics from William & Mary. Every analysis ties back to revenue, adoption, or operational impact.",
      icon: TrendingUp,
    },
  ];

  const openChatbot = () => {
    // Trigger chatbot open - dispatch custom event
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400 font-semibold">
            The Decision Layer
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Building the critical layer between raw data and confident business decisions.
          </h1>
        </section>

        {/* Value Proposition */}
        <section className="space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              Organizations don't struggle with data—they struggle with <span className="text-cyan-400 font-semibold">trust</span>. 
              Dashboards show numbers, but executives ask: <em>"Can we act on this?"</em>
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              The <span className="text-white font-semibold">Decision Layer</span> is the foundation that transforms 
              uncertainty into confidence: validated metrics, proven models, and governed data that leadership can trust. 
              Scott LeDuc builds that layer.
            </p>
          </div>
        </section>

        {/* What Scott Brings */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">What Scott Brings</h2>
            <p className="text-slate-300">
              A rare combination that spans the full analytics value chain—from executive strategy to production deployment.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {valueProps.map((prop, index) => {
              const IconComponent = prop.icon;
              const gradients = [
                "from-cyan-500 to-blue-500",
                "from-blue-500 to-violet-500",
                "from-violet-500 to-purple-500",
                "from-purple-500 to-cyan-500",
              ];
              return (
                <GradientCard key={prop.title} gradient={gradients[index]} hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-slate-200">{prop.description}</p>
                    </div>
                  </div>
                </GradientCard>
              );
            })}
          </div>
        </section>

        {/* The Full Stack */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">The Full Stack</h2>
            <p className="text-slate-300">
              Covering the complete analytics value chain.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {capabilities.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={cap.layer}
                  className="p-4 rounded-xl bg-[#111827] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">
                    {cap.layer}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {cap.description}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Ready to build your Decision Layer?
            </h2>
            <p className="text-slate-300">
              Three paths forward:
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Contact Scott */}
            <GradientCard gradient="from-cyan-500 to-blue-500" hover={true} className="text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">Start a Conversation</h3>
                <p className="text-slate-200 text-sm">
                  Discuss your analytics challenges and explore fit.
                </p>
                <GradientButton href="/contact" size="sm">
                  Contact Scott
                  <ArrowRight className="w-4 h-4 ml-2" />
                </GradientButton>
              </div>
            </GradientCard>

            {/* Chat Now */}
            <GradientCard gradient="from-blue-500 to-violet-500" hover={true} className="text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">Chat Now</h3>
                <p className="text-slate-200 text-sm">
                  Quick questions? The AI assistant can help.
                </p>
                <button
                  onClick={openChatbot}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-sm hover:from-blue-400 hover:to-violet-400 transition-all"
                >
                  Open Chat
                  <MessageSquare className="w-4 h-4 ml-2" />
                </button>
              </div>
            </GradientCard>

            {/* See the Work */}
            <GradientCard gradient="from-violet-500 to-purple-500" hover={true} className="text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">See the Work</h3>
                <p className="text-slate-200 text-sm">
                  Explore case studies and proven outcomes.
                </p>
                <GradientButton href="/case-studies" size="sm">
                  View Case Studies
                  <ArrowRight className="w-4 h-4 ml-2" />
                </GradientButton>
              </div>
            </GradientCard>
          </div>
        </section>

      </div>
    </div>
  );
}
