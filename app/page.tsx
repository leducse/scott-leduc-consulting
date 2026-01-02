import Hero from "@/components/layout/Hero";
import MetricCounter from "@/components/shared/MetricCounter";
import GradientCard from "@/components/shared/GradientCard";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import ServiceCTA from "@/components/services/ServiceCTA";
import StatsVisualization from "@/components/shared/StatsVisualization";
import Testimonials from "@/components/shared/Testimonials";
import GradientButton from "@/components/shared/GradientButton";
import { CASE_STUDIES, KEY_METRICS, ORGANIZATIONS } from "@/lib/constants";
import { PROCESS_CONTENT, SOLUTION_CARDS } from "@/lib/content";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredCaseStudies = CASE_STUDIES.slice(0, 3);
  const processHighlights = PROCESS_CONTENT.phases.slice(0, 3).map((phase) => ({
    label: phase.title,
    value: `Phase ${phase.number}`,
    description: phase.description,
  }));

  return (
    <div className="bg-[var(--background)]">
      <Hero />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
        {/* Key Metrics */}
        <section className="grid gap-6 md:grid-cols-4">
          {KEY_METRICS.map((metric) => (
            <MetricCounter
              key={metric.label}
              value={metric.value}
              label={metric.label}
              description={metric.description}
            />
          ))}
        </section>

        {/* Building the Decision Layer - Problem → Solution Cards */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Building the Decision Layer
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              From Data Chaos to Confident Action
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
              Every engagement addresses a gap between raw data and decisions leadership can trust.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_CARDS.map((card) => (
              <div
                key={card.id}
                className="group relative p-6 rounded-xl bg-[#111827]/70 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  {card.title}
                </h3>
                
                {/* Problem */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">The Problem</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    "{card.problem}"
                  </p>
                </div>
                
                {/* Solution */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">The Solution</p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {card.solution}
                  </p>
                </div>
                
                {/* Proof */}
                <div className="mb-6 flex-grow">
                  <p className="text-xs uppercase tracking-wider text-cyan-400 mb-1">The Proof</p>
                  <p className="text-sm text-cyan-300 font-medium">
                    {card.proof}
                  </p>
                </div>
                
                {/* Link to case study */}
                <Link
                  href={`/case-studies/${card.caseStudySlug}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group/link"
                >
                  View case study
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations Worked With */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Experience
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Organizations Partnered With
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {ORGANIZATIONS.map((org) => (
              <div
                key={org.name}
                className="group relative px-6 py-4 rounded-xl bg-[#111827]/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative text-center">
                  <p className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">{org.shortName}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              View full background
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Featured Case Studies */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Case Studies
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Proven Outcomes with Measurable Impact
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCaseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                title={caseStudy.title}
                tagline={caseStudy.tagline}
                metrics={caseStudy.metrics}
                gradient={caseStudy.gradient}
                href={`/case-studies/${caseStudy.slug}`}
              />
            ))}
          </div>
          <div className="text-center">
            <GradientButton href="/case-studies" variant="secondary" size="lg">
              View All Case Studies
              <ArrowRight className="w-4 h-4 ml-2" />
            </GradientButton>
          </div>
        </section>

        {/* Engagement Approach */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Engagement Approach
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Structured Methodology from Discovery to Optimization
            </h2>
          </div>
          <StatsVisualization
            title="First three phases"
            stats={processHighlights}
            orientation="horizontal"
          />
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA */}
        <section>
          <ServiceCTA
            headline="Ready to build your Decision Layer?"
            subheadline="Let's scope a roadmap that turns your data into decisions leadership can trust."
          />
        </section>
      </div>
    </div>
  );
}
