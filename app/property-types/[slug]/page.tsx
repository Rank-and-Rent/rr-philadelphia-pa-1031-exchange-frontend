import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { propertyTypes } from "../../../lib/data/property-types";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { CTASection } from "../../../components/cta-section";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../../lib/config/site";

type PropertyTypePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return propertyTypes.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PropertyTypePageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = propertyTypes.find((item) => item.slug === slug);
  if (!property) {
    return {};
  }
  return {
    title: property.metadata.title,
    description: property.metadata.description,
    alternates: {
      canonical: `${SITE_URL}/property-types/${property.slug}`,
    },
  };
}

export default async function PropertyTypePage({ params }: PropertyTypePageProps) {
  const { slug } = await params;
  const property = propertyTypes.find((item) => item.slug === slug);
  if (!property) {
    notFound();
  }

  return (
    <section className="bg-[#F4F3EE] py-16">
      <div className="container space-y-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types", href: "/property-types" },
            { label: property.name },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B68F40]">Property Type</p>
          <h1 className="text-4xl font-semibold text-heading">{property.name}</h1>
          <p className="text-lg text-[#353535]">{property.summary}</p>
        </div>
        <div className="space-y-4 rounded-3xl border border-[#D8D2C4] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-heading">How we support this asset class in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.</h2>
          <ul className="space-y-2 text-sm text-[#3F3F3F]">
            {property.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 text-sm text-[#3F3F3F] md:flex-row md:items-center md:justify-between">
            <a
              href={`/contact?projectType=${encodeURIComponent(property.name)}#lead-form`}
              className="inline-flex rounded-full bg-[#B68F40] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#8A6B2F]"
            >
              Contact advisor
            </a>
            <p className="text-xs text-[#6B6B6B]">
              Educational content only. Not tax or legal advice. Coordinate with your qualified intermediary and tax counsel.
            </p>
          </div>
        </div>
        <CTASection />
      </div>
    </section>
  );
}

