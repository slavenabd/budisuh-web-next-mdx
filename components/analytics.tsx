"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from "next/script";

export function Analytics() {
  return (
    <>
      {/* --- Google Analytics (GA4) --- */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L1L9D621FW"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L1L9D621FW', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* --- Vercel Analytics --- */}
      <VercelAnalytics />
    </>
  );
}
