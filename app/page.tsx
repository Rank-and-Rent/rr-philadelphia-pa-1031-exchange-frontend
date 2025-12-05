import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Suspense } from "react";
import { services } from "../lib/data/services";
import { locations } from "../lib/data/locations";
import { HomeServiceGrid } from "../components/home/home-service-grid";
import { HomeLocationGrid } from "../components/home/home-location-grid";
import { ContactForm } from "../components/contact/contact-form";
import { getPropertyTypeImagePath } from "../lib/utils/images";
import {
  SITE_NAME,
  SITE_URL,
  OG_IMAGE_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  HAS_STAFFED_OFFICE,
  OFFICE_ADDRESS,
} from "../lib/config/site";
import { faqPageSchema, baseWebSiteSchema, organizationSchema, contactPointSchema } from "../lib/schema";

type Feature = {
  title: string;
  description: string;
};

type PropertyType = {
  title: string;
  description: string;
  slug: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type FeaturedServiceCard = {
  title: string;
  description: string;
  slug: string;
};

type FeaturedLocationCard = {
  name: string;
  description: string;
  slug: string;
};

const HERO_BADGES = ["Property Identification", "45-Day Deadline", "Market Analysis"];

const FEATURES: Feature[] = [
  {
    title: "Local Compliance Expertise",
    description:
      "Deep understanding of Pennsylvania transfer and recording taxes keeps your exchange documentation accurate at both the state and county levels.",
  },
  {
    title: "IRS-Aligned Process",
    description:
      "Every exchange follows Treasury safe harbors, including written identification lists, escrow segregation, and Form 8824 reconciliation.",
  },
  {
    title: "Comprehensive Property Identification",
    description:
      "We identify replacement properties across Philadelphia and nationwide, evaluating market fundamentals, financing readiness, and compliance with IRS exchange rules.",
  },
  {
    title: "Attorney and CPA Coordination",
    description:
      "Philadelphia real estate attorneys and tax advisors available for document review, risk briefings, and closing support.",
  },
  {
    title: "Deadline Discipline",
    description:
      "Integrated tracking for the 45 day identification milestone and the 180 day closing requirement keeps every stakeholder aligned.",
  },
];

const HOME_SERVICE_CARDS: FeaturedServiceCard[] = [
  {
    title: "Forward Exchange Structuring",
    description:
      "Document qualified forward exchanges with escrow setup, assignment agreements, and replacement property due diligence.",
    slug: "forward-exchange-structuring-philadelphia",
  },
  {
    title: "Reverse Exchange Coordination",
    description:
      "Coordinate reverse exchanges with exchange accommodation titleholders, financing review, and IRS safe harbor compliance.",
    slug: "reverse-exchange-structuring-philadelphia",
  },
  {
    title: "Improvement Exchange Planning",
    description:
      "Manage construction escrow controls and cost certifications for improvement or build-to-suit exchange strategies.",
    slug: "improvement-exchange-construction-philadelphia",
  },
  {
    title: "Delaware Statutory Trust Reviews",
    description:
      "Evaluate DST offerings for suitability, sponsor strength, and alignment with reinvestment objectives.",
    slug: "delaware-statutory-trust-placement-philadelphia",
  },
];

const HOME_SERVICE_SLUGS = HOME_SERVICE_CARDS.map((card) => card.slug);

const PROPERTY_TYPES: PropertyType[] = [
  {
    title: "Multifamily Communities",
    description:
      "Rebalance portfolios into stabilized or value-add apartments with local market analytics and rent roll review.",
    slug: "multifamily-communities",
  },
  {
    title: "Triple Net Retail",
    description:
      "Leverage NNN leases for predictable income, national tenant credit, and low-touch asset management.",
    slug: "triple-net-retail",
  },
  {
    title: "Industrial Flex Buildings",
    description:
      "Capture logistics demand with flex and last-mile facilities backed by tenant estoppels and zoning clarity.",
    slug: "industrial-flex-buildings",
  },
  {
    title: "Medical Office",
    description:
      "Pair health system tenancy with long-term appreciation and regulatory compliance support.",
    slug: "medical-office",
  },
  {
    title: "Hospitality Assets",
    description:
      "Reposition boutique, extended-stay, or limited-service hotels with experienced operators and cash flow modeling.",
    slug: "hospitality-assets",
  },
  {
    title: "Land for Development",
    description:
      "Acquire shovel-ready parcels with entitlement tracking, title review, and construction sequencing.",
    slug: "land-for-development",
  },
];

const HOME_LOCATION_CARDS: FeaturedLocationCard[] = [
  {
    name: "Philadelphia, PA",
    description: "Class A mixed use, office-to-residential conversions, and institutional retail corridors.",
    slug: "center-city-philadelphia-pa",
  },
  {
    name: "University City Philadelphia, PA",
    description: "Life science, student housing, and innovation district projects near research institutions.",
    slug: "university-city-philadelphia-pa",
  },
  {
    name: "Fishtown Philadelphia, PA",
    description: "Adaptive reuse, hospitality, and creative retail opportunities along the waterfront.",
    slug: "fishtown-philadelphia-pa",
  },
  {
    name: "Manayunk Philadelphia, PA",
    description: "Walkable multifamily and Main Street retail positioned near employment hubs.",
    slug: "manayunk-philadelphia-pa",
  },
  {
    name: "Old City Philadelphia, PA",
    description: "Historic retail and boutique hospitality steps from national landmarks.",
    slug: "old-city-philadelphia-pa",
  },
  {
    name: "Society Hill Philadelphia, PA",
    description: "Luxury residential and legacy assets with preservation considerations.",
    slug: "society-hill-philadelphia-pa",
  },
  {
    name: "Bala Cynwyd, PA",
    description: "Suburban office and medical campuses with City Avenue accessibility.",
    slug: "bala-cynwyd-pa",
  },
  {
    name: "King of Prussia, PA",
    description: "Destination retail, hospitality, and industrial logistics along the turnpike corridor.",
    slug: "king-of-prussia-pa",
  },
  {
    name: "Conshohocken, PA",
    description: "Transit oriented office and multifamily exchange support with regional rail access.",
    slug: "conshohocken-pa",
  },
  {
    name: "Fort Washington, PA",
    description: "Office park and light industrial exchange guidance with Pennsylvania Turnpike access.",
    slug: "fort-washington-pa",
  },
];

const HOME_LOCATION_SLUGS = HOME_LOCATION_CARDS.map((card) => card.slug);

const FAQS: FAQ[] = [
  {
    question: "What are the 45 and 180 day rules?",
    answer:
      "The IRS requires that replacement properties be identified in writing within 45 calendar days of closing on the relinquished property and that at least one replacement closes within 180 calendar days. Both deadlines run concurrently and cannot be extended except for federally declared disaster relief.",
  },
  {
    question: "What qualifies as like-kind property?",
    answer:
      "Like-kind property includes real property held for investment or productive use in a trade or business. Pennsylvania investors may exchange residential rentals, commercial assets, industrial holdings, raw land, and long-term leasehold interests, provided the replacement is also held for investment or business use.",
  },
  {
    question: "How is boot taxed in Pennsylvania?",
    answer:
      "Cash or debt relief received during an exchange is treated as boot and is subject to federal and Pennsylvania income tax in the year of the disposition. Boot does not qualify for deferral and should be addressed with a CPA before closing.",
  },
  {
    question: "How do state and city transfer taxes apply?",
    answer:
      "Pennsylvania and Philadelphia transfer taxes continue to apply to conveyances inside an exchange. Proper tax stamping and payment at closing are required, and the amounts cannot be deferred through Section 1031.",
  },
  {
    question: "Can I complete a reverse exchange?",
    answer:
      "Reverse exchanges are permitted when an exchange accommodation titleholder acquires the replacement property first, followed by the sale of the relinquished asset within 180 days. Documentation must meet Revenue Procedure 2000-37 standards.",
  },
  {
    question: "How is the exchange reported on Form 8824?",
    answer:
      "Form 8824 documents the relinquished and replacement properties, adjusted basis, realized gain, deferred gain, and any boot received. It must be filed with the federal return for the tax year that includes the relinquished property closing.",
  },
];

const faqSchema = faqPageSchema(FAQS);
const jsonSchemas = [organizationSchema, baseWebSiteSchema, contactPointSchema, faqSchema];

export const metadata: Metadata = {
  title: "1031 Exchange Philadelphia | Qualified Intermediary Network Pennsylvania",
  description:
    "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes and deadline discipline.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "1031 Exchange Philadelphia | Best Property Identification Experts in Philadelphia",
    description:
      "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes and deadline discipline.",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Philadelphia skyline representing 1031 Exchange Philadelphia",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Philadelphia | Best Property Identification Experts in Philadelphia",
    description:
      "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes and deadline discipline.",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "og:image:alt": "Philadelphia skyline representing 1031 Exchange Philadelphia",
  },
};

