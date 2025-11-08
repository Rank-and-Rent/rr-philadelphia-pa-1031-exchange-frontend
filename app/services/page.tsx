import type { Metadata } from "next";
import { services } from "../../lib/data/services";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { ServicesBrowser } from "../../components/services/services-browser";
import { IdentificationRulesExplainer } from "../../components/widgets/identification-rules-explainer";
import { DeadlineCalculator } from "../../components/widgets/deadline-calculator";
import { TimelineTracker } from "../../components/widgets/timeline-tracker";
import { CTASection } from "../../components/cta-section";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../lib/config/site";
import { faqPageSchema } from "../../lib/schema";

const faqItems = [
  {
    question: "Do you provide replacement property sourcing across Philadelphia, PA?",
    answer:
      "Yes. Our scouting desk covers Center City, University City, Fishtown, and suburban corridors, preparing identification schedules that align with Pennsylvania transfer tax and documentation rules.",
  },
  {
    question: "Can you coordinate lender approvals during the 1031 exchange timeline?",
    answer:
      "We run concurrent lender checklists, appraisal orders, and credit approvals to ensure financing is ready ahead of the one hundred eighty day deadline.",
  },
  {
    question: "How do you support improvement exchanges in Pennsylvania?",
    answer:
      "We manage construction schedules, draw controls, and qualified intermediary reporting so improvements performed in Pennsylvania remain within IRS guidelines.",
  },
];

export const metadata: Metadata = {
  title: "Exchange Services | 1031 Exchange Philadelphia",
  description:
    "Explore comprehensive 1031 exchange services for investors, attorneys, and CPAs in Philadelphia, PA including identification strategy, underwriting, and timeline control.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service Catalogue</p>
            <h1 className="text-4xl font-semibold text-heading">Exchange Services in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.</h1>
            <p className="text-lg text-[#3F3F3F]">
              Select from replacement property sourcing, underwriting, compliance, and timeline management programs built for investors completing Section 1031 exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-16 py-16">
        <ServicesBrowser services={services} />
        <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
          <IdentificationRulesExplainer />
          <DeadlineCalculator />
        </div>
        <TimelineTracker />
        <section className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-heading">Common questions.</h2>
          <div className="mt-4 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-2xl border border-outline/15 bg-panel p-4">
                <summary className="cursor-pointer text-sm font-semibold text-heading">{item.question}</summary>
                <p className="mt-2 text-sm text-[#3F3F3F]">{item.answer}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqItems)) }}
          />
        </section>
        <CTASection />
      </section>
    </>
  );
}

