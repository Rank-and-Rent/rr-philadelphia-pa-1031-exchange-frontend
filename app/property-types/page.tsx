import type { Metadata } from "next";
import Link from "next/link";
import { propertyTypes } from "../../lib/data/property-types";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SITE_URL } from "../../lib/config/site";

export const metadata: Metadata = {
  title: "Property Types | 1031 Exchange Philadelphia",
  description:
    "Review eligible replacement property types for Philadelphia, PA exchanges, including multifamily, industrial, retail, medical office, hospitality, and land.",
  alternates: {
    canonical: `${SITE_URL}/property-types`,
  },
};

export default function PropertyTypesPage() {
  return (
    <section className="bg-[#F4F3EE] py-16">
      <div className="container space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types" },
          ]}
        />
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B68F40]">Property Types</p>
          <h1 className="text-4xl font-semibold text-heading">Eligible Replacement Property Categories.</h1>
          <p className="max-w-3xl text-lg text-[#353535]">
            Explore the asset classes most frequently selected by Philadelphia, PA exchange investors. Each category includes underwriting considerations, compliance notes, and coordination with qualified intermediaries, lenders, and advisors.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {propertyTypes.map((property) => (
            <article key={property.slug} className="rounded-3xl border border-[#D8D2C4] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B68F40]">Property Type</p>
              <h2 className="mt-2 text-xl font-semibold text-heading">{property.name}</h2>
              <p className="mt-3 text-sm text-[#3F3F3F]">{property.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                {property.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#B68F40]">
                <Link href={`/property-types/${property.slug}`} className="underline underline-offset-4">
                  View guidance
                </Link>
                <Link href={`/contact?projectType=${encodeURIComponent(property.name)}#lead-form`} className="underline underline-offset-4">
                  Contact advisor
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

