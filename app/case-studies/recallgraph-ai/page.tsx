import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "RecallGraph AI | Decision Layer Analytics",
  description:
    "A portfolio-grade AI engineering project demonstrating RAG, multi-agent orchestration, eval gates, LLMOps, and production patterns over public product-safety data.",
};

export default function RecallGraphAiCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="recallgraph-ai" />
    </div>
  );
}
