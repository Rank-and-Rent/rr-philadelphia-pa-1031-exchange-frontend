import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "../../lib/config/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: "Terms of service for 1031 Exchange Philadelphia. Review our terms and conditions for using our website and services.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Service" },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold text-heading">Terms of Service</h1>
          <p className="text-sm text-[#3F3F3F]">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="container space-y-8 bg-white py-16">
        <div className="prose prose-sm max-w-none text-[#3F3F3F]">
          <h2 className="text-2xl font-semibold text-heading">Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Use of Website</h2>
          <p>
            This website provides educational information about 1031 exchanges and property identification services. You may use this website for lawful purposes only and in accordance with these terms.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Not Professional Advice</h2>
          <p>
            The content on this website is for educational purposes only and does not constitute tax, legal, or investment advice. This site is not a Qualified Intermediary, law firm, broker, or CPA. You should consult with qualified professionals including a Qualified Intermediary and tax advisor before making decisions related to 1031 exchanges.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">No Warranties</h2>
          <p>
            We make no warranties or representations about the accuracy, completeness, or reliability of the information on this website. The information is provided as is without warranty of any kind.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on its content.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of {SITE_NAME} or its content suppliers and is protected by copyright and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Links to Third Party Sites</h2>
          <p>
            Our website may contain links to third party websites. We are not responsible for the content or privacy practices of these external sites.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Contact Information</h2>
          <p>
            If you have questions about these terms, please contact us at {CONTACT_EMAIL}.
          </p>
        </div>
      </section>
    </div>
  );
}

