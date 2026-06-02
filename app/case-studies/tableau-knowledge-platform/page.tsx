import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "Tableau Workbook Knowledge Platform | Decision Layer Analytics",
  description:
    "Turn Tableau workbooks into field-trusted documentation with Bedrock two-pass generation, validation, and MCP-style retrieval.",
};

export default function TableauKnowledgePlatformCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="tableau-knowledge-platform" />
    </div>
  );
}