export default function HomePage() {
  return (
    <>
      <main className="bg-[#F9F9F8] text-[#1B1B1B]" id="main-content">
        <header className="relative isolate overflow-hidden text-[#F9F9F8]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/1031-exchange-philadelphia.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-[#14213D]/70" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#14213D]/80 via-[#1D2747]/60 to-[#14213D]/70" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:py-32">
            <div className="max-w-3xl space-y-8" data-motion="fade-up">
              <span
                aria-label="Philadelphia skyline silhouette for 1031 Exchange Philadelphia hero."
                role="img"
                className="sr-only"
              >
                Philadelphia skyline silhouette for 1031 Exchange Philadelphia hero.
              </span>
              <p className="ui-font text-sm uppercase tracking-[0.24em] text-[#B68F40]">Philadelphia Property Identification Experts</p>
              <h1 className="text-4xl font-semibold text-[#F9F9F8] sm:text-5xl">Find Your Perfect 1031 Exchange Replacement Properties in Philadelphia.</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[#E8E9ED]">
                We identify the best replacement properties for your 1031 exchange across Philadelphia and Pennsylvania. Our team scours active and off-market listings, evaluates property fundamentals, and delivers compliant identification lists within your 45-day deadline.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row" data-motion="fade-up" data-motion-delay="0.08">
                <a
                  className="ui-font inline-flex items-center justify-center rounded-full bg-[#B68F40] px-6 py-3 text-base font-medium text-[#F9F9F8] transition-colors duration-200 hover:bg-[#8A6B2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9F9F8]"
                  href={`tel:${PHONE_E164}`}
                >
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  className="ui-font inline-flex items-center justify-center rounded-full border border-[#F0E8D8] px-6 py-3 text-base font-medium text-[#F9F9F8] transition-colors duration-200 hover:border-transparent hover:bg-[#F0E8D8] hover:text-[#14213D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9F9F8]"
                  href="#lead-form"
                >
                  Start My Exchange
                </a>
              </div>
              <div
                className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-[#F4F4F1] backdrop-blur"
                data-motion="fade-up"
                data-motion-delay="0.16"
              >
                <p className="ui-font font-semibold text-[#FDFDFD]">45 Day identification. 180 Day closing. We help you meet every deadline.</p>
                <ul className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-[#E0D8C4]">
                  {HERO_BADGES.map((badge) => (
                    <li key={badge} className="rounded-full border border-[#E0D8C4]/40 px-3 py-1">
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section id="why-choose-us" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
            <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">
              Why Pennsylvania Investors Choose 1031 Exchange Philadelphia.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#353535]">
              Investors, attorneys, and CPAs rely on our expert property identification services to find the best replacement properties within the 45-day deadline. We analyze market data, evaluate property fundamentals, and deliver compliant identification lists that meet IRS requirements.
          </p>
        </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="flex h-full flex-col rounded-2xl border border-[#D8D2C4] bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
                data-motion="fade-up"
                data-motion-delay={(index * 0.08).toFixed(2)}
              >
                <h3 className="text-xl font-semibold text-[#14213D]">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{feature.description}</p>
              </div>
            ))}
          </div>
          <aside
            className="mt-12 rounded-2xl border border-[#D8D2C4] bg-[#F2EFE8] p-6 text-left text-sm leading-relaxed text-[#2C2C2C]"
            data-motion="fade-up"
            data-motion-delay="0.12"
          >
            <p>
              A 1031 exchange defers federal and state income tax on qualifying real property. It does not remove Philadelphia or Pennsylvania transfer taxes. Review the Pennsylvania Realty Transfer Tax guidance from{" "}
              <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.revenue.pa.gov/TaxTypes/RTT/Pages/default.aspx" target="_blank" rel="noreferrer">
                Pennsylvania Department of Revenue
              </a>{" "}
              and the{" "}
              <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.phila.gov/services/payments-assistance-taxes/realty-transfer-tax/" target="_blank" rel="noreferrer">
                Philadelphia Realty Transfer Tax requirements
              </a>
              .
            </p>
          </aside>
        </section>

        <section id="how-it-works" className="bg-[#F4F3EE] py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
              <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">How the 1031 Exchange Process Works.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#353535]">
                Each Philadelphia exchange follows a disciplined three-stage sequence. We focus on the critical 45-day identification window, helping you find and evaluate replacement properties that meet IRS requirements and your investment goals.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Sell the Relinquished Property",
                  description:
                    "Once your property sale closes, the 45-day identification clock starts. We immediately begin scouting replacement properties that match your investment criteria.",
                },
                {
                  title: "Identify Replacements Within 45 Days",
                  description:
                    "We analyze active and off-market listings, evaluate property fundamentals, and deliver a compliant identification list with addresses, contract amounts, and exchange percentages.",
                },
                {
                  title: "Close Within 180 Days",
                  description:
                    "Complete due diligence, secure financing, and close on the replacements before the federal deadline.",
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="flex flex-col rounded-2xl border border-[#D8D2C4] bg-white p-8 text-left shadow-sm"
                  data-motion="fade-up"
                  data-motion-delay={(index * 0.08).toFixed(2)}
                >
                  <span className="ui-font text-sm font-semibold uppercase tracking-[0.2em] text-[#B68F40]">
                    Step {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[#14213D]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-2xl border border-[#D8D2C4] bg-white p-6 text-sm leading-relaxed text-[#353535]" data-motion="fade-up" data-motion-delay="0.24">
              <p>
                Learn more in{" "}
                <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.irs.gov/forms-pubs/about-form-8824" target="_blank" rel="noreferrer">
                  IRS Form 8824
                </a>{" "}
                and the{" "}
                <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips" target="_blank" rel="noreferrer">
                  Like-Kind Property guidance
                </a>
                . See Rev. Proc. 2008-16 for vacation home safe harbor.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between" data-motion="fade-up">
            <div>
              <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">Exchange Services.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#353535]">
                Tailored engagements for institutional advisors, family offices, and private investors seeking disciplined Section 1031 execution.
              </p>
            </div>
            <Link className="ui-font text-sm font-semibold text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="/services">
              See all services
            </Link>
          </div>
          <div className="mt-12">
            <HomeServiceGrid featuredSlugs={HOME_SERVICE_SLUGS} services={services} featuredCards={HOME_SERVICE_CARDS} />
          </div>
        </section>

        <section id="property-types" className="bg-[#F4F3EE] py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between" data-motion="fade-up">
              <div>
                <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">Eligible Property Types.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#353535]">
                  Evaluate reinvestment options with due diligence checklists, cash flow modeling, and closing coordination tailored to each asset class.
                </p>
              </div>
              <Link className="ui-font text-sm font-semibold text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="/property-types">
                Explore property types
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROPERTY_TYPES.map((property, index) => {
                const imagePath = getPropertyTypeImagePath(property.slug);
                return (
                  <Link
                    key={property.slug}
                    href={`/property-types/${property.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D8D2C4] bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    data-motion="fade-up"
                    data-motion-delay={(index * 0.08).toFixed(2)}
                  >
                    {imagePath && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={imagePath}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-[#14213D]">{property.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{property.description}</p>
                      </div>
                      <span className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#B68F40] transition-colors group-hover:text-[#8A6B2F]">
                        View details &gt;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="coverage" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="space-y-12">
            <div data-motion="fade-up">
              <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">Serving Philadelphia and All of Pennsylvania.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#353535]">
                Our team manages compliant 1031 exchanges for investors throughout Philadelphia, Bucks, Montgomery, Chester, Delaware, and statewide. We also support multi-state exchanges requiring Pennsylvania legal review, coordinating with counterparties and local counsel across jurisdictions.
              </p>
              <Link className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="/locations">
                See locations
              </Link>
            </div>
            <div className="rounded-3xl border border-[#D8D2C4] bg-white p-6 lg:p-8" data-motion="fade-up" data-motion-delay="0.12">
              <HomeLocationGrid featuredSlugs={HOME_LOCATION_SLUGS} locations={locations} featuredCards={HOME_LOCATION_CARDS} />
            </div>
          </div>
        </section>

        <section id="tools" className="bg-[#F4F3EE] py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between" data-motion="fade-up">
              <div>
                <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">Exchange Tools.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#353535]">
                  Free calculators and tools to help you plan and execute compliant 1031 exchanges in Philadelphia, PA.
                </p>
              </div>
              <Link className="ui-font text-sm font-semibold text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="/tools">
                View all tools
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/tools/boot-calculator"
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#D8D2C4] bg-white p-8 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]"
                data-motion="fade-up"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#14213D]">Boot Calculator</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                    Calculate boot received during an exchange including cash boot, mortgage boot, and estimated tax implications.
                  </p>
                </div>
                <span className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#B68F40] transition-colors group-hover:text-[#8A6B2F]">
                  Use calculator →
                </span>
              </Link>
              <Link
                href="/tools/exchange-cost-estimator"
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#D8D2C4] bg-white p-8 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]"
                data-motion="fade-up"
                data-motion-delay="0.08"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#14213D]">Exchange Cost Estimator</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                    Estimate total costs for a 1031 exchange including property identification fees, escrow costs, title insurance, and recording fees.
                  </p>
                </div>
                <span className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#B68F40] transition-colors group-hover:text-[#8A6B2F]">
                  Use calculator →
                </span>
              </Link>
              <Link
                href="/tools/identification-rules-checker"
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#D8D2C4] bg-white p-8 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]"
                data-motion="fade-up"
                data-motion-delay="0.16"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#14213D]">Identification Rules Checker</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                    Validate your replacement property identification against IRS rules including three-property, 200%, and 95% rules.
                  </p>
                </div>
                <span className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#B68F40] transition-colors group-hover:text-[#8A6B2F]">
                  Use calculator →
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
            <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">Frequently Asked Questions.</h2>
          </div>
          <div className="mt-12 space-y-4">
            {FAQS.map((item, index) => (
              <details key={item.question} className="group rounded-2xl border border-[#D8D2C4] bg-white p-6 shadow-sm" data-motion="fade-up" data-motion-delay={(index * 0.06).toFixed(2)}>
                <summary className="cursor-pointer text-lg font-semibold text-[#14213D] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213D]">
                  {item.question}
                </summary>
                <div className="mt-4 border-t border-[#E0D8C4] pt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="lead-form" className="bg-[#14213D] py-20 text-[#F9F9F8]">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="text-center" data-motion="fade-up">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Request 1031 Exchange Guidance.</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#E8E9ED]">
                Provide your transaction details and a Philadelphia exchange advisor will schedule a 30 minute consultation within one business day.
              </p>
            </div>
            <div className="mt-12" data-motion="fade-up" data-motion-delay="0.12">
              <Suspense fallback={<div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur text-white">Loading form...</div>}>
                <ContactForm variant="dark" />
              </Suspense>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#D8D2C4] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr]">
              <div>
                <h3 className="text-2xl font-semibold text-[#14213D]">{SITE_NAME}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  Heritage-informed exchange advisors providing precise guidance for investors, attorneys, and CPAs navigating Pennsylvania Section 1031 requirements.
                </p>
                <div className="mt-6 space-y-2 text-sm text-[#14213D]">
                  <p className="ui-font font-semibold">Contact</p>
                  <a className="block text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href={`tel:${PHONE_E164}`}>
                    {PHONE_DISPLAY}
                  </a>
                  <a className="block text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="mailto:intake@1031exchangephiladelphia.com">
                    intake@1031exchangephiladelphia.com
                  </a>
                  <p className="text-[#3F3F3F]">Hours: Monday to Friday 8:30 AM to 6:00 PM Eastern</p>
                  <p className="text-[#3F3F3F]">{HAS_STAFFED_OFFICE ? OFFICE_ADDRESS : "Serving clients across Pennsylvania."}</p>
                </div>
              </div>
              <div>
                <p className="ui-font text-sm font-semibold text-[#14213D]">Quick Links</p>
                <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                  <li>
                    <Link className="transition-colors hover:text-[#B68F40]" href="/services">
                      Services
                    </Link>
                  </li>
                  {HOME_SERVICE_CARDS.map((service) => (
                    <li key={service.slug}>
                      <Link className="transition-colors hover:text-[#B68F40]" href={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="ui-font text-sm font-semibold text-[#14213D]">Service Areas</p>
                <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                  <li>
                    <Link className="transition-colors hover:text-[#B68F40]" href="/property-types">
                      Property Types
                    </Link>
                  </li>
                  {HOME_LOCATION_CARDS.slice(0, 5).map((location) => (
                    <li key={location.slug}>
                      <Link className="transition-colors hover:text-[#B68F40]" href={`/locations/${location.slug}`}>
                        {location.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link className="transition-colors hover:text-[#B68F40]" href="/resources/calculator">
                      Capital Gains Estimator
                    </Link>
                  </li>
                  <li>
                    <Link className="transition-colors hover:text-[#B68F40]" href="/resources/timeline">
                      Timeline Reminders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-[#E0D8C4] pt-6 text-sm text-[#3F3F3F]">
              <p>
                Compliance resources:{" "}
                <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.irs.gov/forms-pubs/about-form-8824" target="_blank" rel="noreferrer">
                  IRS Form 8824
                </a>
                ,{" "}
                <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips" target="_blank" rel="noreferrer">
                  IRS Like-Kind Exchange guidance
                </a>{" "}
                and{" "}
                <a className="text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="https://www.revenue.pa.gov/TaxTypes/RTT/Pages/default.aspx" target="_blank" rel="noreferrer">
                  Pennsylvania Realty Transfer Tax
                </a>
                .
              </p>
              <p className="mt-4 text-xs text-[#6B6B6B]">© 2025 1031 Exchange Philadelphia. All rights reserved.</p>
            </div>
        </div>
        </footer>
      </main>

      {jsonSchemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <link rel="canonical" href={`${SITE_URL}/`} />

      <Script id="framer-motion-cdn" src="https://cdn.jsdelivr.net/npm/framer-motion@11.2.6/dist/framer-motion.umd.min.js" strategy="afterInteractive" />
      <Script id="federal-trust-motion" strategy="afterInteractive">
        {`
          (function () {
            var initialise = function () {
              if (!window.framerMotion || !window.framerMotion.animate) {
                requestAnimationFrame(initialise);
                return;
              }
              var animate = window.framerMotion.animate;
              var revealElements = Array.prototype.slice.call(document.querySelectorAll("[data-motion=\\"fade-up\\"]"));
              if (!revealElements.length) {
                return;
              }
              var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                  if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = Number(el.getAttribute("data-motion-delay") || "0");
                    animate(
                      el,
                      { opacity: [0, 1], transform: ["translateY(32px)", "translateY(0px)"] },
                      { duration: 0.6, delay: delay, ease: "easeOut" }
                    );
                    observer.unobserve(el);
                  }
                });
              }, { threshold: 0.2 });
              revealElements.forEach(function (el, index) {
                el.style.opacity = "0";
                el.style.transform = "translateY(32px)";
                if (!el.hasAttribute("data-motion-delay")) {
                  el.setAttribute("data-motion-delay", (index * 0.06).toFixed(2));
                }
                observer.observe(el);
              });
            };
            initialise();
          })();
        `}
      </Script>
    </>
  );
}

