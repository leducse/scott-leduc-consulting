import Link from "next/link";
import { ArrowRight, Brain, LineChart, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps",
  description: "Interactive Decision Layer apps and AI-native analytics tools.",
  alternates: {
    canonical: "/apps",
  },
};

const apps = [
  {
    title: "Virtual Data Scientist",
    href: "/apps/virtual-data-scientist",
    description:
      "A native LLM chat surface for choosing analytical techniques, running light analysis, and handing deeper work to AgentCore.",
    icon: Brain,
    status: "AgentCore live demo",
  },
  {
    title: "FutureWealth",
    href: "/futurewealth",
    description:
      "A scenario-planning app that turns financial assumptions into inspectable retirement and savings paths.",
    icon: LineChart,
    status: "Live prototype",
  },
];

export default function AppsPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-white/10 bg-[#07111f] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Apps</p>
          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Interactive analytics tools</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              Small, usable applications that show how Decision Layer turns data, models, and AI
              workflows into governed decision products.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.href}
                href={app.href}
                className="group rounded-xl border border-white/10 bg-[#111827]/70 p-6 transition-all hover:border-cyan-500/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                    {app.status}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{app.title}</h2>
                <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-slate-400">{app.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  Open app
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <p className="text-sm leading-relaxed text-cyan-50">
              Public apps are demo-safe. Production data connections, write actions, and AWS
              deployment changes require explicit approval and separate environment configuration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
