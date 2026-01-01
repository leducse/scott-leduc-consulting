import Hero from "@/components/layout/Hero";
import MetricCounter from "@/components/shared/MetricCounter";
import GradientCard from "@/components/shared/GradientCard";
import ServiceCard from "@/components/services/ServiceCard";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import ServiceCTA from "@/components/services/ServiceCTA";
import StatsVisualization from "@/components/shared/StatsVisualization";
import { CASE_STUDIES, KEY_METRICS, SERVICES } from "@/lib/constants";
import { PROCESS_CONTENT } from "@/lib/content";
import { CheckCircle, Zap, Users } from "lucide-react";

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
