import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "../../../lib/data/locations";
import { services } from "../../../lib/data/services";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { CTASection } from "../../../components/cta-section";
import { SITE_URL } from "../../../lib/config/site";
import { createBreadcrumbSchema, faqPageSchema } from "../../../lib/schema";

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) {
    return {};
  }
  return {
    title: `${location.name} | 1031 Exchange Philadelphia`,
    description: location.shortDescription,
    alternates: {
      canonical: `${SITE_URL}/locations/${location.slug}`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) {
    notFound();
  }

  const supportedServices = location.featuredServices
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Locations", url: `${SITE_URL}/locations` },
    { name: location.name, url: `${SITE_URL}/locations/${location.slug}` },
  ]);

  const faqSchema = faqPageSchema(location.faqs);

  return (
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations" },
            { label: location.name },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service Area</p>
          <h1 className="text-4xl font-semibold text-heading">{location.name}</h1>
          {/* Main Description from batch data or fallback to summary */}
          {location.mainDescription ? (
            <div
              className="text-lg text-[#3F3F3F] prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: location.mainDescription }}
            />
          ) : (
            location.summary.map((paragraph) => (
              <p key={paragraph} className="text-lg text-[#3F3F3F]">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-heading">Why investors target this area.</h2>
            <ul className="space-y-2 text-sm text-[#3F3F3F]">
              {location.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </div>
          <aside className="rounded-3xl border border-outline/15 bg-panel p-6 text-sm text-[#3F3F3F]">
            <p className="text-sm font-semibold text-heading">Next steps</p>
            <p className="mt-2">
              Coordinate a consultation to review replacement property availability, underwriting needs, and timeline controls for this market.
            </p>
            <a
              href={`/contact?projectType=${encodeURIComponent(location.name)}#lead-form`}
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
            >
              Contact advisor
            </a>
          </aside>
        </div>
        {/* Popular Paths from batch data */}
        {location.popularPaths && location.popularPaths.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-heading">Popular paths for this area.</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {location.popularPaths
                .sort((a, b) => a.rank - b.rank)
                .map((path) => {
                  const isService = path.type === "service";
                  const href = isService ? `/services/${path.slug}` : `/property-types/${path.slug}`;
                  return (
                    <article key={`${path.type}-${path.slug}`} className="rounded-3xl border border-outline/15 bg-panel p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {isService ? "Service" : "Property Type"}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-heading">{path.name}</h3>
                      <p className="mt-3 text-sm text-[#3F3F3F]">{path.whyPopular}</p>
                      <div className="mt-4">
                        <Link
                          className="text-sm font-semibold text-primary underline underline-offset-4"
                          href={href}
                        >
                          Learn more →
                        </Link>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        )}

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">Services aligned with this market.</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {supportedServices.map((service) => (
              <article key={service.slug} className="rounded-3xl border border-outline/15 bg-panel p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured service</p>
                <h3 className="mt-2 text-xl font-semibold text-heading">{service.name}</h3>
                <p className="mt-3 text-sm text-[#3F3F3F]">{service.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
                  <Link className="underline underline-offset-4" href={`/services/${service.slug}`}>
                    View service
                  </Link>
                  <Link className="underline underline-offset-4" href={`/contact?projectType=${encodeURIComponent(service.name)}#lead-form`}>
                    Prefill contact
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Example Capability */}
        {location.exampleCapability && (
          <section className="space-y-6">
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                {location.exampleCapability.disclaimer}
              </p>
              <h2 className="text-xl font-semibold text-heading mb-4">Example engagement.</h2>
              <div className="space-y-3 text-sm text-[#3F3F3F]">
                <div>
                  <span className="font-semibold text-heading">Location:</span> {location.exampleCapability.location}
                </div>
                <div>
                  <span className="font-semibold text-heading">Situation:</span> {location.exampleCapability.situation}
                </div>
                <div>
                  <span className="font-semibold text-heading">Our Approach:</span> {location.exampleCapability.ourApproach}
                </div>
                <div>
                  <span className="font-semibold text-heading">Expected Outcome:</span> {location.exampleCapability.expectedOutcome}
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">Frequently asked questions.</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {location.faqs.map((faq) => (
              <details key={faq.question} className="rounded-3xl border border-outline/15 bg-panel p-4">
                <summary className="cursor-pointer text-sm font-semibold text-heading">{faq.question}</summary>
                <p className="mt-2 text-sm text-[#3F3F3F]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <div className="text-center">
          <Link href="/locations" className="inline-flex rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
            View all locations
          </Link>
        </div>
        <CTASection locationName={location.name} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
    </div>
  );
}

