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
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Exchange Tools</p>
            <h1 className="text-4xl font-semibold text-heading">Boot Calculator</h1>
            <p className="text-lg text-[#3F3F3F]">
              Calculate boot received during a 1031 exchange. Boot includes cash received and mortgage relief, and is subject to immediate taxation. Use this calculator to estimate boot and potential tax implications for exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <BootCalculator />
        <div className="rounded-3xl border border-outline/15 bg-panel p-6">
          <p className="text-sm text-[#3F3F3F]">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. Pennsylvania does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply.
          </p>
        </div>
        <div className="border-t border-outline/15 pt-8">
          <h2 className="text-2xl font-semibold text-heading mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services/boot-minimization-strategy" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Boot Minimization Strategy Services
              </Link>
            </li>
            <li>
              <Link href="/services/taxpayer-risk-assessment" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Taxpayer Risk Assessment
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                About Our Exchange Advisory Services
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

