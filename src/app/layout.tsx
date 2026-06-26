import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Synapse AI — Next-Gen Data Automation Platform",
  description:
    "Synapse AI automates your entire data pipeline with intelligent orchestration, real-time analytics, and zero-code integrations. Ship 10× faster.",
  keywords: [
    "AI automation",
    "data pipeline",
    "machine learning platform",
    "no-code automation",
    "data orchestration",
    "AI SaaS",
  ],
  authors: [{ name: "Synapse AI" }],
  creator: "Synapse AI",
  metadataBase: new URL("https://synapse-ai.vercel.app"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://synapse-ai.vercel.app",
    title: "Synapse AI — Next-Gen Data Automation Platform",
    description:
      "Automate your entire data pipeline with intelligent orchestration, real-time analytics, and zero-code integrations.",
    siteName: "Synapse AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Synapse AI Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synapse AI — Next-Gen Data Automation Platform",
    description:
      "Automate your entire data pipeline with intelligent orchestration and real-time analytics.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Non-blocking font load — media=print trick defers until after paint */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <link rel="canonical" href="https://synapse-ai.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
