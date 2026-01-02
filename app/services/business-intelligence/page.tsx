import ServicePageContent from "@/components/services/ServicePageContent";

export const metadata = {
  title: "Business Intelligence Consulting | Decision Layer Analytics",
  description:
    "Executive dashboards, KPI standardization, and automated reporting to drive data-informed decisions.",
};

export default function BusinessIntelligenceServicePage() {
  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicePageContent serviceKey="business-intelligence" />
      </div>
    </div>
  );
}


