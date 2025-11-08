import Link from "next/link";
import { services } from "../lib/data/services";
import { locations } from "../lib/data/locations";
import {
  SITE_NAME,
  PHONE_DISPLAY,
  PHONE_E164,
  CONTACT_EMAIL,
  BUSINESS_HOURS,
  HAS_STAFFED_OFFICE,
  OFFICE_ADDRESS,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "../lib/config/site";

const serviceLinks = services;
const locationLinks = locations;
const toolLinks = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-outline/15 bg-white">
      <div className="container grid gap-12 py-12 lg:grid-cols-[1.2fr,1fr,1fr,1fr,1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">1031 Exchange Advisory</p>
          <h2 className="mt-3 text-2xl font-semibold text-heading">{SITE_NAME}</h2>
          <p className="mt-4 text-sm text-[#3F3F3F]">
            Exchange advisory for investors, attorneys, CPAs, and institutional partners requiring disciplined Section 1031 execution in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="mt-6 space-y-2 text-sm text-[#1B1B1B]">
            <p className="font-semibold text-heading">Contact</p>
            <a className="block underline underline-offset-4" href={`tel:${PHONE_E164}`}>
              {PHONE_DISPLAY}
            </a>
            <a className="block underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <p>{BUSINESS_HOURS}</p>
            <p>{HAS_STAFFED_OFFICE ? OFFICE_ADDRESS : "Serving clients across Pennsylvania."}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            <li>
              <Link className="transition-colors hover:text-primary" href="/services">
                View all services
              </Link>
            </li>
            {serviceLinks.map((service) => (
              <li key={service.slug}>
                <Link className="transition-colors hover:text-primary" href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Locations</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            <li>
              <Link className="transition-colors hover:text-primary" href="/locations">
                View all locations
              </Link>
            </li>
            {locationLinks.map((location) => (
              <li key={location.slug}>
                <Link className="transition-colors hover:text-primary" href={`/locations/${location.slug}`}>
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            <li>
              <Link className="transition-colors hover:text-primary" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-primary" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-primary" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-primary" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-primary" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-primary" href="/sitemap.xml">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Tools</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            {toolLinks.map((tool) => (
              <li key={tool.href}>
                <Link className="transition-colors hover:text-primary" href={tool.href}>
                  {tool.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link className="transition-colors hover:text-primary" href="/tools">
                View all tools
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {PRIMARY_CITY} Map
          </p>
          <div className="overflow-hidden rounded-2xl border border-outline/15">
            <iframe
              title={`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Exchange Coverage Map`}
              aria-label={`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`)}&output=embed`}
              loading="lazy"
              className="h-48 w-full"
            />
          </div>
          <div className="space-y-3 text-xs text-[#3F3F3F]">
            <p>This site helps investors identify potential replacement properties for Section 1031 exchanges.</p>
            <p>This site is not a Qualified Intermediary, law firm, broker, or CPA.</p>
            <p>Users should consult a Qualified Intermediary and tax advisor before acting on exchange strategies.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-outline/15 bg-panel">
        <div className="container flex flex-col gap-2 py-4 text-xs text-[#3F3F3F] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>
            <span className="font-semibold text-heading">Canonical:</span>{" "}
            <a className="underline underline-offset-4" href={SITE_URL}>
              {SITE_URL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

