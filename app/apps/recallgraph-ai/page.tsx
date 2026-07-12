import type { Metadata } from "next";
import RecallGraphWorkbench from "@/components/recallgraph/RecallGraphWorkbench";

export const metadata: Metadata = {
  title: "RecallGraph AI Workbench",
  description:
    "Interactive product-safety analyst workbench showing RAG, agent traces, eval gates, and natural-language dashboard control.",
  alternates: {
    canonical: "/apps/recallgraph-ai",
  },
};

export default function RecallGraphAiWorkbenchPage() {
  return <RecallGraphWorkbench />;
}
