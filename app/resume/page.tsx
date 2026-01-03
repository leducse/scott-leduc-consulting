"use client";

import { SITE_CONFIG, ORGANIZATIONS, CAREER_TIMELINE } from "@/lib/constants";
import { ABOUT_CONTENT } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Linkedin,
  Github,
  Mail,
  Calendar,
  Award,
  GraduationCap,
  ExternalLink,
  Printer,
} from "lucide-react";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 print:bg-white">
      {/* Print-friendly header bar (hidden on print) */}
      <div className="bg-slate-900 text-white py-3 px-4 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
            ← Back to Decision Layer Analytics
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12 print:py-8 print:px-4">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start gap-6 mb-10 pb-8 border-b border-slate-200">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-200 print:w-24 print:h-24">
              <Image
                src="/scott-profile.png"
                alt="Scott LeDuc"
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Name & Contact */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 print:text-3xl">
              Scott LeDuc
            </h1>
            <p className="text-xl text-cyan-600 font-medium mb-4 print:text-lg">
              Full-Stack Analytics & AI Practice Leader
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {SITE_CONFIG.location}
              </span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-1 hover:text-cyan-600 print:text-slate-600"
              >
                <Mail className="w-4 h-4" />
                {SITE_CONFIG.email}
              </a>
              <a
                href={SITE_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-600 print:text-slate-600"
              >
                <Linkedin className="w-4 h-4" />
                linkedin.com/in/scott-leduc
              </a>
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-600 print:text-slate-600"
              >
                <Github className="w-4 h-4" />
                github.com/leducse
              </a>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-500 pb-2">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Data Scientist, AI/ML Engineer, and Analytics Leader with 10+ years driving $17M+ in
            validated business impact. Expert in building the critical layer between raw data and
            confident business decisions—from statistical validation to production ML deployment.
            Combines deep technical expertise (Python, AWS, ML) with business acumen to deliver
            executive-ready insights and scalable data products.
          </p>
        </section>

        {/* Core Competencies */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-500 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              "Statistical Analysis & Causal Inference",
              "Machine Learning & AI/ML Engineering",
              "AWS Architecture (Certified ML Specialty)",
              "Business Intelligence & Visualization",
              "Data Engineering & ETL Pipelines",
              "GenAI & LLM Applications",
              "Executive Storytelling",
              "Team Leadership & Mentoring",
              "Agile / SAFe Methodologies",
            ].map((skill) => (
              <div
                key={skill}
                className="px-3 py-2 bg-slate-100 rounded text-slate-700 print:bg-slate-50"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-500 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {CAREER_TIMELINE.map((role) => (
              <div key={role.period} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{role.title}</h3>
                    <p className="text-cyan-600 font-medium">{role.company}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded print:bg-transparent">
                    <Calendar className="w-3.5 h-3.5" />
                    {role.period}
                  </span>
                </div>
                <ul className="space-y-1 text-slate-700 text-sm">
                  {role.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-500 pb-2">
            Organizations
          </h2>
          <div className="flex flex-wrap gap-2">
            {ORGANIZATIONS.map((org) => (
              <span
                key={org.name}
                className="px-3 py-1 bg-slate-100 rounded text-sm text-slate-700 print:bg-slate-50"
              >
                {org.name}
              </span>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-10 print:break-inside-avoid">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-500 pb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h2>
              <div>
                <p className="font-semibold text-slate-900">
                  {ABOUT_CONTENT.education.degree}
                </p>
                <p className="text-cyan-600">{ABOUT_CONTENT.education.school}</p>
                <p className="text-slate-500 text-sm">{ABOUT_CONTENT.education.period}</p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-500 pb-2 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications
              </h2>
              <ul className="space-y-2 text-sm">
                {ABOUT_CONTENT.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start justify-between gap-2">
                    <span className="text-slate-700">{cert.name}</span>
                    <span className="text-slate-500 flex-shrink-0">{cert.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer - Link to full site */}
        <footer className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500 print:hidden">
          <p>
            View case studies and detailed project work at{" "}
            <a
              href="https://www.decision-layer.com"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              decision-layer.com
            </a>
          </p>
        </footer>

        {/* Print footer */}
        <footer className="hidden print:block pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
          <p>
            Portfolio & Case Studies: decision-layer.com | Generated{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
