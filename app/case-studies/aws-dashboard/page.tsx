import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "AWS Serverless Dashboard Case Study | Decision Layer Analytics",
  description:
    "Discover how a serverless AWS architecture delivered real-time insights to 1,313 active users with sub-2 second response times.",
};

export default function AwsDashboardCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="aws-dashboard" />
    </div>
  );
}


