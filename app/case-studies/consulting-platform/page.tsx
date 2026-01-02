import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "Decision Layer Consulting Platform Case Study | Decision Layer Analytics",
  description:
    "Full-stack serverless application with AI integration: Next.js frontend, Python Lambda backend, Amazon Bedrock chatbot, and automated CI/CD deployment.",
};

export default function ConsultingPlatformCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="consulting-platform" />
    </div>
  );
}
