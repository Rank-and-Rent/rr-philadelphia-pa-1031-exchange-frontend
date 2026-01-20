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
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Service Catalogue</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">EXCHANGE SERVICES IN {PRIMARY_CITY.toUpperCase()}, {PRIMARY_STATE_ABBR}</h1>
            <p className="text-base leading-relaxed text-white/80">
              Select from replacement property sourcing, underwriting, compliance, and timeline management programs built for investors completing Section 1031 exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-20">
          <ServicesBrowser services={services} />
          
          <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
            <IdentificationRulesExplainer />
            <DeadlineCalculator />
          </div>
          
          <TimelineTracker />
          
          {/* FAQ Section */}
          <section className="border border-[#5D5838]/10 p-8">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Common Questions</p>
            <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="mt-8 space-y-0 divide-y divide-[#5D5838]/10">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-6">
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
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqItems)) }}
            />
          </section>
          
          <CTASection />
        </div>
      </section>
    </>
  );
}
