import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "Governed Model Lifecycle",
  description:
    "A model-registry POC with point-in-time evaluation, leakage controls, human approval, and lineage-aware batch scoring.",
};

export default function GovernedModelLifecycleCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="governed-model-lifecycle" />
    </div>
  );
}
