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
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service Detail</p>
          <h1 className="text-4xl font-semibold text-heading">{service.name}</h1>
          <p className="text-lg text-[#3F3F3F]">{service.shortDescription}</p>
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <article className="space-y-6">
            {/* Main Description from batch data or fallback to overview */}
            {service.mainDescription ? (
              <div
                className="space-y-4 text-sm text-[#3F3F3F] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: service.mainDescription }}
              />
            ) : (
              <div className="space-y-4">
                {service.overview.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-[#3F3F3F]">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            
            {/* Inclusions from batch data or fallback to deliverables */}
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-xl font-semibold text-heading">What this includes.</h2>
              <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                {(service.inclusions && service.inclusions.length > 0
                  ? service.inclusions
                  : service.deliverables
                ).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Common Situations */}
            {service.commonSituations && service.commonSituations.length > 0 && (
              <div className="rounded-3xl border border-outline/15 bg-panel p-6">
                <h2 className="text-xl font-semibold text-heading">Common situations.</h2>
                <ul className="mt-4 space-y-3 text-sm text-[#3F3F3F]">
                  {service.commonSituations.map((situation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>{situation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Example Capability */}
            {service.exampleCapability && (
              <div className="rounded-3xl border border-outline/15 bg-panel p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  {service.exampleCapability.disclaimer}
                </p>
                <h2 className="text-xl font-semibold text-heading mb-4">Example engagement.</h2>
                <div className="space-y-3 text-sm text-[#3F3F3F]">
                  <div>
                    <span className="font-semibold text-heading">Service:</span> {service.exampleCapability.serviceType}
                  </div>
                  <div>
                    <span className="font-semibold text-heading">Location:</span> {service.exampleCapability.location}
                  </div>
                  <div>
                    <span className="font-semibold text-heading">Scope:</span> {service.exampleCapability.scope}
                  </div>
                  <div>
                    <span className="font-semibold text-heading">Client Situation:</span> {service.exampleCapability.clientSituation}
                  </div>
                  <div>
                    <span className="font-semibold text-heading">Our Approach:</span> {service.exampleCapability.ourApproach}
                  </div>
                  <div>
                    <span className="font-semibold text-heading">Expected Outcome:</span> {service.exampleCapability.expectedOutcome}
                  </div>
                  {service.exampleCapability.contactCTA && (
                    <div className="mt-4 pt-4 border-t border-outline/15">
                      <p className="text-sm text-[#3F3F3F]">{service.exampleCapability.contactCTA}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Compliance Note */}
            {service.complianceNote && (
              <div className="rounded-3xl border border-outline/15 bg-panel p-4">
                <p className="text-xs text-[#3F3F3F] italic">{service.complianceNote}</p>
              </div>
            )}
          </article>
          <aside className="space-y-8">
            <IdentificationRulesExplainer />
            <DeadlineCalculator />
            <TimelineTracker />
          </aside>
        </div>
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Frequently asked questions about this service.
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {service.faqs.map((item) => (
              <details key={item.question} className="rounded-3xl border border-outline/15 bg-panel p-4">
                <summary className="cursor-pointer text-sm font-semibold text-heading">{item.question}</summary>
                <p className="mt-2 text-sm text-[#3F3F3F]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">Related services.</h2>
          <RelatedServicesPanel services={relatedServices} />
        </section>
        <IdentificationLetterHelper />
        <CTASection serviceName={service.name} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema]) }}
      />
    </div>
  );
}

