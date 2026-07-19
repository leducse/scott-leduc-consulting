import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Cloud,
  Github,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import { CASE_STUDIES, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio Lab",
  description:
    "A curated proof hub for Scott LeDuc's analytics, AI, BI, and AWS portfolio projects.",
  alternates: {
    canonical: "/portfolio",
  },
};

const roleFits = [
  {
    title: "Analytics & BI Leader",
    description: "Executive dashboards, trusted metrics, BI guardrails, and decision support.",
    icon: LineChart,
    proof: ["22K+ annual dashboard views", "BI regression guardrails", "Metric health and quality scoring"],
  },
  {
    title: "AWS & AI Builder",
    description: "Serverless applications, AgentCore patterns, GenAI workflows, and cloud-native prototypes.",
    icon: Cloud,
    proof: ["Next.js + AWS full-stack platform", "Bedrock/AgentCore integration", "Lambda, API Gateway, S3, CloudWatch"],
  },
  {
    title: "Data Science & ML",
    description: "Predictive models, causal inference, evaluation gates, and reproducible analysis.",
    icon: Brain,
    proof: ["89.1% XGBoost model accuracy", "Propensity score matching", "Difference-in-differences validation"],
  },
  {
    title: "Decision Systems",
    description: "Projects that turn ambiguous business questions into measurable, governed workflows.",
    icon: BarChart3,
    proof: ["Program impact measurement", "Governed query access", "Human-reviewable architecture"],
  },
];

const featured = CASE_STUDIES.filter((study) =>
  [
    "g3-analysis",
    "aws-dashboard",
    "bi-regression-guardrails",
    "recallgraph-ai",
    "mcp-query-governance",
    "ai-coding-spillover",
    "constrained-transformer-adaptation",
    "governed-model-lifecycle",
  ].includes(study.id)
);

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-white/10 bg-[#07111f] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Portfolio Lab
          </p>
          <div className="mt-4 max-w-4xl">
            <h1
              className="text-4xl font-bold text-white md:text-6xl"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Proof-of-work for analytics, AI, BI, and AWS decision systems.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Decision Layer Analytics is my personal portfolio and applied analytics lab.
              It is structured like a consulting practice to show how I frame business
              problems, design systems, and communicate outcomes. I am not currently
              taking consulting clients, but may open limited advisory or project-based
              work in the future.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              View case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-500/40"
            >
              <Github className="h-4 w-4" />
              GitHub profile
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {roleFits.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.title} className="rounded-xl border border-white/10 bg-[#111827]/70 p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{role.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{role.description}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {role.proof.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-300">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Selected Proof
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">Projects worth opening first</h2>
          </div>
          <Link href="/apps" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
            Interactive apps
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((study) => (
            <div key={study.id} className="rounded-xl border border-white/10 bg-[#111827]/70 p-6">
              <div className={`mb-5 h-1 rounded-full bg-gradient-to-r ${study.gradient}`} />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {study.category === "portfolio" ? "Portfolio project" : "Professional proof point"}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{study.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{study.tagline}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {study.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-lg font-bold text-cyan-300">{metric.value}</div>
                    <div className="mt-1 text-xs text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
                >
                  Case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {"githubRepo" in study && study.githubRepo ? (
                  <a
                    href={study.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    Repo
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
