"use client";

import GradientCard from "@/components/shared/GradientCard";
import GradientButton from "@/components/shared/GradientButton";
import { SITE_CONFIG, ORGANIZATIONS, CAREER_TIMELINE, CASE_STUDIES } from "@/lib/constants";
import { ABOUT_CONTENT } from "@/lib/content";
import { 
  BarChart3, 
  Rocket, 
  Building2, 
  TrendingUp,
  Brain,
  Server,
  LineChart,
  Shield,
  MessageSquare,
  Mail,
  ArrowRight,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  ExternalLink,
  MapPin,
  Linkedin,
  Github
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const capabilities = [
    { layer: "Strategy", description: "Business problems → analytical frameworks", icon: TrendingUp },
    { layer: "Statistics", description: "Causal inference with PSM, DiD, bootstrap", icon: BarChart3 },
    { layer: "Data Science", description: "ML models with 89%+ accuracy", icon: Brain },
    { layer: "Engineering", description: "Serverless AWS architectures", icon: Server },
    { layer: "Visualization", description: "Executive dashboards at scale", icon: LineChart },
    { layer: "Governance", description: "Data contracts & GenAI readiness", icon: Shield },
  ];

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  // Featured case studies for recruiter reference
  const featuredWork = CASE_STUDIES.slice(0, 3);

  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Hero Section - Personal Introduction */}
        <section className="relative">
          {/* Background glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          
          <div className="relative text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400 font-semibold">
              About Scott
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Full-Stack Analytics & AI Practice Leader
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Building the critical layer between raw data and confident business decisions—
              from statistical validation to production deployment.
            </p>
            
            {/* Quick contact info */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm">
              <span className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {SITE_CONFIG.location}
              </span>
              <a 
                href={SITE_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* The Pitch - Why Scott */}
        <section className="space-y-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 border border-cyan-500/20">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">
                What Makes This Background Unique
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Most data professionals specialize. Data scientists build models but struggle with production deployment. 
                  BI developers create dashboards but lack statistical rigor. Cloud architects design infrastructure but 
                  don't speak the language of business outcomes.
                </p>
                <p>
                  <span className="text-white font-medium">Scott bridges all three.</span> With an MS in Business Analytics, 
                  AWS ML certifications, and hands-on experience deploying solutions used by 1,200+ professionals, 
                  he delivers end-to-end: from whiteboard strategy sessions to Lambda functions in production.
                </p>
                <p>
                  The result? Validated impact you can defend. Not "we think it worked" but{" "}
                  <span className="text-cyan-400">"$706K annual revenue with 6:1 ROI, p &lt; 0.05."</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Experience
            </p>
            <h2 className="text-3xl font-bold text-white">Career Journey</h2>
          </div>
          
          <div className="space-y-6">
            {CAREER_TIMELINE.map((role, index) => (
              <div
                key={role.period}
                className="relative pl-8 border-l-2 border-cyan-500/30"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a1628] border-2 border-cyan-500" />
                
                <div className="p-6 rounded-xl bg-[#111827]/70 border border-white/5 hover:border-cyan-500/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{role.title}</h3>
                      <p className="text-cyan-400 font-medium">{role.company}</p>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-slate-400 bg-[#0a1628] px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {role.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {role.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations Worked With */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Organizations
            </p>
            <h2 className="text-3xl font-bold text-white">Where I've Made Impact</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {ORGANIZATIONS.map((org) => (
              <div
                key={org.name}
                className="group px-5 py-3 rounded-lg bg-[#111827]/50 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <p className="text-base font-medium text-white group-hover:text-cyan-400 transition-colors">
                  {org.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Capabilities */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Capabilities
            </p>
            <h2 className="text-3xl font-bold text-white">The Full Stack</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              End-to-end analytics expertise from strategy through production deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {capabilities.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={cap.layer}
                  className="p-4 rounded-xl bg-[#111827] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-center group"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">
                    {cap.layer}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {cap.description}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications & Education */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Credentials
            </p>
            <h2 className="text-3xl font-bold text-white">Education & Certifications</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="p-6 rounded-xl bg-[#111827]/70 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium">{ABOUT_CONTENT.education.degree}</p>
                  <p className="text-cyan-400 text-sm">{ABOUT_CONTENT.education.school}</p>
                  <p className="text-slate-400 text-sm">{ABOUT_CONTENT.education.period}</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-sm text-slate-400 mb-2">Key Coursework:</p>
                  <ul className="space-y-1">
                    {ABOUT_CONTENT.education.coursework.slice(0, 4).map((course, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-violet-400 mt-2" />
                        {course.split(':')[0]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="p-6 rounded-xl bg-[#111827]/70 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Certifications</h3>
              </div>
              <ul className="space-y-4">
                {ABOUT_CONTENT.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start justify-between gap-4">
                    <span className="text-slate-300 text-sm">{cert.name}</span>
                    <span className="flex-shrink-0 text-xs text-slate-500 bg-[#0a1628] px-2 py-1 rounded">
                      {cert.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Work - Links to Case Studies */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Sample Work
            </p>
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <p className="text-slate-300">
              Detailed case studies with methodology, results, and business impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWork.map((study) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.slug}`}
                className="group p-6 rounded-xl bg-[#111827]/50 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{study.tagline}</p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                  View case study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <GradientButton href="/case-studies" variant="secondary">
              View All Case Studies
              <ArrowRight className="w-4 h-4 ml-2" />
            </GradientButton>
          </div>
        </section>

        {/* Contact CTA - For Recruiters */}
        <section className="space-y-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/20">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white">
                Let's Connect
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Whether you're exploring a potential collaboration, discussing an opportunity, 
                or just want to talk data—I'd enjoy the conversation.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <GradientButton href="/contact" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </GradientButton>
                
                <button
                  onClick={openChatbot}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-500/30 text-white font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat with AI Assistant
                </button>
                
                <a
                  href={SITE_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-slate-300 font-medium hover:border-white/20 hover:text-white transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
