import Link from "next/link";
import { PHONE_E164, PHONE_DISPLAY } from "../lib/config/site";

type CTASectionProps = {
  serviceName?: string;
  locationName?: string;
  variant?: "default" | "dark";
};

export function CTASection({ serviceName, locationName, variant = "default" }: CTASectionProps) {
  const projectType = serviceName || locationName || "";
  const contactHref = projectType ? `/contact?projectType=${encodeURIComponent(projectType)}#lead-form` : "/contact#lead-form";

  if (variant === "dark") {
    return (
      <section className="bg-[#14213D] py-20 text-[#F9F9F8]">
        <div className="container mx-auto max-w-4xl px-6 sm:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to start your 1031 exchange?
            </h2>
            <p className="text-lg leading-relaxed text-[#E8E9ED]">
              Connect with a Philadelphia exchange advisor to discuss your replacement property goals and timeline.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center rounded-full bg-[#B68F40] px-8 py-3 text-base font-semibold text-[#F9F9F8] transition-colors hover:bg-[#8A6B2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9F9F8]"
              >
                Contact Advisor
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center justify-center rounded-full border border-[#F0E8D8] px-8 py-3 text-base font-semibold text-[#F9F9F8] transition-colors hover:border-transparent hover:bg-[#F0E8D8] hover:text-[#14213D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9F9F8]"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <p className="text-xs text-[#E8E9ED]">
              Educational content only. Not tax or legal advice.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F4F3EE] py-20">
      <div className="container mx-auto max-w-4xl px-6 sm:px-8">
        <div className="rounded-3xl border border-[#D8D2C4] bg-white p-8 shadow-sm text-center space-y-6">
          <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">
            Ready to start your 1031 exchange?
          </h2>
          <p className="text-lg leading-relaxed text-[#353535]">
            Connect with a Philadelphia exchange advisor to discuss your replacement property goals and timeline.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-[#B68F40] px-8 py-3 text-base font-semibold text-[#F9F9F8] transition-colors hover:bg-[#8A6B2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]"
            >
              Contact Advisor
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex items-center justify-center rounded-full border border-[#14213D] px-8 py-3 text-base font-semibold text-[#14213D] transition-colors hover:bg-[#14213D] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]"
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

