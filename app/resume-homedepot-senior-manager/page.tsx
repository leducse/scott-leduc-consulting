"use client";

import { SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  Calendar,
  Award,
  GraduationCap,
  Printer,
  MessageCircle,
} from "lucide-react";

export default function ResumeHomeDepotSeniorManager() {
  const handlePrint = () => {
    window.print();
  };

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("openChatbot"));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 print:bg-white">
      {/* Print-friendly header bar (hidden on print) */}
      <div className="bg-slate-900 text-white py-3 px-4 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
            ← Back to Decision Layer Analytics
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={openChatbot}
              className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Ask AI About Me
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12 print:py-6 print:px-4">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-6 border-b border-slate-200">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-200 print:w-20 print:h-20">
              <Image
                src="/scott-profile.png"
                alt="Scott LeDuc"
                width={112}
                height={112}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Name & Contact */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 print:text-2xl">
              Scott LeDuc
            </h1>
            <p className="text-lg text-cyan-600 font-medium mb-3 print:text-base">
              AI/ML Leader & Solutions Architect
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-1 hover:text-cyan-600 print:text-slate-600"
              >
                <Mail className="w-4 h-4" />
                {SITE_CONFIG.email}
              </a>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                703-984-9803
              </span>
              <a
                href={SITE_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-600 print:text-slate-600"
              >
                <Linkedin className="w-4 h-4" />
                /scott-leduc
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
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1">
            Summary
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            AI/ML leader with 10+ years building production AI systems from ML to generative and agentic AI. 
            Expert in RAG pipelines, multi-agent systems (STRANDS), and LLM orchestration with $17M+ validated 
            business impact. Led cross-functional initiatives coordinating 20+ stakeholders, enabling 1,200+ 
            team members, and mentoring junior staff. Retail e-commerce experience with BoostMobile.com including 
            conversion optimization, demand forecasting, and A/B testing.
          </p>
        </section>

        {/* Core Skills */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1">
            Core Skills
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "RAG Pipelines",
              "STRANDS Agents",
              "LLM Orchestration",
              "Amazon Bedrock",
              "Prompt Engineering",
              "Random Forest",
              "XGBoost",
              "Neural Networks",
              "Transformers",
              "Causal Inference",
              "A/B Testing",
              "Retail Analytics",
              "Demand Forecasting",
              "Python (Expert)",
              "SQL (Expert)",
              "AWS",
            ].map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-slate-100 rounded text-slate-700 print:bg-slate-50"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1">
            Experience
          </h2>
          <div className="space-y-5">
            {/* AWS Role */}
            <div className="print:break-inside-avoid">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Lead Business Intelligence Engineer (AI/ML)</h3>
                  <p className="text-cyan-600 font-medium text-sm">Amazon Web Services</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded print:bg-transparent">
                  <Calendar className="w-3 h-3" />
                  Jan 2022 – Present
                </span>
              </div>
              <p className="text-slate-600 text-xs mb-2">Lead AI initiatives for 1,200+ builders across 18 global regions serving 10,200+ customers.</p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-700 font-medium text-xs italic mb-1">Leadership & Program Management</p>
                  <ul className="space-y-1 text-slate-700 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Mentored junior team members through onboarding, code reviews, and technical coaching; delivered GenAI training to audiences of 10-250 people
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Coordinated G3 Security Initiative with 20+ stakeholders across enablement, PM, and tech teams; outcomes actioned by 1,200+ team members
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Led Amazon Q Developer enablement for 200+ team members, reducing development time 30-50%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Built DRIVE Performance Metrics Framework—21-metric performance measurement system with peer ranking across 7 dimensions, reducing performance review prep from 2-4 hours to instant; 30,000+ dashboard views
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-slate-700 font-medium text-xs italic mb-1">Agentic AI & Production Systems</p>
                  <ul className="space-y-1 text-slate-700 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Architected BEAM Platform with RAG pipelines & STRANDS agents—multi-agent AI with conversational interface processing 74K+ records (&lt;2s response times), reducing manual effort 80%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Built Project Prism using AWS Bedrock Claude for automated documentation, cutting time from 4-8 hours to 5 minutes with &lt;2% error rate
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Integrated Amazon Bedrock LLM achieving 89% classification accuracy through iterative prompt engineering
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-slate-700 font-medium text-xs italic mb-1">ML & Business Impact</p>
                  <ul className="space-y-1 text-slate-700 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Built ML recommendation engine (Random Forest, XGBoost) improving conversion rates 53%; win probability models improving win rates 23%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Validated $706K annual revenue with 6:1 ROI using propensity score matching and difference-in-differences on 638K+ observations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                      Drove 45% revenue increase for 300+ builders; received PMO &quot;Awesome Award&quot; for innovation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* T-Mobile Role */}
            <div className="print:break-inside-avoid">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Manager, Digital Analytics & Strategy</h3>
                  <p className="text-cyan-600 font-medium text-sm">T-Mobile & Sprint</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded print:bg-transparent">
                  <Calendar className="w-3 h-3" />
                  Jun 2018 – Dec 2021
                </span>
              </div>
              <p className="text-slate-600 text-xs mb-2">Led retail e-commerce analytics for BoostMobile.com driving media performance and investment strategy.</p>
              <ul className="space-y-1 text-slate-700 text-xs">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                  Managed funnel analysis, conversion optimization, A/B testing (Optimizely), and demand forecasting for retail e-commerce platform
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                  Built sales forecasting & propensity models improving campaign ROI by 35%
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                  Designed Power BI platform used by 1/3 of digital organization; led taxonomization of 200+ metrics across 25+ categories
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-cyan-500 mt-1.5" />
                  Served as trusted partner to senior leadership, influencing multimillion-dollar investment decisions
                </li>
              </ul>
            </div>

            {/* Celerity Role */}
            <div className="print:break-inside-avoid">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Digital Analytics Lead</h3>
                  <p className="text-cyan-600 font-medium text-sm">Celerity (Randstad Digital)</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded print:bg-transparent">
                  <Calendar className="w-3 h-3" />
                  Dec 2015 – Jun 2018
                </span>
              </div>
              <p className="text-slate-600 text-xs">Led analytics consulting for enterprise retail/telecom clients. Trained teams on Tableau, Google Analytics, and self-service reporting.</p>
            </div>
          </div>
        </section>

        {/* Key Projects */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1">
            Key Projects
          </h2>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 flex-shrink-0">DRIVE Performance Metrics (2024):</span>
              <span>21-metric performance system with peer ranking (7 dimensions), ETL pipeline (12+ SQL scripts), AI-optimized knowledge base; 30,000+ views; reduced review prep from 2-4 hours to instant</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 flex-shrink-0">BEAM Platform (2024-25):</span>
              <span>RAG pipelines + STRANDS agents, conversational AI, 74K+ records, &lt;2s response</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 flex-shrink-0">G3 Impact Analysis (2024-25):</span>
              <span>638K+ observations, propensity matching, $706K revenue validated</span>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-8 print:break-inside-avoid">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h2>
              <div className="space-y-1 text-sm">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">MS Business Analytics</p>
                  <p className="text-cyan-600 text-xs">College of William & Mary (2022)</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">BBA</p>
                  <p className="text-cyan-600 text-xs">James Madison University (2013)</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h2>
              <ul className="space-y-1 text-xs">
                <li className="flex items-start justify-between gap-2">
                  <span className="text-slate-700">AWS ML Engineer Associate</span>
                  <span className="text-slate-500 flex-shrink-0">2025</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="text-slate-700">AWS ML Specialty</span>
                  <span className="text-slate-500 flex-shrink-0">2024</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="text-slate-700">Tableau Certified</span>
                  <span className="text-slate-500 flex-shrink-0">2021</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="text-slate-700">SAFe 5 Agilist</span>
                  <span className="text-slate-500 flex-shrink-0">2021</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-cyan-500 pb-1">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-900">AI/ML:</span>{" "}
              <span className="text-slate-700">RAG, STRANDS Agents, LLM Orchestration, Bedrock, Prompt Engineering, Random Forest, XGBoost, Neural Networks, Transformers, TF-IDF</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Statistics:</span>{" "}
              <span className="text-slate-700">Propensity Matching, Difference-in-Differences, Causal Inference, A/B Testing, Experimental Design</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Retail:</span>{" "}
              <span className="text-slate-700">Funnel Analysis, Conversion Optimization, Demand Forecasting, Segmentation, Recommendation Systems</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Tech:</span>{" "}
              <span className="text-slate-700">Python, SQL, R, TypeScript/React | AWS Lambda, SageMaker, Bedrock, Redshift, Glue | Tableau, Power BI</span>
            </div>
          </div>
        </section>

        {/* AI Chat CTA */}
        <section className="mb-8 print:hidden">
          <div className="bg-gradient-to-r from-violet-50 to-cyan-50 border border-violet-200 rounded-xl p-5">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Want to learn more about my background?
                </h3>
                <p className="text-slate-600 text-xs">
                  Chat with my AI assistant to ask questions about my experience, skills, projects, or approach to analytics challenges.
                </p>
              </div>
              <button
                onClick={openChatbot}
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </section>

        {/* Print footer */}
        <footer className="hidden print:block pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
          <p>
            Portfolio & Case Studies: decision-layer.com | Generated{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
