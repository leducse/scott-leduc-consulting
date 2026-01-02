import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://decision-layer.com"),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.subtitle,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.subtitle,
    type: "website",
    url: "https://decision-layer.com",
    siteName: "Decision Layer - Scott LeDuc Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.subtitle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Fontshare fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=cabinet-grotesk@700,800,900&display=swap"
          rel="stylesheet"
        />
        {/* JetBrains Mono for code */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen flex flex-col bg-grid"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 relative">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
