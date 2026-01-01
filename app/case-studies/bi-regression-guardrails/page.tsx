import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "BI Regression Guardrails Case Study | Scott LeDuc Consulting",
  description:
    "Learn how CI/CD-integrated regression guardrails prevented 45+ production breakages and protected 200+ dashboards with automated testing.",
};

export default function BIRegressionGuardrailsCaseStudyPage() {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50/60 to-pink-50/40">
      <CaseStudyPageContent caseStudyKey="bi-regression-guardrails" />
    </div>
  );
}



