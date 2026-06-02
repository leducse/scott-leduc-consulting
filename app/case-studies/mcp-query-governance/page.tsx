import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "MCP Query Governance Platform | Decision Layer Analytics",
  description:
    "Detect abusive programmatic database queries with ML anomaly detection and govern agent access through cataloged, RLS-enforced query paths.",
};

export default function McpQueryGovernanceCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="mcp-query-governance" />
    </div>
  );
}
