import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "../../components/breadcrumbs";
import {
  SITE_URL,
  SITE_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE_DISPLAY,
  CONTACT_EMAIL,
} from "../../lib/config/site";
import { IdentificationRulesExplainer } from "../../components/widgets/identification-rules-explainer";
import { DeadlineCalculator } from "../../components/widgets/deadline-calculator";
import { CTASection } from "../../components/cta-section";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description:
    "Learn how 1031 Exchange Philadelphia guides investors through compliant exchange workflows with secure intake, property matching, and coordination with qualified intermediaries.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">About Us</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">
              PRECISION EXCHANGE ADVISORY FOR {PRIMARY_CITY.toUpperCase()}, {PRIMARY_STATE_ABBR}
            </h1>
            <p className="text-base leading-relaxed text-white/80">
              {SITE_NAME} helps investors, attorneys, and CPAs manage Section 1031 exchanges with disciplined planning, transparent communication, and verifiable documentation.
            </p>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                Whether relocating your investment portfolio, acquiring a secondary property, or planning an in-state repositioning, {SITE_NAME} is the top choice for investors and advisors who seek high quality representation and optimal results.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                We bring a wealth of knowledge of the Philadelphia market, strength in negotiation, and wisdom and persistence in working through any challenges encountered along the way.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                We operate as an advisory and project management partner alongside your qualified intermediary.
              </p>
              <a
                href="/contact#lead-form"
                className="mt-8 inline-flex items-center justify-center bg-[#5D5838] px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#454326]"
              >
                Contact Advisor
              </a>
            </div>
            
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/1031-exchange-philadelphia.jpg"
                alt="Philadelphia 1031 Exchange Services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container space-y-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
            <article className="space-y-8">
              <div className="border-t border-[#5D5838]/20 pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Our Role</p>
                <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">WHAT WE DO</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  This site is focused on helping you identify potential replacement properties for Section 1031 exchanges. We provide property identification support, market research, and underwriting assistance to help investors find suitable like kind replacement assets.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  Secure intake procedures capture project details using encrypted submission channels. Intake questionnaires feed directly into our property matching workflow, where analysts assemble candidate lists and diligence requests that comply with Pennsylvania and federal guidance.
                </p>
              </div>
              
              <div className="border-t border-[#5D5838]/20 pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Process</p>
                <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">HOW WE COLLABORATE</h2>
                <ul className="mt-4 space-y-3 text-sm text-[#3F3F3F]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5838]">•</span>
                    Coordinate with your selected qualified intermediary to track escrow, identification notices, and closing instructions.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5838]">•</span>
                    Align lender underwriting checklists with exchange milestones to prevent last minute delays.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5838]">•</span>
                    Facilitate attorney and CPA review of contracts, estoppels, and tax allocations to maintain compliance.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5838]">•</span>
                    Provide weekly status reports summarizing identification progress, open diligence items, and approaching deadlines.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5838]">•</span>
                    We can help you get in touch with tax professionals and qualified intermediaries, but we are not a Qualified Intermediary ourselves.
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-[#5D5838]/20 pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Disclaimer</p>
                <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">WHAT WE ARE NOT</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  {SITE_NAME} is not a Qualified Intermediary, law firm, brokerage, or accounting practice. We do not take custody of client funds or offer legal or tax opinions. This site helps investors identify potential replacement properties for Section 1031 exchanges. We can also help you get in touch with tax professionals and qualified intermediaries, but we are not a Qualified Intermediary. Instead, we coordinate with your trusted professionals to keep transactions organized, documented, and on schedule.
                </p>
              </div>
            </article>
            
            <aside className="space-y-8">
              <div className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Get Started</p>
                <h2 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">TALK WITH AN EXCHANGE ADVISOR</h2>
                <p className="mt-4 text-sm text-[#3F3F3F]">
                  Call {PHONE_DISPLAY} or email {CONTACT_EMAIL} to schedule an intake session. We respond within one business day.
                </p>
                <a
                  href="/contact#lead-form"
                  className="mt-6 inline-flex bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326]"
                >
                  Contact advisor
                </a>
              </div>
              <IdentificationRulesExplainer />
              <DeadlineCalculator />
            </aside>
          </div>
          
          <CTASection />
        </div>
      </section>
    </>
  );
}
