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
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Exchange Tools</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">IDENTIFICATION RULES CHECKER</h1>
            <p className="text-base leading-relaxed text-white/80">
              Validate your replacement property identification against IRS requirements. You must satisfy either the three-property rule, the 200% rule, or the 95% exception. Use this tool to check compliance for exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-16">
          <IdentificationRulesChecker />
          
          <div className="border border-[#5D5838]/10 bg-[#F8F7F4] p-8">
            <p className="text-sm text-[#3F3F3F]">
              <strong className="text-[#5D5838]">Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. Pennsylvania does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply.
            </p>
          </div>
          
          <div className="border-t border-[#5D5838]/20 pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Learn More</p>
            <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">RELATED RESOURCES</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/services/three-property-rule-strategy-philadelphia" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                  Three Property Rule Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/two-hundred-percent-strategy-philadelphia" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                  Two Hundred Percent Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/identification-schedule-planning" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                  Identification Schedule Planning
                </Link>
              </li>
            </ul>
          </div>
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
