import { CASE_STUDIES } from "@/lib/constants";
import { CASE_STUDY_CONTENT } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MonitorCheck } from "lucide-react";
import CaseStudyHeader from "./CaseStudyHeader";
import ImpactMetrics from "./ImpactMetrics";
import Methodology from "./Methodology";
import StatsVisualization from "../shared/StatsVisualization";
import GradientCard from "../shared/GradientCard";
import ServiceCTA from "../services/ServiceCTA";
import ArchitectureDiagram, {
  type ArchitectureDiagramKey,
} from "./ArchitectureDiagram";

type CaseStudyKey = keyof typeof CASE_STUDY_CONTENT;

const ARCHITECTURE_DIAGRAM_KEYS = [
  "ai-coding-spillover",
  "mcp-query-governance",
  "recallgraph-ai",
  "tradingview-webhook-aws-poc",
  "tableau-knowledge-platform",
  "tableau-quicksight-migration",
  "constrained-transformer-adaptation",
  "governed-model-lifecycle",
] as const;

function isArchitectureDiagramKey(
  key: CaseStudyKey
): key is ArchitectureDiagramKey {
  return (ARCHITECTURE_DIAGRAM_KEYS as readonly string[]).includes(key);
}

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
  "consulting-platform": "from-cyan-500 to-violet-500",
  "ai-coding-spillover": "from-violet-500 to-indigo-500",
  "mcp-query-governance": "from-amber-500 to-orange-500",
  "recallgraph-ai": "from-cyan-500 to-violet-500",
  "tradingview-webhook-aws-poc": "from-emerald-500 to-sky-500",
  "tableau-knowledge-platform": "from-emerald-500 to-cyan-500",
  "tableau-quicksight-migration": "from-sky-500 to-blue-500",
  "constrained-transformer-adaptation": "from-violet-500 to-cyan-500",
  "governed-model-lifecycle": "from-emerald-500 to-cyan-500",
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

  // Meaningful labels for scale/scope stats based on the case study
  const scaleLabels: Record<CaseStudyKey, string[]> = {
    "g3-analysis": ["Data Volume", "Opportunities", "Engagement Types"],
    "ml-recommender": ["Features Engineered", "Models Trained", "Validation Folds"],
    "aws-dashboard": ["Active Users", "Response Time", "Records Processed"],
    "activity-analysis": ["Scenarios Analyzed", "Activities Tracked", "Win Rate Impact"],
    "data-audit-platform": ["Dashboards Audited", "Quality Checks", "Lineage Tracked"],
    "bi-regression-guardrails": ["Regressions Caught", "Dashboards Protected", "CI/CD Integration"],
    "consulting-platform": ["Deploy Time", "Architecture", "AI Agents"],
    "ai-coding-spillover": ["Panel Scale", "Methods", "Reproducibility"],
    "mcp-query-governance": ["Principals Scored", "Detection", "Governance Path"],
    "recallgraph-ai": ["Validation", "Source Coverage", "Operational Gates"],
    "tradingview-webhook-aws-poc": ["Validation", "AWS Components", "Broker Mode"],
    "tableau-knowledge-platform": ["Validation", "Doc Passes", "AWS Path"],
    "tableau-quicksight-migration": ["Checks", "Parity", "Deploy Mode"],
    "constrained-transformer-adaptation": ["Scenarios", "Validation", "Execution"],
    "governed-model-lifecycle": ["Dataset", "Holdout", "Lifecycle"],
  };

  const visualizationStats =
    ("scale" in content && content.scale
      ? content.scale.slice(0, 3).map((item, index) => {
          const match = item.match(/^([\w\d$,.+%<> ]+?)(?:\s+-\s+|\s)(.*)$/);
          const value = match ? match[1].trim() : item;
          const description = match ? match[2].trim() : item;
          const labels = scaleLabels[caseStudyKey] || ["Scope", "Scale", "Impact"];
          return {
            label: labels[index] || `Metric ${index + 1}`,
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
        githubRepo={"githubRepo" in meta ? meta.githubRepo : undefined}
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

        {isArchitectureDiagramKey(caseStudyKey) && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Architecture</h2>
            <ArchitectureDiagram diagram={caseStudyKey} title={meta.title} />
            {"portfolioNote" in content && content.portfolioNote && (
              <p className="text-sm text-slate-400 leading-relaxed">{content.portfolioNote}</p>
            )}
          </section>
        )}

        {caseStudyKey === "recallgraph-ai" && (
          <section className="rounded-lg border border-cyan-500/25 bg-[#0c1726] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <MonitorCheck className="h-5 w-5 text-cyan-300" />
                  Interactive Workbench
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Explore the fixture-backed analyst console with risk filtering, cited evidence,
                  agent traces, eval gates, and a controlled natural-language panel.
                </p>
              </div>
              <Link
                href="/apps/recallgraph-ai"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 text-sm font-semibold text-[#07111f] transition-colors hover:bg-cyan-300"
              >
                Open Workbench
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {caseStudyKey === "governed-model-lifecycle" && (
          <section className="rounded-lg border border-cyan-500/25 bg-[#0c1726] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <MonitorCheck className="h-5 w-5 text-cyan-300" />
                  Virtual Data Scientist
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  See how the governed model lifecycle fits inside the broader agentic analytics workbench without moving runtime code into the portfolio site.
                </p>
              </div>
              <Link
                href="/apps/virtual-data-scientist"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 text-sm font-semibold text-[#07111f] transition-colors hover:bg-cyan-300"
              >
                Open Project Overview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {content.methodology && (
          <Methodology title={content.methodology.title} steps={content.methodology.steps} />
        )}

        {"screenshots" in content && content.screenshots && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Screenshots</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {content.screenshots.map((screenshot) => (
                <figure
                  key={screenshot.src}
                  className="overflow-hidden rounded-xl border border-cyan-500/25 bg-slate-900/90 shadow-lg shadow-cyan-500/5"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1400}
                    height={860}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-auto w-full bg-slate-950"
                  />
                  <figcaption className="border-t border-cyan-500/20 px-4 py-3 text-sm leading-relaxed text-slate-300">
                    {screenshot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
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
            subheadline="Let's replicate this success within your organization with a tailored engagement plan."
          />
        </section>
      </div>
    </div>
  );
}
