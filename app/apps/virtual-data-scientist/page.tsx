import type { Metadata } from "next";
import VirtualDataScientistChat from "@/components/apps/VirtualDataScientistChat";

export const metadata: Metadata = {
  title: "Virtual Data Scientist",
  description: "Native LLM chat interface for Decision Layer's data-science MCP and AgentCore workflow.",
  alternates: {
    canonical: "/apps/virtual-data-scientist",
  },
};

export default function VirtualDataScientistPage() {
  return <VirtualDataScientistChat />;
}
