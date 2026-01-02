import Hero from "@/components/layout/Hero";
import MetricCounter from "@/components/shared/MetricCounter";
import GradientCard from "@/components/shared/GradientCard";
import ServiceCard from "@/components/services/ServiceCard";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import ServiceCTA from "@/components/services/ServiceCTA";
import StatsVisualization from "@/components/shared/StatsVisualization";
import Testimonials from "@/components/shared/Testimonials";
import GradientButton from "@/components/shared/GradientButton";
import { CASE_STUDIES, KEY_METRICS, SERVICES, ORGANIZATIONS } from "@/lib/constants";
import { PROCESS_CONTENT } from "@/lib/content";
import { CheckCircle, Zap, Users, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

const differentiators = [
  {
    title: "Causal Validation",
    description:
      "Propensity score matching, difference-in-differences, and bootstrap validation ensure statistical confidence.",
    icon: CheckCircle,
  },
  {
    title: "Full-Stack Solutions",
    description:
      "From AWS serverless architectures to React/TypeScript frontends and Python ML pipelines, we deliver end-to-end outcomes.",
    icon: Zap,
  },
  {
    title: "Executive Storytelling",
    description:
      "Data narratives aligned to stakeholders with actionable recommendations and visual analytics.",
    icon: Users,
  },
];

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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ORGANIZATIONS.map((org) => (
              <div
                key={org.name}
                className="group relative p-6 rounded-xl bg-[#111827]/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative space-y-2 text-center">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-3">
                    <Building2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <p className="text-lg font-bold text-white">{org.shortName}</p>
                  <p className="text-xs text-slate-400">{org.role}</p>
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

        {/* Services */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Services
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Analytics, ML, AWS, and GenAI Governance
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
              Build rigorously validated solutions that translate into measurable revenue impact, improved win rates, and operational efficiency.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon as "BarChart3" | "Brain" | "Cloud" | "LineChart" | "Database" | "Sparkles"}
                gradient={service.gradient}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </section>

        {/* Why Partner */}
        <section className="space-y-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Why organizations partner with us
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {differentiators.map((item) => {
              const IconComponent = item.icon;
              return (
                <GradientCard
                  key={item.title}
                  gradient="from-cyan-500 to-blue-500"
                  hover={false}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--text-muted)]">{item.description}</p>
                    </div>
                  </div>
                </GradientCard>
              );
            })}
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
              Proven outcomes across data and cloud initiatives
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
              Structured methodology from discovery to optimization
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
            headline="Ready to turn data into measurable impact?"
            subheadline="Let's scope a roadmap that aligns to your revenue goals, timelines, and stakeholders."
          />
        </section>
      </div>
    </div>
  );
}
