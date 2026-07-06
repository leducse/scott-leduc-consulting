import CaseStudyPageContent from "@/components/case-studies/CaseStudyPageContent";

export const metadata = {
  title: "TradingView Paper Trading Automation | Decision Layer Analytics",
  description:
    "A serverless AWS TradingView webhook POC with validation, risk controls, idempotency, audit trails, and Alpaca paper trading execution.",
};

export default function TradingViewWebhookAwsPocCaseStudyPage() {
  return (
    <div className="bg-[#0a1628]">
      <CaseStudyPageContent caseStudyKey="tradingview-webhook-aws-poc" />
    </div>
  );
}
