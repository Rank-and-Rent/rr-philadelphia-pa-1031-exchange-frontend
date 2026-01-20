import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { BootCalculator } from "../../../components/tools/boot-calculator";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../../lib/config/site";
import { createBreadcrumbSchema } from "../../../lib/schema";

export const metadata: Metadata = {
  title: "Boot Calculator | 1031 Exchange Philadelphia",
  description:
    "Calculate boot received during a 1031 exchange in Philadelphia, PA. Estimate cash boot, mortgage boot, and potential tax implications.",
  keywords: "boot calculator, 1031 exchange boot, cash boot, mortgage boot, Philadelphia, PA",
  openGraph: {
    title: "Boot Calculator | 1031 Exchange Philadelphia",
    description:
      "Calculate boot received during a 1031 exchange in Philadelphia, PA. Estimate cash boot, mortgage boot, and potential tax implications.",
    type: "website",
    url: `${SITE_URL}/tools/boot-calculator`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/boot-calculator`,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Boot Calculator" },
];

export default function BootCalculatorPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "Boot Calculator", url: `${SITE_URL}/tools/boot-calculator` },
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Exchange Tools</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">BOOT CALCULATOR</h1>
            <p className="text-base leading-relaxed text-white/80">
              Calculate boot received during a 1031 exchange. Boot includes cash received and mortgage relief, and is subject to immediate taxation. Use this calculator to estimate boot and potential tax implications for exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-16">
          <BootCalculator />
          
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
                <Link href="/services/boot-minimization-strategy" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                  Boot Minimization Strategy Services
                </Link>
              </li>
              <li>
                <Link href="/services/taxpayer-risk-assessment" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                  Taxpayer Risk Assessment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                  About Our Exchange Advisory Services
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
            name: "Boot Calculator",
            description: "Calculate boot received during a 1031 exchange",
            url: `${SITE_URL}/tools/boot-calculator`,
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
