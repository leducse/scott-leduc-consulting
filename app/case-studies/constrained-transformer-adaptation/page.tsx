import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "Constrained Transformer Adaptation",
  description:
    "A local QLoRA fine-tuning and evaluation project for offline structured generation under memory, latency, and validation constraints.",
};

export default function ConstrainedTransformerAdaptationCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="constrained-transformer-adaptation" />
    </div>
  );
}
