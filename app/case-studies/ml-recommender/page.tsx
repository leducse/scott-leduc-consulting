import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "ML Engagement Recommender Case Study | Scott LeDuc Consulting",
  description:
    "See how machine learning and predictive analytics improved conversion rates by 53% with production-ready recommendation models.",
};

export default function MlRecommenderCaseStudyPage() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50/60 to-cyan-50/40">
      <CaseStudyPageContent caseStudyKey="ml-recommender" />
    </div>
  );
}


