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
    <>
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Terms of Service" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Legal</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">TERMS OF SERVICE</h1>
            <p className="text-sm text-white/60">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Agreement</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">ACCEPTANCE OF TERMS</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Usage</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">USE OF WEBSITE</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                This website provides educational information about 1031 exchanges and property identification services. You may use this website for lawful purposes only and in accordance with these terms.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Disclaimer</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">NOT PROFESSIONAL ADVICE</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                The content on this website is for educational purposes only and does not constitute tax, legal, or investment advice. This site is not a Qualified Intermediary, law firm, broker, or CPA. You should consult with qualified professionals including a Qualified Intermediary and tax advisor before making decisions related to 1031 exchanges.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Warranties</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">NO WARRANTIES</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                We make no warranties or representations about the accuracy, completeness, or reliability of the information on this website. The information is provided as is without warranty of any kind.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Liability</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">LIMITATION OF LIABILITY</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on its content.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">IP Rights</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">INTELLECTUAL PROPERTY</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                All content on this website, including text, graphics, logos, and software, is the property of {SITE_NAME} or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">External Links</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">LINKS TO THIRD PARTY SITES</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                Our website may contain links to third party websites. We are not responsible for the content or privacy practices of these external sites.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Changes</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">MODIFICATIONS</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Questions</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">CONTACT INFORMATION</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                If you have questions about these terms, please contact us at {CONTACT_EMAIL}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
