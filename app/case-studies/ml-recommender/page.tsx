import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "ML Engagement Recommender Case Study | Decision Layer Analytics",
  description:
    "See how machine learning and predictive analytics improved conversion rates by 53% with production-ready recommendation models.",
};

export default function MlRecommenderCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="ml-recommender" />
    </div>
  );
}


