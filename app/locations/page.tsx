import type { Metadata } from "next";
import { locations } from "../../lib/data/locations";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { LocationsBrowser } from "../../components/locations/locations-browser";
import { CTASection } from "../../components/cta-section";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../lib/config/site";

export const metadata: Metadata = {
  title: "Locations | 1031 Exchange Philadelphia",
  description:
    "View the Pennsylvania markets served by 1031 Exchange Philadelphia, including Center City, University City, and surrounding suburbs.",
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <>
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service Areas</p>
            <h1 className="text-4xl font-semibold text-heading">
              Serving {PRIMARY_CITY} and {PRIMARY_STATE_ABBR}.
            </h1>
            <p className="text-lg text-[#3F3F3F]">
              Our advisors coordinate exchanges across neighborhoods, suburbs, and business districts within Greater Philadelphia, supporting investors who require local compliance and cross market execution.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-16 py-16">
        <LocationsBrowser locations={locations} />
        <CTASection />
      </section>
    </>
  );
}

