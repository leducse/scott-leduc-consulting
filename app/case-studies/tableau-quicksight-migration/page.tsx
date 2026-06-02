import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "Tableau to QuickSight Migration Assistant | Decision Layer Analytics",
  description:
    "GenAI-assisted Tableau to Amazon QuickSight migration with validation gates, metric parity checks, and dry-run deployment planning.",
};

export default function TableauQuickSightMigrationCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="tableau-quicksight-migration" />
    </div>
  );
}
