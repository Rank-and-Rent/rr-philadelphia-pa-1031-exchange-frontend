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
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Exchange Tools</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">1031 EXCHANGE TOOLS</h1>
            <p className="text-base leading-relaxed text-white/80">
              Free calculators and tools to help you plan and execute 1031 exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. Use these interactive tools to estimate costs, calculate boot, and validate identification rules.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-16">
          <div className="grid gap-1 md:grid-cols-3">
            {tools.map((tool, index) => {
              const bgColors = ["bg-[#5D5838]", "bg-[#7A7654]", "bg-[#454326]"];
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className={`group relative flex aspect-[4/3] items-end overflow-hidden ${bgColors[index]} p-6 text-white transition-all hover:opacity-90`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-sm font-medium uppercase tracking-[0.15em]">{tool.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/80">{tool.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="border border-[#5D5838]/10 bg-[#F8F7F4] p-8">
            <p className="text-sm text-[#3F3F3F]">
              <strong className="text-[#5D5838]">Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. Pennsylvania does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply.
            </p>
          </div>
        </div>
      </section>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
