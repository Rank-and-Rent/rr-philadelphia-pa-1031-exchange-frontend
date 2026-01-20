import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../../lib/data/services";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { RelatedServicesPanel } from "../../../components/services/related-services-panel";
import { IdentificationLetterHelper } from "../../../components/widgets/identification-letter-helper";
import { DeadlineCalculator } from "../../../components/widgets/deadline-calculator";
import { TimelineTracker } from "../../../components/widgets/timeline-tracker";
import { IdentificationRulesExplainer } from "../../../components/widgets/identification-rules-explainer";
import { CTASection } from "../../../components/cta-section";
import { SITE_URL } from "../../../lib/config/site";
import { createBreadcrumbSchema, createServiceSchema, faqPageSchema } from "../../../lib/schema";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    return {};
  }
  return {
    title: service.metadata.title,
    description: service.metadata.description,
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  const relatedServices = service.related
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.name, url: `${SITE_URL}/services/${service.slug}` },
  ]);

  const serviceSchema = createServiceSchema(service);
  const faqSchema = faqPageSchema(service.faqs);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Service Detail</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">{service.name.toUpperCase()}</h1>
            <p className="text-base leading-relaxed text-white/80">{service.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
            <article className="space-y-10">
              {/* Main Description */}
              {service.mainDescription ? (
                <div
                  className="space-y-4 text-sm leading-relaxed text-[#3F3F3F] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.mainDescription }}
                />
              ) : (
                <div className="space-y-4">
                  {service.overview.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-[#3F3F3F]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              
              {/* Inclusions */}
              <div className="border-t border-[#5D5838]/20 pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Deliverables</p>
                <h2 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">WHAT THIS INCLUDES</h2>
                <ul className="mt-4 space-y-3 text-sm text-[#3F3F3F]">
                  {(service.inclusions && service.inclusions.length > 0
                    ? service.inclusions
                    : service.deliverables
                  ).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#5D5838]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Situations */}
              {service.commonSituations && service.commonSituations.length > 0 && (
                <div className="border-t border-[#5D5838]/20 pt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Use Cases</p>
                  <h2 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">COMMON SITUATIONS</h2>
                  <ul className="mt-4 space-y-3 text-sm text-[#3F3F3F]">
                    {service.commonSituations.map((situation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#5D5838]">•</span>
                        {situation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Example Capability */}
              {service.exampleCapability && (
                <div className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838] mb-4">
                    {service.exampleCapability.disclaimer}
                  </p>
                  <h2 className="text-xl font-normal tracking-wide text-[#5D5838] mb-6">EXAMPLE ENGAGEMENT</h2>
                  <div className="space-y-3 text-sm text-[#3F3F3F]">
                    <div>
                      <span className="font-medium text-[#5D5838]">Service:</span> {service.exampleCapability.serviceType}
                    </div>
                    <div>
                      <span className="font-medium text-[#5D5838]">Location:</span> {service.exampleCapability.location}
                    </div>
                    <div>
                      <span className="font-medium text-[#5D5838]">Scope:</span> {service.exampleCapability.scope}
                    </div>
                    <div>
                      <span className="font-medium text-[#5D5838]">Client Situation:</span> {service.exampleCapability.clientSituation}
                    </div>
                    <div>
                      <span className="font-medium text-[#5D5838]">Our Approach:</span> {service.exampleCapability.ourApproach}
                    </div>
                    <div>
                      <span className="font-medium text-[#5D5838]">Expected Outcome:</span> {service.exampleCapability.expectedOutcome}
                    </div>
                    {service.exampleCapability.contactCTA && (
                      <div className="mt-4 pt-4 border-t border-[#5D5838]/10">
                        <p className="text-sm text-[#3F3F3F]">{service.exampleCapability.contactCTA}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Compliance Note */}
              {service.complianceNote && (
                <div className="border border-[#5D5838]/10 bg-[#F8F7F4] p-6">
                  <p className="text-xs italic text-[#3F3F3F]">{service.complianceNote}</p>
                </div>
              )}
            </article>
            
            <aside className="space-y-8">
              <IdentificationRulesExplainer />
              <DeadlineCalculator />
              <TimelineTracker />
            </aside>
          </div>

          {/* FAQ */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Common Questions</p>
              <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">FREQUENTLY ASKED QUESTIONS ABOUT THIS SERVICE</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {service.faqs.map((item) => (
                <details key={item.question} className="group border border-[#5D5838]/10 p-6">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-[#5D5838]">
                    {item.question}
                    <span className="ml-4 flex-shrink-0 text-[#5D5838] transition-transform duration-200 group-open:rotate-45">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Services */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Explore More</p>
              <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">RELATED SERVICES</h2>
            </div>
            <RelatedServicesPanel services={relatedServices} />
          </section>

          <IdentificationLetterHelper />
          <CTASection serviceName={service.name} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema]) }}
      />
    </>
  );
}
