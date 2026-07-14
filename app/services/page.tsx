import ServiceCard from "@/components/services/ServiceCard";
import ServiceCTA from "@/components/services/ServiceCTA";
import GradientCard from "@/components/shared/GradientCard";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { CheckCircle, Layers } from "lucide-react";

export const metadata = {
  title: "Capabilities | Decision Layer Analytics",
  description:
    "Applied analytics, machine learning, AWS architecture, business intelligence, and data engineering capabilities.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Header */}
        <section className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            Capabilities
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--foreground)]"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Capability Areas Demonstrated Through Projects
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
            {SITE_CONFIG.name} is currently a personal portfolio lab. These practice areas
            show how I frame business problems, build systems, and communicate measurable
            outcomes through prior professional work and portfolio projects.
          </p>
        </section>

        {/* Services Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </section>

        {/* Info Cards */}
        <section className="grid gap-8 md:grid-cols-2">
          <GradientCard gradient="from-cyan-500 to-blue-500" hover={false}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
                  What makes this work credible?
                </h2>
                <ul className="space-y-3 text-[var(--text-muted)]">
                  <li>• Proven methodologies applied to multi-million dollar programs</li>
                  <li>• Cross-functional expertise spanning statistics, ML/AI, and AWS architecture</li>
                  <li>• Executive-ready storytelling grounded in data and causal inference</li>
                  <li>• Repeatable frameworks, documentation, and demo-safe implementation artifacts</li>
                </ul>
              </div>
            </div>
          </GradientCard>
          
          <GradientCard gradient="from-violet-500 to-purple-500" hover={false}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
                  Future advisory paths
                </h2>
                <ul className="space-y-3 text-[var(--text-muted)]">
                  <li>• Portfolio and hiring conversations</li>
                  <li>• Collaboration around analytics, AI, and AWS projects</li>
                  <li>• Limited advisory or project-based work in the future</li>
                  <li>• Talks, workshops, and playbook creation when appropriate</li>
                </ul>
              </div>
            </div>
          </GradientCard>
        </section>

        {/* CTA */}
        <section>
          <ServiceCTA
            headline="Want the curated version?"
            subheadline="Start with the portfolio hub for selected case studies, repos, apps, and architecture notes."
            primaryHref="/portfolio"
            primaryLabel="Open Portfolio Hub"
            secondaryHref="/apps"
            secondaryLabel="View Interactive Apps"
          />
        </section>
      </div>
    </div>
  );
}
