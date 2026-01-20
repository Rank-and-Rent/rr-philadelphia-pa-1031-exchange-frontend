import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { locations } from "../../../lib/data/locations";
import { services } from "../../../lib/data/services";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { CTASection } from "../../../components/cta-section";
import { SITE_URL } from "../../../lib/config/site";
import { createBreadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { getLocationImagePath } from "../../../lib/utils/images";

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
  const imagePath = getLocationImagePath(location.slug);

  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        {imagePath && (
          <div className="absolute inset-0">
            <Image
              src={imagePath}
              alt={location.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#5D5838]/70" />
          </div>
        )}
        <div className="relative z-10 container py-16 text-white">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: location.name },
            ]}
          />
          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Service Area</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">{location.name.toUpperCase()}</h1>
            {location.mainDescription ? (
              <div
                className="text-base leading-relaxed text-white/80 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: location.mainDescription }}
              />
            ) : (
              location.summary.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-white/80">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-20">
          {/* Why Investors Target */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Market Insights</p>
              <h2 className="text-2xl font-normal tracking-wide text-[#5D5838]">WHY INVESTORS TARGET THIS AREA</h2>
              <ul className="space-y-3 text-sm text-[#3F3F3F]">
                {location.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="text-[#5D5838]">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Get Started</p>
              <h3 className="mt-3 text-lg font-normal tracking-wide text-[#5D5838]">NEXT STEPS</h3>
              <p className="mt-4 text-sm text-[#3F3F3F]">
                Coordinate a consultation to review replacement property availability, underwriting needs, and timeline controls for this market.
              </p>
              <a
                href={`/contact?projectType=${encodeURIComponent(location.name)}#lead-form`}
                className="mt-6 inline-flex bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326]"
              >
                Contact advisor
              </a>
            </aside>
          </div>

          {/* Popular Paths */}
          {location.popularPaths && location.popularPaths.length > 0 && (
            <section className="space-y-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Investment Paths</p>
                <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">POPULAR PATHS FOR THIS AREA</h2>
              </div>
              <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
                {location.popularPaths
                  .sort((a, b) => a.rank - b.rank)
                  .map((path) => {
                    const isService = path.type === "service";
                    const href = isService ? `/services/${path.slug}` : `/property-types/${path.slug}`;
                    return (
                      <article key={`${path.type}-${path.slug}`} className="bg-[#F8F7F4] p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">
                          {isService ? "Service" : "Property Type"}
                        </p>
                        <h3 className="mt-3 text-lg font-semibold text-[#5D5838]">{path.name}</h3>
                        <p className="mt-3 text-sm text-[#3F3F3F]">{path.whyPopular}</p>
                        <div className="mt-4">
                          <Link
                            className="text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]"
                            href={href}
                          >
                            Learn more
                          </Link>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </section>
          )}

          {/* Services */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Our Services</p>
              <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">SERVICES ALIGNED WITH THIS MARKET</h2>
            </div>
            <div className="grid gap-px bg-[#5D5838]/10 md:grid-cols-2">
              {supportedServices.map((service) => (
                <article key={service.slug} className="bg-white p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Featured service</p>
                  <h3 className="mt-3 text-lg font-semibold text-[#5D5838]">{service.name}</h3>
                  <p className="mt-3 text-sm text-[#3F3F3F]">{service.shortDescription}</p>
                  <div className="mt-6 flex items-center justify-between text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                    <Link className="underline underline-offset-4 hover:text-[#7A7654]" href={`/services/${service.slug}`}>
                      View service
                    </Link>
                    <Link className="underline underline-offset-4 hover:text-[#7A7654]" href={`/contact?projectType=${encodeURIComponent(service.name)}#lead-form`}>
                      Prefill contact
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Example Capability */}
          {location.exampleCapability && (
            <section className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838] mb-4">
                {location.exampleCapability.disclaimer}
              </p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838] mb-6">EXAMPLE ENGAGEMENT</h2>
              <div className="grid gap-4 text-sm text-[#3F3F3F] md:grid-cols-2">
                <div>
                  <span className="font-medium text-[#5D5838]">Location:</span> {location.exampleCapability.location}
                </div>
                <div>
                  <span className="font-medium text-[#5D5838]">Situation:</span> {location.exampleCapability.situation}
                </div>
                <div>
                  <span className="font-medium text-[#5D5838]">Our Approach:</span> {location.exampleCapability.ourApproach}
                </div>
                <div>
                  <span className="font-medium text-[#5D5838]">Expected Outcome:</span> {location.exampleCapability.expectedOutcome}
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Common Questions</p>
              <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">FREQUENTLY ASKED QUESTIONS</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {location.faqs.map((faq) => (
                <details key={faq.question} className="group border border-[#5D5838]/10 p-6">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-[#5D5838]">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-[#5D5838] transition-transform duration-200 group-open:rotate-45">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* View All Locations */}
          <div className="text-center">
            <Link href="/locations" className="inline-flex border border-[#5D5838] px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
              View all {locations.length} locations
            </Link>
          </div>

          <CTASection locationName={location.name} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
    </>
  );
}
