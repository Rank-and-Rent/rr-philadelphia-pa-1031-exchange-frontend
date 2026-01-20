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
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Service Areas</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">
              SERVING {PRIMARY_CITY.toUpperCase()} AND {PRIMARY_STATE_ABBR}
            </h1>
            <p className="text-base leading-relaxed text-white/80">
              Our advisors coordinate exchanges across neighborhoods, suburbs, and business districts within Greater Philadelphia, supporting investors who require local compliance and cross market execution.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-20">
          <LocationsBrowser locations={locations} />
          <CTASection />
        </div>
      </section>
    </>
  );
}
