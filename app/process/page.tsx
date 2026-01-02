import GradientCard from "@/components/shared/GradientCard";
import ServiceCTA from "@/components/services/ServiceCTA";
import { PROCESS_CONTENT } from "@/lib/content";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Process | Decision Layer Analytics",
  description:
    "Learn about our proven 5-phase consulting methodology for delivering measurable business impact.",
};

const phaseGradients = [
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-indigo-500 to-violet-500",
  "from-violet-500 to-purple-500",
  "from-purple-500 to-fuchsia-500",
];

export default function ProcessPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Header */}
        <section className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            Process
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--foreground)]"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            {PROCESS_CONTENT.title}
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
            {PROCESS_CONTENT.subtitle}
          </p>
        </section>

        {/* Phases */}
        <section className="space-y-6">
          {PROCESS_CONTENT.phases.map((phase, index) => (
            <GradientCard
              key={phase.number}
              gradient={phaseGradients[index] || phaseGradients[0]}
              className="relative overflow-hidden"
              hover={false}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Phase number and title */}
                <div className="md:w-1/4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-4xl font-black text-cyan-400/50"
                      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                    >
                      {`0${phase.number}`}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--foreground)] mt-2">
                    {phase.title}
                  </h2>
                </div>

                {/* Description and deliverables */}
                <div className="md:w-3/4 space-y-4">
                  <p className="text-[var(--text-muted)]">{phase.description}</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {phase.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-2 text-[var(--text-muted)]"
                      >
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GradientCard>
          ))}
        </section>

        {/* CTA */}
        <section>
          <ServiceCTA
            headline="Align on the right next step"
            subheadline="We'll help scope discovery, design, and delivery phases to match your timeline and success metrics."
          />
        </section>
      </div>
    </div>
  );
}
