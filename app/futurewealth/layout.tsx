import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "FutureWealth — Opportunity Cost Calculator",
  description:
    "See what impulse purchases and subscriptions could be worth if you invested the money instead.",
  manifest: "/futurewealth/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FutureWealth",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1419",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function FutureWealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="apple-touch-icon" href="/futurewealth/icon-192.svg" />
      {children}
    </>
  );
}
