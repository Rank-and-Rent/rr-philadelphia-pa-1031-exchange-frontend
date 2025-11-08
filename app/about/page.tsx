import type { Metadata } from "next";
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
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Us</p>
          <h1 className="text-4xl font-semibold text-heading">
            Precision exchange advisory for {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </h1>
          <p className="text-lg text-[#3F3F3F]">
            {SITE_NAME} helps investors, attorneys, and CPAs manage Section 1031 exchanges with disciplined planning, transparent communication, and verifiable documentation. We operate as an advisory and project management partner alongside your qualified intermediary.
          </p>
        </div>
      </section>
      <section className="container space-y-16 bg-white py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <article className="space-y-6">
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-2xl font-semibold text-heading">What we do.</h2>
              <p className="mt-3 text-sm text-[#3F3F3F]">
                This site is focused on helping you identify potential replacement properties for Section 1031 exchanges. We provide property identification support, market research, and underwriting assistance to help investors find suitable like kind replacement assets.
              </p>
              <p className="mt-3 text-sm text-[#3F3F3F]">
                Secure intake procedures capture project details using encrypted submission channels. Intake questionnaires feed directly into our property matching workflow, where analysts assemble candidate lists and diligence requests that comply with Pennsylvania and federal guidance.
              </p>
            </div>
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-2xl font-semibold text-heading">How we collaborate.</h2>
              <ul className="mt-3 space-y-2 text-sm text-[#3F3F3F]">
                <li>• Coordinate with your selected qualified intermediary to track escrow, identification notices, and closing instructions.</li>
                <li>• Align lender underwriting checklists with exchange milestones to prevent last minute delays.</li>
                <li>• Facilitate attorney and CPA review of contracts, estoppels, and tax allocations to maintain compliance.</li>
                <li>• Provide weekly status reports summarizing identification progress, open diligence items, and approaching deadlines.</li>
                <li>• We can help you get in touch with tax professionals and qualified intermediaries, but we are not a Qualified Intermediary ourselves.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-2xl font-semibold text-heading">What we are not.</h2>
              <p className="mt-3 text-sm text-[#3F3F3F]">
                {SITE_NAME} is not a Qualified Intermediary, law firm, brokerage, or accounting practice. We do not take custody of client funds or offer legal or tax opinions. This site helps investors identify potential replacement properties for Section 1031 exchanges. We can also help you get in touch with tax professionals and qualified intermediaries, but we are not a Qualified Intermediary. Instead, we coordinate with your trusted professionals to keep transactions organized, documented, and on schedule.
              </p>
            </div>
          </article>
          <aside className="space-y-8">
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-xl font-semibold text-heading">Talk with an exchange advisor.</h2>
              <p className="mt-3 text-sm text-[#3F3F3F]">
                Call {PHONE_DISPLAY} or email {CONTACT_EMAIL} to schedule an intake session. We respond within one business day.
              </p>
              <a
                href="/contact#lead-form"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
              >
                Contact advisor
              </a>
            </div>
            <IdentificationRulesExplainer />
            <DeadlineCalculator />
          </aside>
        </div>
        <CTASection />
      </section>
    </div>
  );
}

