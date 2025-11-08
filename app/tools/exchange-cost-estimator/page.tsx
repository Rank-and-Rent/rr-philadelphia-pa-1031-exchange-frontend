import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { ExchangeCostEstimator } from "../../../components/tools/exchange-cost-estimator";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../../lib/config/site";
import { createBreadcrumbSchema } from "../../../lib/schema";

export const metadata: Metadata = {
  title: "Exchange Cost Estimator | 1031 Exchange Philadelphia",
  description:
    "Estimate 1031 exchange costs including QI fees, escrow costs, title insurance, and recording fees for Philadelphia, PA exchanges.",
  keywords: "1031 exchange costs, QI fees, escrow fees, title insurance, Philadelphia, PA",
  openGraph: {
    title: "Exchange Cost Estimator | 1031 Exchange Philadelphia",
    description:
      "Estimate 1031 exchange costs including QI fees, escrow costs, title insurance, and recording fees for Philadelphia, PA exchanges.",
    type: "website",
    url: `${SITE_URL}/tools/exchange-cost-estimator`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/exchange-cost-estimator`,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Exchange Cost Estimator" },
];

export default function ExchangeCostEstimatorPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "Exchange Cost Estimator", url: `${SITE_URL}/tools/exchange-cost-estimator` },
  ]);

  return (
    <>
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Exchange Tools</p>
            <h1 className="text-4xl font-semibold text-heading">Exchange Cost Estimator</h1>
            <p className="text-lg text-[#3F3F3F]">
              Estimate the costs associated with completing a 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. This calculator includes qualified intermediary fees, escrow costs, title insurance, and recording fees. Pennsylvania does not impose a state real estate transfer tax.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <ExchangeCostEstimator />
        <div className="rounded-3xl border border-outline/15 bg-panel p-6">
          <p className="text-sm text-[#3F3F3F]">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. Pennsylvania does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply.
          </p>
        </div>
        <div className="border-t border-outline/15 pt-8">
          <h2 className="text-2xl font-semibold text-heading mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services/qualified-escrow-coordination" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Qualified Escrow Coordination Services
              </Link>
            </li>
            <li>
              <Link href="/services/intermediary-vetting-services" className="text-primary underline underline-offset-4 hover:text-[#B68F40]">
                Intermediary Vetting Services
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
            name: "Exchange Cost Estimator",
            description: "Estimate costs for a 1031 exchange",
            url: `${SITE_URL}/tools/exchange-cost-estimator`,
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

