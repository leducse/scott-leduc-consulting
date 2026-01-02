import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "BI Regression Guardrails Case Study | Decision Layer Analytics",
  description:
    "Learn how CI/CD-integrated regression guardrails prevented 45+ production breakages and protected 200+ dashboards with automated testing.",
};

export default function BIRegressionGuardrailsCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="bi-regression-guardrails" />
    </div>
  );
}



