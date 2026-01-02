import ServicePageContent from "@/components/services/ServicePageContent";

export const metadata = {
  title: "AWS Cloud Architecture Consulting | Scott LeDuc Consulting",
  description:
    "Serverless applications, API integrations, and cloud-native solutions designed with AWS best practices.",
};

export default function AwsArchitectureServicePage() {
  return (
    <div className="bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicePageContent serviceKey="aws-architecture" />
      </div>
    </div>
  );
}


