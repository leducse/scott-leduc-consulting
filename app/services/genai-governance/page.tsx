import ServicePageContent from "@/components/services/ServicePageContent";

export const metadata = {
  title: "GenAI & Data Governance Consulting | Scott LeDuc Consulting",
  description:
    "GenAI readiness, data contracts, LLM evaluation frameworks, and metric governance consulting services for safe, governed AI adoption.",
};

export default function GenAIGovernanceServicePage() {
  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicePageContent serviceKey="genai-governance" />
      </div>
    </div>
  );
}



