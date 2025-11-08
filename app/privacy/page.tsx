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
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold text-heading">Privacy Policy</h1>
          <p className="text-sm text-[#3F3F3F]">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="container space-y-8 bg-white py-16">
        <div className="prose prose-sm max-w-none text-[#3F3F3F]">
          <h2 className="text-2xl font-semibold text-heading">Information We Collect</h2>
          <p>
            When you use our website or contact us, we may collect information including your name, email address, phone number, company name, and details about your 1031 exchange project. We collect this information when you voluntarily submit it through our contact forms or other communication channels.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">How We Use Your Information</h2>
          <p>
            We use the information you provide to respond to your inquiries, deliver exchange advisory services, send transactional emails, and improve our website. We do not sell your personal information to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security of your data.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Third Party Services</h2>
          <p>
            We use third party services including SendGrid for email delivery, Cloudflare Turnstile for spam prevention, and Zapier for workflow automation. These services may process your information in accordance with their own privacy policies.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar tracking technologies to improve functionality and analyze usage. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. To exercise these rights, contact us at {CONTACT_EMAIL}.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the last modified date.
          </p>

          <h2 className="text-2xl font-semibold text-heading mt-8">Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at {CONTACT_EMAIL}.
          </p>
        </div>
      </section>
    </div>
  );
}

