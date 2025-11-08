import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { ContactForm } from "../../components/contact/contact-form";
import {
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "../../lib/config/site";

export const metadata: Metadata = {
  title: "Contact | 1031 Exchange Philadelphia",
  description:
    "Request 1031 exchange guidance for Philadelphia, PA. Share project details, timeline, and replacement property objectives.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="text-4xl font-semibold text-heading">
            Connect with a 1031 advisor in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </h1>
          <p className="text-lg text-[#3F3F3F]">
            Provide your exchange status, timelines, and property goals. We respond within one business day with next steps tailored to your transaction.
          </p>
        </div>
      </section>
      <section className="container space-y-12 bg-white py-16">
        <Suspense fallback={<div className="rounded-3xl border border-outline/15 bg-white p-8 shadow-xl">Loading form...</div>}>
          <ContactForm />
        </Suspense>
        <div className="rounded-3xl border border-outline/15 bg-panel p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-heading">
            We coordinate across Pennsylvania jurisdictions.
          </h2>
          <p className="mt-2 text-sm text-[#3F3F3F]">
            Our team manages exchanges across {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}, collar counties, and multi state portfolios requiring Pennsylvania legal review.
          </p>
          <div className="mt-4 overflow-hidden rounded-3xl border border-outline/15">
            <iframe
              title={`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Exchange Coverage`}
              aria-label={`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Exchange Coverage`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`)}&output=embed`}
              loading="lazy"
              className="h-64 w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

