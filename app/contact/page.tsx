import ContactForm from "@/components/shared/ContactForm";
import GradientCard from "@/components/shared/GradientCard";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, Linkedin, Github, MapPin, Clock, Calendar, Users } from "lucide-react";

export const metadata = {
  title: "Contact | Decision Layer Analytics",
  description:
    "Request a consultation to discuss statistical analysis, machine learning, AWS architecture, and analytics engagements.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            Contact
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--foreground)]"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Let&apos;s Start a Conversation
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Tell me about your goals, stakeholders, and timeline. I&apos;ll follow up within 24-48 hours.
          </p>
        </section>

        {/* Main Content */}
        <section className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-6">
            <GradientCard gradient="from-cyan-500 to-blue-500" hover={false}>
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Get in Touch
              </h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-3 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    linkedin.com/in/{SITE_CONFIG.linkedin}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    github.com/{SITE_CONFIG.github}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[var(--text-muted)]">
                  <MapPin className="w-5 h-5" />
                  {SITE_CONFIG.location}
                </li>
              </ul>
            </GradientCard>

            <GradientCard gradient="from-violet-500 to-purple-500" hover={false}>
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Engagement Types
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[var(--text-muted)]">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[var(--foreground)]">Discovery</div>
                    <div className="text-sm">2-4 weeks</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-[var(--text-muted)]">
                  <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[var(--foreground)]">Implementation</div>
                    <div className="text-sm">8-16 weeks</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-[var(--text-muted)]">
                  <Users className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[var(--foreground)]">Fractional Leadership</div>
                    <div className="text-sm">3-12 months</div>
                  </div>
                </li>
              </ul>
            </GradientCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Request a Consultation
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
