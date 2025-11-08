import type { Metadata } from "next";
import Script from "next/script";
import { Libre_Baskerville, Open_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import {
  LOGO_URL,
  OG_IMAGE_URL,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
  CALLRAIL_PLACEHOLDER,
  HUBSPOT_FORM_ID,
  HUBSPOT_PORTAL_ID,
} from "../lib/config/site";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { StickyCTA } from "../components/sticky-cta";

const headingFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

const uiFont = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Qualified Intermediary Network Pennsylvania`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes, identification strategy, and deadline discipline.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${SITE_NAME} | Qualified Intermediary Network Pennsylvania`,
    description:
      "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes, identification strategy, and deadline discipline.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} hero imagery`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Qualified Intermediary Network Pennsylvania`,
    description:
      "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes, identification strategy, and deadline discipline.",
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const enableCallRail = CALLRAIL_PLACEHOLDER && CALLRAIL_PLACEHOLDER !== "CALLRAIL_ACCOUNT_ID";
  const enableHubSpot =
    HUBSPOT_FORM_ID && HUBSPOT_FORM_ID !== "HUBSPOT_FORM_ID" && HUBSPOT_PORTAL_ID && HUBSPOT_PORTAL_ID !== "HUBSPOT_PORTAL_ID";

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} ${uiFont.variable} bg-paper text-ink antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCTA />
        <Analytics />
        {enableCallRail ? (
          <Script id="callrail-loader" strategy="afterInteractive">
            {`
              window.callrailSettings = { accountId: "${CALLRAIL_PLACEHOLDER}" };
            `}
          </Script>
        ) : null}
        {enableHubSpot ? (
          <Script
            id="hubspot-loader"
            strategy="afterInteractive"
            src={`https://js.hsforms.net/forms/v2.js?portalId=${HUBSPOT_PORTAL_ID}&formId=${HUBSPOT_FORM_ID}`}
          />
        ) : null}
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: SITE_NAME,
            url: SITE_URL,
            logo: LOGO_URL,
            telephone: PHONE_E164,
          })}
        </Script>
      </body>
    </html>
  );
}
