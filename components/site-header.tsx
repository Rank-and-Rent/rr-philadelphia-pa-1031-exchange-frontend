"use client";

import Link from "next/link";
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

const FEATURED_LOCATION_SLUGS = [
  "center-city-philadelphia-pa",
  "university-city-philadelphia-pa",
  "fishtown-philadelphia-pa",
  "manayunk-philadelphia-pa",
  "king-of-prussia-pa",
  "conshohocken-pa",
  "bala-cynwyd-pa",
  "old-city-philadelphia-pa",
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
    const centerCity = locationsData.find((loc) => loc.slug === "center-city-philadelphia-pa");
    const others = FEATURED_LOCATION_SLUGS.filter((slug) => slug !== "center-city-philadelphia-pa")
      .map((slug) => locationsData.find((location) => location.slug === slug))
      .filter((location): location is NonNullable<typeof location> => Boolean(location));
    return centerCity ? [centerCity, ...others] : others;
  }, []);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 border-b border-outline/20 bg-[#F9F9F8]/95 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-base font-semibold text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            1031 Exchange Philadelphia
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[#1B1B1B] lg:flex">
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
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-medium transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Services
                <span aria-hidden>{openMenu === "services" ? "▴" : "▾"}</span>
              </button>
              {openMenu === "services" ? (
                <div className="absolute left-0 top-full mt-3 w-[460px] rounded-2xl border border-outline/15 bg-white p-4 shadow-lg">
                  <div className="grid gap-3">
                    {featuredServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block rounded-xl p-3 transition-colors hover:bg-panel"
                      >
                        <p className="font-semibold text-heading">{service.name}</p>
                        <p className="mt-1 text-xs text-[#3F3F3F]">{service.short}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-xs font-semibold text-primary">
                    <Link href="/services" className="underline underline-offset-4">
                      View all services
                    </Link>
                    <Link href="/resources/timeline" className="underline underline-offset-4">
                      Timeline reminders
                    </Link>
                  </div>
                </div>
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
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-medium transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Locations
                <span aria-hidden>{openMenu === "locations" ? "▴" : "▾"}</span>
              </button>
              {openMenu === "locations" ? (
                <div className="absolute left-0 top-full mt-3 w-[420px] rounded-2xl border border-outline/15 bg-white p-4 shadow-lg">
                  <div className="grid gap-3">
                    {featuredLocations.map((location) => (
                      <Link
                        key={location.slug}
                        href={`/locations/${location.slug}`}
                        className="block rounded-xl p-3 transition-colors hover:bg-panel"
                      >
                        <p className="font-semibold text-heading">{location.name}</p>
                        {location.short ? <p className="mt-1 text-xs text-[#3F3F3F]">{location.short}</p> : null}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-semibold text-primary">
                    <Link href="/locations" className="underline underline-offset-4">
                      View all locations
                    </Link>
                  </div>
                </div>
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
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-medium transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Tools
                <span aria-hidden>{openMenu === "tools" ? "▴" : "▾"}</span>
              </button>
              {openMenu === "tools" ? (
                <div className="absolute left-0 top-full mt-3 w-[380px] rounded-2xl border border-outline/15 bg-white p-4 shadow-lg">
                  <div className="grid gap-3">
                    {TOOLS.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block rounded-xl p-3 transition-colors hover:bg-panel"
                      >
                        <p className="font-semibold text-heading">{tool.name}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-semibold text-primary">
                    <Link href="/tools" className="underline underline-offset-4">
                      View all tools
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
            <Link
              href="/about"
              className="rounded-full px-3 py-2 font-medium transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-2 font-medium transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:inline-flex"
            href="/contact#lead-form"
          >
            Contact Advisor
          </a>
          <a
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:inline-flex"
            href={`tel:${PHONE_E164}`}
          >
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="rounded-full border border-outline px-3 py-2 text-sm font-semibold text-heading transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-outline/15 bg-white px-6 py-8 text-sm text-[#1B1B1B] lg:hidden"
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Services</p>
              <ul className="mt-3 space-y-2">
                {featuredServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl border border-outline/15 px-3 py-2 font-medium"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-outline/15 px-3 py-2 font-semibold text-primary"
                  >
                    View all services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Locations</p>
              <ul className="mt-3 space-y-2">
                {featuredLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl border border-outline/15 px-3 py-2 font-medium"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locations"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-outline/15 px-3 py-2 font-semibold text-primary"
                  >
                    View all locations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Tools</p>
              <ul className="mt-3 space-y-2">
                {TOOLS.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl border border-outline/15 px-3 py-2 font-medium"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-outline/15 px-3 py-2 font-semibold text-primary"
                  >
                    View all tools
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border border-outline/15 px-3 py-2 font-medium"
              >
                About
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border border-outline/15 px-3 py-2 font-medium"
              >
                Blog
              </Link>
              <Link
                href="/contact#lead-form"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border border-outline/15 px-3 py-2 font-semibold text-primary"
              >
                Contact Advisor
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="block rounded-xl border border-outline/15 px-3 py-2 font-semibold text-primary"
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

