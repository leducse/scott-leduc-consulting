import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "AI Coding Tool Spillover Analysis | Decision Layer Analytics",
  description:
    "Causal inference case study: difference-in-differences, SMOTE matching, and clustering to measure cloud revenue lift from AI coding tool adoption.",
};

export default function AICodingSpilloverCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="ai-coding-spillover" />
    </div>
  );
}
