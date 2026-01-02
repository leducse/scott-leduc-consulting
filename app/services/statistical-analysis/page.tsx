import ServicePageContent from "@/components/services/ServicePageContent";

export const metadata = {
  title: "Statistical Analysis Consulting | Scott LeDuc Consulting",
  description:
    "Propensity score matching, difference-in-differences, and causal inference consulting services delivering validated business impact.",
};

export default function StatisticalAnalysisServicePage() {
  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicePageContent serviceKey="statistical-analysis" />
      </div>
    </div>
  );
}


