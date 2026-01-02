import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "G3 Pipeline Impact Analysis Case Study | Scott LeDuc Consulting",
  description:
    "Learn how advanced statistical methods delivered $706K annual revenue with validated ROI through the G3 security engagement program.",
};

export default function G3CaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="g3-analysis" />
    </div>
  );
}


