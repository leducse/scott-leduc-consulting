import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "AWS Serverless Dashboard Case Study | Scott LeDuc Consulting",
  description:
    "Discover how a serverless AWS architecture delivered real-time insights to 1,313 active users with sub-2 second response times.",
};

export default function AwsDashboardCaseStudyPage() {
  return (
    <div className="bg-gradient-to-br from-white via-indigo-50/60 to-purple-50/40">
      <CaseStudyPageContent caseStudyKey="aws-dashboard" />
    </div>
  );
}


