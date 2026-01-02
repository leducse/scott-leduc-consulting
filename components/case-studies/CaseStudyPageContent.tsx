"use client";

import { CASE_STUDIES } from "@/lib/constants";
import { CASE_STUDY_CONTENT } from "@/lib/content";
import CaseStudyHeader from "./CaseStudyHeader";
import ImpactMetrics from "./ImpactMetrics";
import Methodology from "./Methodology";
import StatsVisualization from "../shared/StatsVisualization";
import GradientCard from "../shared/GradientCard";
import ServiceCTA from "../services/ServiceCTA";

type CaseStudyKey = keyof typeof CASE_STUDY_CONTENT;

interface CaseStudyPageContentProps {
  caseStudyKey: CaseStudyKey;
}

// Consistent cyan/blue gradients that match the dark theme
const caseStudyGradients: Record<CaseStudyKey, string> = {
  "g3-analysis": "from-cyan-500 to-sky-500",
  "ml-recommender": "from-blue-500 to-cyan-500",
  "aws-dashboard": "from-sky-500 to-cyan-500",
  "activity-analysis": "from-teal-500 to-cyan-500",
  "data-audit-platform": "from-cyan-500 to-teal-500",
  "bi-regression-guardrails": "from-blue-500 to-sky-500",
};

export default function CaseStudyPageContent({
  caseStudyKey,
}: CaseStudyPageContentProps) {
  const meta = CASE_STUDIES.find((study) => study.id === caseStudyKey);
  const content = CASE_STUDY_CONTENT[caseStudyKey];

  if (!meta || !content) {
    return null;
  }

  const primaryMetric = meta.metrics[0]?.value
    ? `${meta.metrics[0].value} ${meta.metrics[0].label}`
    : undefined;

  const visualizationStats =
    ("scale" in content && content.scale
      ? content.scale.slice(0, 3).map((item, index) => {
          const match = item.match(/^([\w\d$,.+%<> ]+?)(?:\s+-\s+|\s)(.*)$/);
          const value = match ? match[1].trim() : item;
          const description = match ? match[2].trim() : item;
          return {
            label: `Detail ${index + 1}`,
            value,
            description,
          };
        })
      : []) ?? [];

  return (
    <div className="space-y-16">
      <CaseStudyHeader
        title={meta.title}
        tagline={meta.tagline}
        summary={content.solution}
        primaryMetric={primaryMetric}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section className="grid gap-6 md:grid-cols-2">
          <GradientCard gradient={caseStudyGradients[caseStudyKey]} hover={false}>
            <h2 className="text-2xl font-semibold text-white mb-3">Challenge</h2>
            <p className="text-slate-100 leading-relaxed">{content.problem}</p>
          </GradientCard>
          <GradientCard gradient="from-blue-500 to-cyan-500" hover={false}>
            <h2 className="text-2xl font-semibold text-white mb-3">Solution</h2>
            <p className="text-slate-100 leading-relaxed">{content.solution}</p>
          </GradientCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Impact Metrics</h2>
          <ImpactMetrics metrics={meta.metrics} gradient={caseStudyGradients[caseStudyKey]} />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <GradientCard gradient="from-cyan-500 to-teal-500" hover={false}>
            <h3 className="text-xl font-semibold text-white mb-3">Results</h3>
            <ul className="space-y-3 text-slate-100">
              {content.results.map((result) => (
                <li key={result}>• {result}</li>
              ))}
            </ul>
          </GradientCard>

          <GradientCard gradient="from-blue-500 to-indigo-500" hover={false}>
            <h3 className="text-xl font-semibold text-white mb-3">Business Impact</h3>
            <p className="text-slate-100 leading-relaxed">{content.impact}</p>
          </GradientCard>
        </section>

        {content.methodology && (
          <Methodology title={content.methodology.title} steps={content.methodology.steps} />
        )}

        {visualizationStats.length > 0 && (
          <StatsVisualization
            title="Scale & Scope"
            stats={visualizationStats}
            orientation="vertical"
          />
        )}

        {"features" in content && content.features && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Feature Importance</h2>
            <GradientCard gradient="from-cyan-500 to-blue-500" hover={false}>
              <ul className="space-y-3 text-slate-100">
                {content.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </GradientCard>
          </section>
        )}

        {"technologies" in content && content.technologies && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Technology Stack</h2>
            <GradientCard gradient="from-sky-500 to-cyan-500" hover={false}>
              <ul className="flex flex-wrap gap-3">
                {content.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1 rounded-full bg-[#0a1628]/70 border border-cyan-500/30 text-sm font-medium text-white"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </GradientCard>
          </section>
        )}

        {"scenarios" in content && content.scenarios && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Scenario Playbooks</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {content.scenarios.map((scenario) => (
                <GradientCard
                  key={scenario.name}
                  gradient="from-teal-500 to-cyan-500"
                  hover={false}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {scenario.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wide text-cyan-300 mb-2">
                    Win Rate: {scenario.winRate}
                  </p>
                  <p className="text-slate-100 text-sm leading-relaxed">
                    {scenario.sequence}
                  </p>
                </GradientCard>
              ))}
            </div>
          </section>
        )}

        <section>
          <ServiceCTA
            headline="Need a similar solution?"
            subheadline="Let’s replicate this success within your organization with a tailored engagement plan."
          />
        </section>
      </div>
    </div>
  );
}


