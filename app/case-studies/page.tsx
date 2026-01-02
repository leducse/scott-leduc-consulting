import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import ServiceCTA from "@/components/services/ServiceCTA";
import { CASE_STUDIES } from "@/lib/constants";

export const metadata = {
  title: "Case Studies | Decision Layer Analytics",
  description:
    "Explore case studies showcasing statistical analysis, machine learning, AWS architecture, and analytics consulting outcomes.",
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Header */}
        <section className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            Case Studies
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--foreground)]"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Strategy Transformed into Measurable Results
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
            Each engagement combines statistical rigor, machine learning expertise, and AWS-native solutions to deliver proven business impact.
          </p>
        </section>

        {/* Case Studies Grid */}
        <section className="grid gap-8 md:grid-cols-2">
          {CASE_STUDIES.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.id}
              title={caseStudy.title}
              tagline={caseStudy.tagline}
              metrics={caseStudy.metrics}
              gradient={caseStudy.gradient}
              href={`/case-studies/${caseStudy.slug}`}
            />
          ))}
        </section>

        {/* CTA */}
        <section>
          <ServiceCTA
            headline="Interested in results like these?"
            subheadline="Tell us about your goals and we'll design an engagement plan to replicate this impact."
          />
        </section>
      </div>
    </div>
  );
}
