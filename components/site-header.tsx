"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { PHONE_DISPLAY, PHONE_E164 } from "../lib/config/site";

type MenuKey = "services" | "locations" | "tools" | null;

const FEATURED_SERVICE_SLUGS = [
  "replacement-property-scouting-philadelphia",
  "multifamily-1031-identification-philadelphia",
  "industrial-flex-identification-philadelphia",
  "triple-net-retail-identification-philadelphia",
  "medical-office-1031-matching-philadelphia",
  "delaware-statutory-trust-placement-philadelphia",
  "reverse-exchange-structuring-philadelphia",
  "timeline-discipline-program-philadelphia",
];

// Featured locations: Philadelphia first, then most populous cities (7 total)
const FEATURED_LOCATION_SLUGS = [
  "center-city-philadelphia-pa", // Philadelphia - main location
  "wilmington-de", // Wilmington, DE - ~70k population
  "trenton-nj", // Trenton, NJ - ~90k population
  "west-chester-pa", // West Chester, PA - major suburban city
  "king-of-prussia-pa", // King of Prussia, PA - major commercial hub
  "conshohocken-pa", // Conshohocken, PA - major office market
  "bala-cynwyd-pa", // Bala Cynwyd, PA - Main Line
];

const TOOLS = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const featuredServices = useMemo(
    () =>
      FEATURED_SERVICE_SLUGS.map((slug) => servicesData.find((service) => service.slug === slug)).filter(
        (service): service is NonNullable<typeof service> => Boolean(service)
      ),
    []
  );

  const featuredLocations = useMemo(() => {
    return FEATURED_LOCATION_SLUGS.map((slug) => locationsData.find((location) => location.slug === slug))
      .filter((location): location is NonNullable<typeof location> => Boolean(location));
  }, []);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <header className="!sticky !top-0 z-[9999] border-b border-[#5D5838]/10 bg-white/98 backdrop-blur" style={{ position: 'sticky', top: 0, zIndex: 9999 }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]">
            <Image
              src="/1031-exchange-philadelphia-logo.png"
              alt="1031 Exchange Philadelphia"
              width={180}
              height={49}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
        <nav className="hidden items-center gap-1 text-sm lg:flex">
          <Link
            href="/"
            className="px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
          >
            Home
          </Link>
          <div
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              aria-expanded={openMenu === "services"}
              aria-haspopup="true"
              onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
            >
              Services
              <svg className={`h-3 w-3 transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMenu === "services" ? (
              <>
                <div className="absolute left-0 top-full h-3 w-full" onMouseEnter={() => setOpenMenu("services")} />
                <div
                  className="absolute left-0 top-full mt-3 w-[420px] border border-[#5D5838]/10 bg-white p-4 shadow-xl"
                  onMouseEnter={() => setOpenMenu("services")}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="grid gap-1">
                    {featuredServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block border-b border-[#5D5838]/5 px-3 py-3 transition-colors hover:bg-[#F8F7F4]"
                      >
                        <p className="text-sm font-medium text-[#5D5838]">{service.name}</p>
                        <p className="mt-1 text-xs text-[#3F3F3F]">{service.short}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                    <Link href="/services" className="underline underline-offset-4 hover:text-[#7A7654]">
                      View all services
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div
            onMouseEnter={() => setOpenMenu("locations")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              aria-expanded={openMenu === "locations"}
              aria-haspopup="true"
              onClick={() => setOpenMenu(openMenu === "locations" ? null : "locations")}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
            >
              Locations
              <svg className={`h-3 w-3 transition-transform ${openMenu === "locations" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMenu === "locations" ? (
              <>
                <div className="absolute left-0 top-full h-3 w-full" onMouseEnter={() => setOpenMenu("locations")} />
                <div
                  className="absolute left-0 top-full mt-3 w-[380px] border border-[#5D5838]/10 bg-white p-4 shadow-xl"
                  onMouseEnter={() => setOpenMenu("locations")}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="grid gap-1">
                    {featuredLocations.map((location) => (
                      <Link
                        key={location.slug}
                        href={`/locations/${location.slug}`}
                        className="block border-b border-[#5D5838]/5 px-3 py-3 transition-colors hover:bg-[#F8F7F4]"
                      >
                        <p className="text-sm font-medium text-[#5D5838]">{location.name}</p>
                        {location.short ? <p className="mt-1 text-xs text-[#3F3F3F]">{location.short}</p> : null}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                    <Link href="/locations" className="underline underline-offset-4 hover:text-[#7A7654]">
                      View all {locationsData.length} locations
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div
            onMouseEnter={() => setOpenMenu("tools")}
            onMouseLeave={() => setOpenMenu(null)}
            className="relative"
          >
            <button
              type="button"
              aria-expanded={openMenu === "tools"}
              aria-haspopup="true"
              onClick={() => setOpenMenu(openMenu === "tools" ? null : "tools")}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
            >
              Resources
              <svg className={`h-3 w-3 transition-transform ${openMenu === "tools" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMenu === "tools" ? (
              <>
                <div className="absolute left-0 top-full h-3 w-full" onMouseEnter={() => setOpenMenu("tools")} />
                <div
                  className="absolute left-0 top-full mt-3 w-[320px] border border-[#5D5838]/10 bg-white p-4 shadow-xl"
                  onMouseEnter={() => setOpenMenu("tools")}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="grid gap-1">
                    {TOOLS.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block border-b border-[#5D5838]/5 px-3 py-3 transition-colors hover:bg-[#F8F7F4]"
                      >
                        <p className="text-sm font-medium text-[#5D5838]">{tool.name}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                    <Link href="/tools" className="underline underline-offset-4 hover:text-[#7A7654]">
                      View all tools
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <Link
            href="/about"
            className="px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            className="hidden border border-[#5D5838] px-5 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838] md:inline-flex"
            href="/contact#lead-form"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="p-2 text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838] lg:hidden"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-[#5D5838]/10 bg-white px-6 py-8 text-sm text-[#1B1B1B] lg:hidden"
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Services</p>
              <ul className="mt-3 space-y-1">
                {featuredServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-[#5D5838]/5 px-3 py-3 font-medium text-[#5D5838]"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] underline underline-offset-4"
                  >
                    View all services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Locations</p>
              <ul className="mt-3 space-y-1">
                {featuredLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-[#5D5838]/5 px-3 py-3 font-medium text-[#5D5838]"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locations"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] underline underline-offset-4"
                  >
                    View all {locationsData.length} locations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Resources</p>
              <ul className="mt-3 space-y-1">
                {TOOLS.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-[#5D5838]/5 px-3 py-3 font-medium text-[#5D5838]"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] underline underline-offset-4"
                  >
                    View all tools
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-1 border-t border-[#5D5838]/10 pt-6">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 font-medium text-[#5D5838]"
              >
                About
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 font-medium text-[#5D5838]"
              >
                Blog
              </Link>
              <Link
                href="/contact#lead-form"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block bg-[#5D5838] px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.1em] text-white"
              >
                Contact Advisor
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="block border border-[#5D5838] px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]"
                onClick={() => setMobileOpen(false)}
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

