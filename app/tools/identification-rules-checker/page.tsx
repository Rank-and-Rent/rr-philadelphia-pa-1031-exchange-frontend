import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { IdentificationRulesChecker } from "../../../components/tools/identification-rules-checker";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../../lib/config/site";
import { createBreadcrumbSchema } from "../../../lib/schema";

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange Philadelphia",
  description:
    "Validate your 1031 exchange property identification against IRS rules including the three-property rule, 200% rule, and 95% exception for Philadelphia, PA.",
  keywords: "1031 identification rules, three property rule, 200 percent rule, 95 percent exception, Philadelphia, PA",
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange Philadelphia",
    description:
      "Validate your 1031 exchange property identification against IRS rules including the three-property rule, 200% rule, and 95% exception for Philadelphia, PA.",
    type: "website",
    url: `${SITE_URL}/tools/identification-rules-checker`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/identification-rules-checker`,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Identification Rules Checker" },
];

export default function IdentificationRulesCheckerPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "Identification Rules Checker", url: `${SITE_URL}/tools/identification-rules-checker` },
  ]);

  return (
    <>
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Exchange Tools</p>
            <h1 className="text-4xl font-semibold text-heading">Identification Rules Checker</h1>
            <p className="text-lg text-[#3F3F3F]">
              Validate your replacement property identification against IRS requirements. You must satisfy either the three-property rule, the 200% rule, or the 95% exception. Use this tool to check compliance for exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <IdentificationRulesChecker />
        <div className="rounded-3xl border border-outline/15 bg-panel p-6">
          <p className="text-sm text-[#3F3F3F]">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. Pennsylvania does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply.
          </p>
        </div>
        <div className="border-t border-outline/15 pt-8">
          <h2 className="text-2xl font-semibold text-heading mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services/three-property-rule-strategy-philadelphia" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Three Property Rule Strategy
              </Link>
            </li>
            <li>
              <Link href="/services/two-hundred-percent-strategy-philadelphia" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Two Hundred Percent Strategy
              </Link>
            </li>
            <li>
              <Link href="/services/identification-schedule-planning" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Identification Schedule Planning
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Identification Rules Checker",
            description: "Validate 1031 exchange property identification against IRS rules",
            url: `${SITE_URL}/tools/identification-rules-checker`,
            isPartOf: {
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
            },
          }),
        }}
      />
    </>
  );
}

