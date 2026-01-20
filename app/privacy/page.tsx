import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "../../lib/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "Privacy policy for 1031 Exchange Philadelphia. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Legal</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">PRIVACY POLICY</h1>
            <p className="text-sm text-white/60">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Data Collection</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">INFORMATION WE COLLECT</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                When you use our website or contact us, we may collect information including your name, email address, phone number, company name, and details about your 1031 exchange project. We collect this information when you voluntarily submit it through our contact forms or other communication channels.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Data Usage</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">HOW WE USE YOUR INFORMATION</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                We use the information you provide to respond to your inquiries, deliver exchange advisory services, send transactional emails, and improve our website. We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Security</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">DATA SECURITY</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security of your data.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Third Parties</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">THIRD PARTY SERVICES</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                We use third party services including SendGrid for email delivery, Cloudflare Turnstile for spam prevention, and Zapier for workflow automation. These services may process your information in accordance with their own privacy policies.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Tracking</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">COOKIES AND TRACKING</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                Our website may use cookies and similar tracking technologies to improve functionality and analyze usage. You can control cookie preferences through your browser settings.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">User Rights</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">YOUR RIGHTS</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                You have the right to access, update, or delete your personal information. To exercise these rights, contact us at {CONTACT_EMAIL}.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Updates</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">CHANGES TO THIS POLICY</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the last modified date.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Questions</p>
              <h2 className="text-xl font-normal tracking-wide text-[#5D5838]">CONTACT US</h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">
                If you have questions about this privacy policy, please contact us at {CONTACT_EMAIL}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
