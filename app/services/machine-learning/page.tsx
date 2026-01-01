import ServicePageContent from "@/components/services/ServicePageContent";

export const metadata = {
  title: "Machine Learning & AI Consulting | Scott LeDuc Consulting",
  description:
    "Predictive modeling, NLP, recommendation engines, and ML deployment services with measurable business outcomes.",
};

export default function MachineLearningServicePage() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50/60 to-cyan-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicePageContent serviceKey="machine-learning" />
      </div>
    </div>
  );
}


