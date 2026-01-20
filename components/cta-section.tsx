import Link from "next/link";
import { PHONE_E164, PHONE_DISPLAY } from "../lib/config/site";

type CTASectionProps = {
  serviceName?: string;
  locationName?: string;
  variant?: "default" | "dark";
};

export function CTASection({ serviceName, locationName, variant = "default" }: CTASectionProps) {
  const projectType = serviceName || locationName || "";
  const contactHref = projectType ? `/contact?projectType=${encodeURIComponent(projectType)}#contact-form` : "/contact#contact-form";

  if (variant === "dark") {
    return (
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container mx-auto max-w-4xl px-6 sm:px-8">
          <div className="text-center space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Get Started</p>
            <h2 className="text-3xl font-normal tracking-wide sm:text-4xl">
              READY TO START YOUR 1031 EXCHANGE?
            </h2>
            <p className="text-base leading-relaxed text-white/80">
              Connect with a Philadelphia exchange advisor to discuss your replacement property goals and timeline.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center border border-white px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[#5D5838]"
              >
                Contact Advisor
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center justify-center bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838] transition-colors hover:bg-white/90"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <p className="text-xs text-white/60">
              Educational content only. Not tax or legal advice.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-6 sm:px-8">
        <div className="border border-[#5D5838]/20 bg-white p-10 text-center space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5D5838]">Get Started</p>
          <h2 className="text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">
            READY TO START YOUR 1031 EXCHANGE?
          </h2>
          <p className="text-base leading-relaxed text-[#3F3F3F]">
            Connect with a Philadelphia exchange advisor to discuss your replacement property goals and timeline.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center bg-[#5D5838] px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#454326]"
            >
              Contact Advisor
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex items-center justify-center border border-[#5D5838] px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-xs text-[#6B6B6B]">
            Educational content only. Not tax or legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}
