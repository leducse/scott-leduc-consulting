import ServicePageContent from "@/components/services/ServicePageContent";

export const metadata = {
  title: "Data Engineering Consulting | Decision Layer Analytics",
  description:
    "ETL pipelines, data warehousing, and real-time processing built on AWS for scale and reliability.",
};

export default function DataEngineeringServicePage() {
  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicePageContent serviceKey="data-engineering" />
      </div>
    </div>
  );
}


