"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidgetLoader from "@/components/chat/ChatWidgetLoader";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneApp = pathname.startsWith("/futurewealth");
  const hasEmbeddedChat = pathname.startsWith("/apps/recallgraph-ai");

  if (isStandaloneApp) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
      {!hasEmbeddedChat && <ChatWidgetLoader />}
    </>
  );
}
