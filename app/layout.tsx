import type { Metadata } from "next";
import Script from "next/script";
import { Libre_Baskerville, Open_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
import { organizationSchema, localBusinessSchema } from "../lib/schema";
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
  keywords: [
    "1031 exchange",
    "1031 exchange Philadelphia",
    "1031 exchange Pennsylvania",
    "like-kind exchange",
    "qualified intermediary",
    "1031 exchange advisor",
    "Philadelphia 1031 exchange",
    "PA 1031 exchange",
    "tax deferred exchange",
    "investment property exchange",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | Best Property Identification Experts in Philadelphia`,
    description:
      "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes, identification strategy, and deadline discipline.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} hero imagery`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Best Property Identification Experts in Philadelphia`,
    description:
      "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes, identification strategy, and deadline discipline.",
    images: [OG_IMAGE_URL],
    creator: "@1031philly",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add verification codes here when available
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
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="local-business-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(localBusinessSchema)}
        </Script>
      </body>
    </html>
  );
}
