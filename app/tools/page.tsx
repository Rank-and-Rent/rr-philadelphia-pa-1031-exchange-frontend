import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../lib/config/site";
import { createBreadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = {
  title: "1031 Exchange Tools | 1031 Exchange Philadelphia",
  description:
    "Free 1031 exchange calculators and tools for Philadelphia, PA investors including boot calculator, cost estimator, and identification rules checker.",
  keywords: "1031 exchange tools, boot calculator, exchange cost estimator, identification rules checker, Philadelphia, PA",
  openGraph: {
    title: "1031 Exchange Tools | 1031 Exchange Philadelphia",
    description:
      "Free 1031 exchange calculators and tools for Philadelphia, PA investors including boot calculator, cost estimator, and identification rules checker.",
    type: "website",
    url: `${SITE_URL}/tools`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
};

const tools = [
  {
    slug: "boot-calculator",
    name: "Boot Calculator",
    description:
      "Calculate boot received during a 1031 exchange including cash boot, mortgage boot, and estimated tax implications.",
  },
  {
    slug: "exchange-cost-estimator",
    name: "Exchange Cost Estimator",
    description:
      "Estimate total costs for a 1031 exchange including QI fees, escrow costs, title insurance, and recording fees.",
  },
  {
    slug: "identification-rules-checker",
    name: "Identification Rules Checker",
    description:
      "Validate your replacement property identification against IRS rules including three-property, 200%, and 95% rules.",
  },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools" },
];

export default function ToolsPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
  ]);

  return (
    <>
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Exchange Tools</p>
            <h1 className="text-4xl font-semibold text-heading">1031 Exchange Tools</h1>
            <p className="text-lg text-[#3F3F3F]">
              Free calculators and tools to help you plan and execute 1031 exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. Use these interactive tools to estimate costs, calculate boot, and validate identification rules.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-[#D8D2C4] bg-white p-6 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#14213D]">{tool.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{tool.description}</p>
              </div>
              <span className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#B68F40] transition-colors group-hover:text-[#8A6B2F]">
                Use calculator →
              </span>
            </Link>
          ))}
        </div>
        <div className="rounded-3xl border border-outline/15 bg-panel p-6">
          <p className="text-sm text-[#3F3F3F]">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. Pennsylvania does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply.
          </p>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

