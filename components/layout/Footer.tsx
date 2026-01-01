"use client";

import Link from "next/link";
import { Mail, MapPin, Linkedin, Github, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-[var(--text-muted)] max-w-md mb-4">
              Transforming complex data challenges into measurable business outcomes through rigorous analytics, machine learning, and cloud architecture.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://linkedin.com/in/${SITE_CONFIG.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-card hover:border-cyan-500/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[var(--text-muted)]" />
              </a>
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-card hover:border-cyan-500/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services", "Case Studies", "Process", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Profile
                </a>
              </li>
              <li className="flex items-center gap-2 text-[var(--text-muted)]">
                <MapPin className="w-4 h-4" />
                {SITE_CONFIG.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--card-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-light)]">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-light)]">
            <span>Built with</span>
            <span className="text-cyan-400">Next.js</span>
            <span>&</span>
            <span className="text-violet-400">AWS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
