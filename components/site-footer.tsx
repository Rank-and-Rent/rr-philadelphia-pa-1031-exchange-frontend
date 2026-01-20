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
  OFFICE_ADDRESS_FULL,
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
    <footer className="border-t border-[#5D5838]/10 bg-white">
      {/* Social Icons Row */}
      <div className="border-b border-[#5D5838]/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </a>
            <a href={`tel:${PHONE_E164}`} aria-label="Phone" className="flex h-9 w-9 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold text-[#5D5838]">{SITE_NAME}</p>
            <p className="text-sm text-[#3F3F3F]">Direct: {PHONE_DISPLAY}</p>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container grid gap-12 py-12 lg:grid-cols-[1.2fr,1fr,1fr,1fr,1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">1031 Exchange Advisory</p>
          <h2 className="mt-3 text-xl font-semibold text-[#5D5838]">{SITE_NAME}</h2>
          <p className="mt-4 text-sm text-[#3F3F3F]">
            Exchange advisory for investors, attorneys, CPAs, and institutional partners requiring disciplined Section 1031 execution in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="mt-6 space-y-2 text-sm text-[#1B1B1B]">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Contact</p>
            <a className="block text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]" href={`tel:${PHONE_E164}`}>
              {PHONE_DISPLAY}
            </a>
            <a className="block text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <p className="text-[#3F3F3F]">{BUSINESS_HOURS}</p>
            <p className="text-[#3F3F3F]">{HAS_STAFFED_OFFICE ? OFFICE_ADDRESS : "Serving clients across Pennsylvania."}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/services">
                View all services
              </Link>
            </li>
            {serviceLinks.map((service) => (
              <li key={service.slug}>
                <Link className="transition-colors hover:text-[#5D5838]" href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Locations</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/locations">
                View all {locationLinks.length} locations
              </Link>
            </li>
            {locationLinks.map((location) => (
              <li key={location.slug}>
                <Link className="transition-colors hover:text-[#5D5838]" href={`/locations/${location.slug}`}>
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-[#5D5838]" href="/sitemap.xml">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Tools</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
            {toolLinks.map((tool) => (
              <li key={tool.href}>
                <Link className="transition-colors hover:text-[#5D5838]" href={tool.href}>
                  {tool.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link className="transition-colors hover:text-[#5D5838]" href="/tools">
                View all tools
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">
            Our Location
          </p>
          <div className="overflow-hidden border border-[#5D5838]/10">
            <iframe
              title={`${SITE_NAME} Office Location - ${OFFICE_ADDRESS_FULL}`}
              aria-label={`${SITE_NAME} office location at ${OFFICE_ADDRESS_FULL}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS_FULL)}&output=embed`}
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
      <div className="border-t border-[#5D5838]/10 bg-[#F8F7F4]">
        <div className="container flex flex-col gap-2 py-4 text-xs text-[#3F3F3F] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>
            <span className="font-medium text-[#5D5838]">Canonical:</span>{" "}
            <a className="underline underline-offset-4 hover:text-[#5D5838]" href={SITE_URL}>
              {SITE_URL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

