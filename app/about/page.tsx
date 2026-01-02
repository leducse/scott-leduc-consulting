import GradientCard from "@/components/shared/GradientCard";
import StatsVisualization from "@/components/shared/StatsVisualization";
import ServiceCTA from "@/components/services/ServiceCTA";
import Testimonials from "@/components/shared/Testimonials";
import { ABOUT_CONTENT, COMPETITIVE_ADVANTAGE } from "@/lib/content";
import { KEY_METRICS, SITE_CONFIG } from "@/lib/constants";
import { Award, GraduationCap, Briefcase, Shield, CheckCircle, Layers, Target, Zap, TrendingUp } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About | Scott LeDuc Consulting",
  description:
    "Learn about Scott LeDuc's experience in statistical analysis, machine learning, AWS architecture, and data-driven consulting.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Header with Headshot */}
        <section className="grid md:grid-cols-[280px_1fr] gap-12 items-center">
          {/* Headshot */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-sm opacity-50" />
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-cyan-400/30">
                <Image
                  src={ABOUT_CONTENT.headshot}
                  alt={SITE_CONFIG.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Header Text */}
          <div className="text-center md:text-left space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              About
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Data-Driven Consulting, Proven Results
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl">
              {ABOUT_CONTENT.summary}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section>
          <StatsVisualization
            title="Validated Track Record"
            stats={KEY_METRICS.map((metric) => ({
              label: metric.label,
              value: metric.value,
              description: metric.description,
            }))}
          />
        </section>

        {/* Competitive Advantage */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              What Sets Me Apart
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              {COMPETITIVE_ADVANTAGE.headline}
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {COMPETITIVE_ADVANTAGE.subheadline}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {COMPETITIVE_ADVANTAGE.capabilities.map((cap) => (
              <div
                key={cap.layer}
                className="p-4 rounded-xl bg-[#111827] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  {cap.layer}
                </div>
                <div className="text-slate-200 text-sm">
                  {cap.description}
                </div>
              </div>
            ))}
          </div>

          {/* Value Props */}
          <div className="grid gap-6 md:grid-cols-2">
            {COMPETITIVE_ADVANTAGE.valueProps.map((prop, index) => {
              const icons = [Target, Zap, Layers, TrendingUp];
              const IconComponent = icons[index];
              const gradients = [
                "from-cyan-500 to-blue-500",
                "from-blue-500 to-violet-500",
                "from-violet-500 to-purple-500",
                "from-purple-500 to-pink-500",
              ];
              return (
                <GradientCard key={prop.title} gradient={gradients[index]} hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-slate-200">{prop.description}</p>
                    </div>
                  </div>
                </GradientCard>
              );
            })}
          </div>

          {/* Why This is Rare */}
          <GradientCard gradient="from-slate-600 to-slate-700" hover={false}>
            <h3 className="text-xl font-semibold text-white mb-4">
              {COMPETITIVE_ADVANTAGE.whyRare.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-cyan-400 font-semibold">Role</th>
                    <th className="text-left py-2 px-3 text-slate-300 font-semibold">What They Do</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-semibold">What They Can&apos;t Do</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITIVE_ADVANTAGE.whyRare.comparisons.map((row) => (
                    <tr key={row.type} className="border-b border-white/5">
                      <td className="py-2 px-3 text-white font-medium">{row.type}</td>
                      <td className="py-2 px-3 text-slate-300">{row.does}</td>
                      <td className="py-2 px-3 text-slate-400">{row.cantDo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-cyan-400 font-semibold text-center">
              {COMPETITIVE_ADVANTAGE.whyRare.conclusion}
            </p>
          </GradientCard>
        </section>

        {/* Achievements & Expertise */}
        <section className="grid gap-6 md:grid-cols-2">
          <GradientCard gradient="from-cyan-500 to-blue-500" hover={false}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Signature Achievements
                </h2>
                <ul className="space-y-3 text-[var(--text-muted)]">
                  {ABOUT_CONTENT.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GradientCard>

          <GradientCard gradient="from-violet-500 to-purple-500" hover={false}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Areas of Expertise
                </h2>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  {ABOUT_CONTENT.expertise.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-1" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GradientCard>
        </section>

        {/* Education & Certifications */}
        <section className="grid gap-6 md:grid-cols-2">
          <GradientCard gradient="from-blue-500 to-indigo-500" hover={false}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Education
                </h2>
                <div className="mb-4">
                  <div className="text-lg font-semibold text-[var(--foreground)]">
                    {ABOUT_CONTENT.education.degree}
                  </div>
                  <div className="text-[var(--text-muted)]">
                    {ABOUT_CONTENT.education.school}
                  </div>
                  <div className="text-sm text-[var(--text-light)]">
                    {ABOUT_CONTENT.education.period}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  Relevant Coursework
                </h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  {ABOUT_CONTENT.education.coursework.map((course) => (
                    <li key={course}>• {course}</li>
                  ))}
                </ul>
              </div>
            </div>
          </GradientCard>

          <GradientCard gradient="from-emerald-500 to-teal-500" hover={false}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                  Certifications
                </h2>
                <ul className="space-y-3">
                  {ABOUT_CONTENT.certifications.map((cert) => (
                    <li
                      key={cert.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)]/50"
                    >
                      <span className="text-[var(--foreground)]">{cert.name}</span>
                      <span className="text-sm text-cyan-400 font-medium">
                        {cert.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GradientCard>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA */}
        <section>
          <ServiceCTA
            headline={`Work with ${SITE_CONFIG.name}`}
            subheadline="Let's connect to discuss how we can apply this experience to your organization's next strategic initiative."
          />
        </section>
      </div>
    </div>
  );
}
