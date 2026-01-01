"use client";

import { SERVICE_CONTENT } from "@/lib/content";
import { CASE_STUDIES } from "@/lib/constants";
import ServiceFeatures from "./ServiceFeatures";
import ServiceCTA from "./ServiceCTA";
import CaseStudyCard from "../case-studies/CaseStudyCard";
import GradientCard from "../shared/GradientCard";

type ServiceKey = keyof typeof SERVICE_CONTENT;

interface ServicePageContentProps {
  serviceKey: ServiceKey;
}

const serviceGradients: Record<ServiceKey, string> = {
  "statistical-analysis": "from-purple-500 to-pink-500",
  "machine-learning": "from-blue-500 to-cyan-500",
  "aws-architecture": "from-indigo-500 to-purple-500",
  "business-intelligence": "from-green-500 to-emerald-500",
  "data-engineering": "from-orange-500 to-red-500",
  "genai-governance": "from-violet-500 to-fuchsia-500",
};

export default function ServicePageContent({
  serviceKey,
}: ServicePageContentProps) {
  const service = SERVICE_CONTENT[serviceKey];
  const caseStudy = CASE_STUDIES.find(
    (study) => study.id === service.caseStudy
  );

  if (!service) {
    return null;
  }

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-purple-500 font-semibold">
          Services
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {service.title}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl">
          {service.overview}
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <ServiceFeatures
          title="Proven Methodology"
          items={service.methodology}
          icon="📐"
          gradient={serviceGradients[serviceKey]}
        />
        <ServiceFeatures
          title="Deliverables"
          items={service.deliverables}
          icon="📦"
          gradient="from-blue-500 to-cyan-500"
        />
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <ServiceFeatures
          title="Tools & Platforms"
          items={service.tools}
          icon="🛠️"
          gradient="from-green-500 to-emerald-500"
        />
        <GradientCard gradient="from-purple-500 to-pink-500" className="h-full">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Engagement Options
            </h3>
            <p className="text-gray-600">
              Flexible consulting models tailored to your organization:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>• Strategic advisory retainers</li>
              <li>• End-to-end implementation projects</li>
              <li>• Team enablement and training programs</li>
              <li>• Fractional data & ML leadership</li>
            </ul>
          </div>
        </GradientCard>
      </section>

      {caseStudy && (
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Case Study
            </h2>
            <p className="text-gray-600">
              Explore how this service delivered measurable outcomes.
            </p>
          </div>
          <CaseStudyCard
            title={caseStudy.title}
            tagline={caseStudy.tagline}
            metrics={caseStudy.metrics}
            gradient={caseStudy.gradient}
            href={`/case-studies/${caseStudy.slug}`}
          />
        </section>
      )}

      <section>
        <ServiceCTA
          headline={`Ready to get started with ${service.title}?`}
          subheadline="Schedule a consultation to discuss goals, scope, and the impact we can create together."
        />
      </section>
    </div>
  );
}


