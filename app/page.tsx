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
      <main className="bg-white text-[#1B1B1B]" id="main-content">
        {/* Hero Section - Full width with centered content like Dallas Luxury Living */}
        <header className="relative isolate min-h-[85vh] flex items-center justify-center overflow-hidden text-white">
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
            {/* Olive/dark overlay for text readability */}
            <div className="absolute inset-0 bg-[#5D5838]/60" />
          </div>
          
          {/* Carousel navigation arrows */}
          <button aria-label="Previous slide" className="absolute left-6 top-1/2 z-10 -translate-y-1/2 p-3 text-white/80 transition-colors hover:text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button aria-label="Next slide" className="absolute right-6 top-1/2 z-10 -translate-y-1/2 p-3 text-white/80 transition-colors hover:text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 lg:py-32">
            <div className="space-y-8" data-motion="fade-up">
              <span
                aria-label="Philadelphia skyline silhouette for 1031 Exchange Philadelphia hero."
                role="img"
                className="sr-only"
              >
                Philadelphia skyline silhouette for 1031 Exchange Philadelphia hero.
              </span>
              <p className="ui-font text-sm uppercase tracking-[0.25em] text-white/90">Philadelphia Property Identification Experts</p>
              <h1 className="text-4xl font-normal tracking-wide text-white sm:text-5xl lg:text-6xl">FIND YOUR PERFECT 1031 EXCHANGE REPLACEMENT PROPERTIES</h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90">
                We identify the best replacement properties for your 1031 exchange across Philadelphia and Pennsylvania. Our team scours active and off-market listings, evaluates property fundamentals, and delivers compliant identification lists within your 45-day deadline.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row" data-motion="fade-up" data-motion-delay="0.08">
                <a
                  className="ui-font inline-flex items-center justify-center border border-white px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-white hover:text-[#5D5838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="#lead-form"
                >
                  Start My Exchange
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* About Section - Split layout like Dallas Luxury Living */}
        <section id="why-choose-us" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text Content */}
              <div className="order-2 lg:order-1" data-motion="fade-up">
                <p className="text-sm leading-relaxed text-[#3F3F3F]">
                  Whether relocating your investment portfolio, acquiring a secondary property, or planning an in-state repositioning, 1031 Exchange Philadelphia is the top choice for investors and advisors who seek high quality representation and optimal results.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  We bring a wealth of knowledge of the Philadelphia market, strength in negotiation, and wisdom and persistence in working through any challenges encountered along the way.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  Our reputation in the Philadelphia area real estate market is unsurpassed. Clients appreciate our savvy communication and problem-solving skills as well as our keen ability to negotiate smart deals.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  Investors, attorneys, and CPAs rely on our expert property identification services to find the best replacement properties within the 45-day deadline. We analyze market data, evaluate property fundamentals, and deliver compliant identification lists that meet IRS requirements.
                </p>
                <a
                  href="/about"
                  className="ui-font mt-8 inline-flex items-center justify-center border border-[#5D5838] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838] transition-colors duration-200 hover:bg-[#5D5838] hover:text-white"
                >
                  Learn More
                </a>
              </div>
              
              {/* Image */}
              <div className="relative order-1 lg:order-2" data-motion="fade-up" data-motion-delay="0.08">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/1031-exchange-philadelphia.jpg"
                    alt="Philadelphia 1031 Exchange Services"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="mx-auto mt-20 max-w-6xl px-6 sm:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="border-t border-[#5D5838]/20 pt-6"
                  data-motion="fade-up"
                  data-motion-delay={(index * 0.08).toFixed(2)}
                >
                  <h3 className="text-lg font-semibold text-[#5D5838]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3F3F3F]">{feature.description}</p>
                </div>
              ))}
            </div>
            <aside
              className="mt-12 border-t border-[#5D5838]/20 pt-6 text-sm leading-relaxed text-[#3F3F3F]"
              data-motion="fade-up"
              data-motion-delay="0.12"
            >
              <p>
                A 1031 exchange defers federal and state income tax on qualifying real property. It does not remove Philadelphia or Pennsylvania transfer taxes. Review the Pennsylvania Realty Transfer Tax guidance from{" "}
                <a className="text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="https://www.revenue.pa.gov/TaxTypes/RTT/Pages/default.aspx" target="_blank" rel="noreferrer">
                  Pennsylvania Department of Revenue
                </a>{" "}
                and the{" "}
                <a className="text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="https://www.phila.gov/services/payments-assistance-taxes/realty-transfer-tax/" target="_blank" rel="noreferrer">
                  Philadelphia Realty Transfer Tax requirements
                </a>
                .
              </p>
            </aside>
          </div>
        </section>

        {/* How It Works Section - Clean luxury styling */}
        <section id="how-it-works" className="bg-[#5D5838] py-20 lg:py-28 text-white">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
              <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-white/70">The Exchange Process</p>
              <h2 className="mt-4 text-3xl font-normal tracking-wide sm:text-4xl">HOW THE 1031 EXCHANGE PROCESS WORKS</h2>
              <p className="mt-6 text-base leading-relaxed text-white/80">
                Each Philadelphia exchange follows a disciplined three-stage sequence. We focus on the critical 45-day identification window, helping you find and evaluate replacement properties that meet IRS requirements and your investment goals.
              </p>
            </div>
            <div className="mt-16 grid gap-px bg-white/20 md:grid-cols-3">
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
                  className="flex flex-col bg-[#5D5838] p-8 lg:p-10"
                  data-motion="fade-up"
                  data-motion-delay={(index * 0.08).toFixed(2)}
                >
                  <span className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                    Step {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-normal tracking-wide">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center text-sm leading-relaxed text-white/70" data-motion="fade-up" data-motion-delay="0.24">
              <p>
                Learn more in{" "}
                <a className="text-white underline underline-offset-4 transition-colors hover:text-white/80" href="https://www.irs.gov/forms-pubs/about-form-8824" target="_blank" rel="noreferrer">
                  IRS Form 8824
                </a>{" "}
                and the{" "}
                <a className="text-white underline underline-offset-4 transition-colors hover:text-white/80" href="https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips" target="_blank" rel="noreferrer">
                  Like-Kind Property guidance
                </a>
                . See Rev. Proc. 2008-16 for vacation home safe harbor.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:items-end md:justify-between" data-motion="fade-up">
              <div>
                <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-[#5D5838]">Our Services</p>
                <h2 className="mt-4 text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">EXCHANGE SERVICES</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3F3F3F]">
                  Tailored engagements for institutional advisors, family offices, and private investors seeking disciplined Section 1031 execution.
                </p>
              </div>
              <Link className="ui-font text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="/services">
                See all services
              </Link>
            </div>
            <div className="mt-12">
              <HomeServiceGrid featuredSlugs={HOME_SERVICE_SLUGS} services={services} featuredCards={HOME_SERVICE_CARDS} />
            </div>
          </div>
        </section>

        {/* Property Types Section - Visual grid like Dallas Luxury Living Community Guides */}
        <section id="property-types" className="border-t border-[#5D5838]/10 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
              <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-[#5D5838]">Investment Categories</p>
              <h2 className="mt-4 text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">ELIGIBLE PROPERTY TYPES</h2>
              <p className="mt-4 text-base leading-relaxed text-[#3F3F3F]">
                Evaluate reinvestment options with due diligence checklists, cash flow modeling, and closing coordination tailored to each asset class.
              </p>
            </div>
            <div className="mt-12 grid gap-1 md:grid-cols-2 lg:grid-cols-3">
              {PROPERTY_TYPES.map((property, index) => {
                const imagePath = getPropertyTypeImagePath(property.slug);
                return (
                  <Link
                    key={property.slug}
                    href={`/property-types/${property.slug}`}
                    className="group relative flex flex-col overflow-hidden bg-white text-center"
                    data-motion="fade-up"
                    data-motion-delay={(index * 0.08).toFixed(2)}
                  >
                    {imagePath && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={imagePath}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="py-6">
                      <h3 className="ui-font text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838]">{property.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link className="ui-font text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="/property-types">
                Explore all property types
              </Link>
            </div>
          </div>
        </section>

        {/* Coverage/Locations Section - Community Guides style */}
        <section id="coverage" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
              <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-[#5D5838]">Service Areas</p>
              <h2 className="mt-4 text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">PHILADELPHIA COMMUNITY GUIDES</h2>
              <p className="mt-4 text-base leading-relaxed text-[#3F3F3F]">
                Our team manages compliant 1031 exchanges for investors throughout Philadelphia, Bucks, Montgomery, Chester, Delaware, and statewide. We also support multi-state exchanges requiring Pennsylvania legal review.
              </p>
            </div>
            <div className="mt-12" data-motion="fade-up" data-motion-delay="0.12">
              <HomeLocationGrid featuredSlugs={HOME_LOCATION_SLUGS} locations={locations} featuredCards={HOME_LOCATION_CARDS} />
            </div>
            <div className="mt-8 text-center">
              <Link className="ui-font text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="/locations">
                View all {locations.length} locations
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Section - Image background style like lifestyle section */}
        <section id="tools" className="border-t border-[#5D5838]/10 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto max-w-3xl text-center" data-motion="fade-up">
              <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-[#5D5838]">Resources</p>
              <h2 className="mt-4 text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">EXCHANGE TOOLS</h2>
              <p className="mt-4 text-base leading-relaxed text-[#3F3F3F]">
                Free calculators and tools to help you plan and execute compliant 1031 exchanges in Philadelphia, PA.
              </p>
            </div>
            <div className="mt-12 grid gap-1 md:grid-cols-3">
              <Link
                href="/tools/boot-calculator"
                className="group relative flex aspect-[4/3] items-end overflow-hidden bg-[#5D5838] p-6 text-white"
                data-motion="fade-up"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <h3 className="ui-font text-sm font-medium uppercase tracking-[0.15em]">Boot Calculator</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/80">
                    Calculate boot received during an exchange including cash boot, mortgage boot, and estimated tax implications.
                  </p>
                </div>
              </Link>
              <Link
                href="/tools/exchange-cost-estimator"
                className="group relative flex aspect-[4/3] items-end overflow-hidden bg-[#7A7654] p-6 text-white"
                data-motion="fade-up"
                data-motion-delay="0.08"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <h3 className="ui-font text-sm font-medium uppercase tracking-[0.15em]">Exchange Cost Estimator</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/80">
                    Estimate total costs for a 1031 exchange including property identification fees, escrow costs, title insurance, and recording fees.
                  </p>
                </div>
              </Link>
              <Link
                href="/tools/identification-rules-checker"
                className="group relative flex aspect-[4/3] items-end overflow-hidden bg-[#454326] p-6 text-white"
                data-motion="fade-up"
                data-motion-delay="0.16"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <h3 className="ui-font text-sm font-medium uppercase tracking-[0.15em]">Identification Rules Checker</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/80">
                    Validate your replacement property identification against IRS rules including three-property, 200%, and 95% rules.
                  </p>
                </div>
              </Link>
            </div>
            <div className="mt-8 text-center">
              <Link className="ui-font text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="/tools">
                View all tools
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-[#F8F7F4] py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="text-center" data-motion="fade-up">
              <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-[#5D5838]">Common Questions</p>
              <h2 className="mt-4 text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">FREQUENTLY ASKED QUESTIONS</h2>
            </div>
            <div className="mt-12 space-y-0 divide-y divide-[#5D5838]/20">
              {FAQS.map((item, index) => (
                <details key={item.question} className="group py-6" data-motion="fade-up" data-motion-delay={(index * 0.06).toFixed(2)}>
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-[#5D5838] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]">
                    {item.question}
                    <span className="ml-4 flex-shrink-0 text-[#5D5838] transition-transform duration-200 group-open:rotate-45">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section - Background image with overlay like Dallas Luxury Living */}
        <section id="lead-form" className="relative py-20 lg:py-28 text-white">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/1031-exchange-philadelphia.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#5D5838]/85" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8">
            <div className="text-center" data-motion="fade-up">
              <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-white/70">Get Started</p>
              <h2 className="mt-4 text-3xl font-normal tracking-wide sm:text-4xl">GET PRIVATE EXCLUSIVE LISTINGS DELIVERED TO YOUR INBOX</h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                Gain insider access to exclusive investment properties and bypass the competitive mainstream market. Connect with our team to learn more about how to uncover these hidden opportunities.
              </p>
            </div>
            <div className="mt-12" data-motion="fade-up" data-motion-delay="0.12">
              <Suspense fallback={<div className="border border-white/20 bg-white/5 p-8 backdrop-blur text-white">Loading form...</div>}>
                <ContactForm variant="dark" />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Work With Us CTA Section */}
        <section className="relative py-20 lg:py-28">
          <div className="absolute inset-0">
            <Image
              src="/1031-exchange-philadelphia.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="lg:pr-12" data-motion="fade-up">
                <p className="ui-font text-xs font-medium uppercase tracking-[0.25em] text-[#5D5838]">Get in Touch</p>
                <h2 className="mt-4 text-3xl font-normal tracking-wide text-[#5D5838] sm:text-4xl">WORK WITH US</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  Our reputation in the Philadelphia area real estate market is unsurpassed. Clients appreciate our savvy communication and problem-solving skills as well as our keen ability to negotiate smart deals.
                </p>
                <a
                  href="#lead-form"
                  className="ui-font mt-8 inline-flex items-center justify-center bg-[#5D5838] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-[#454326]"
                >
                  Let&apos;s Connect
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#5D5838]/20 bg-white">
          {/* Social and Contact Row */}
          <div className="border-b border-[#5D5838]/10 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:px-8 md:flex-row">
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={`mailto:intake@1031exchangephiladelphia.com`} aria-label="Email" className="flex h-10 w-10 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </a>
                <a href={`tel:${PHONE_E164}`} aria-label="Phone" className="flex h-10 w-10 items-center justify-center border border-[#5D5838]/30 text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </a>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-xl font-semibold text-[#5D5838]">{SITE_NAME}</h3>
                <p className="mt-1 text-sm text-[#3F3F3F]">Direct: {PHONE_DISPLAY}</p>
              </div>
            </div>
          </div>
          
          {/* Main Footer Content */}
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr]">
              <div>
                <Image
                  src="/1031-exchange-philadelphia-logo.png"
                  alt="1031 Exchange Philadelphia"
                  width={180}
                  height={49}
                  className="h-10 w-auto"
                />
                <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
                  Heritage-informed exchange advisors providing precise guidance for investors, attorneys, and CPAs navigating Pennsylvania Section 1031 requirements.
                </p>
                <div className="mt-6 space-y-2 text-sm text-[#5D5838]">
                  <p className="ui-font text-xs font-medium uppercase tracking-[0.15em]">Contact</p>
                  <a className="block text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href={`tel:${PHONE_E164}`}>
                    {PHONE_DISPLAY}
                  </a>
                  <a className="block text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="mailto:intake@1031exchangephiladelphia.com">
                    intake@1031exchangephiladelphia.com
                  </a>
                  <p className="text-[#3F3F3F]">Hours: Monday to Friday 8:30 AM to 6:00 PM Eastern</p>
                  <p className="text-[#3F3F3F]">{HAS_STAFFED_OFFICE ? OFFICE_ADDRESS : "Serving clients across Pennsylvania."}</p>
                </div>
              </div>
              <div>
                <p className="ui-font text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Quick Links</p>
                <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                  <li>
                    <Link className="transition-colors hover:text-[#5D5838]" href="/services">
                      Services
                    </Link>
                  </li>
                  {HOME_SERVICE_CARDS.map((service) => (
                    <li key={service.slug}>
                      <Link className="transition-colors hover:text-[#5D5838]" href={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="ui-font text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Service Areas</p>
                <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                  <li>
                    <Link className="transition-colors hover:text-[#5D5838]" href="/property-types">
                      Property Types
                    </Link>
                  </li>
                  {HOME_LOCATION_CARDS.slice(0, 5).map((location) => (
                    <li key={location.slug}>
                      <Link className="transition-colors hover:text-[#5D5838]" href={`/locations/${location.slug}`}>
                        {location.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link className="transition-colors hover:text-[#5D5838]" href="/resources/calculator">
                      Capital Gains Estimator
                    </Link>
                  </li>
                  <li>
                    <Link className="transition-colors hover:text-[#5D5838]" href="/resources/timeline">
                      Timeline Reminders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-[#5D5838]/20 pt-6 text-sm text-[#3F3F3F]">
              <p>
                Compliance resources:{" "}
                <a className="text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="https://www.irs.gov/forms-pubs/about-form-8824" target="_blank" rel="noreferrer">
                  IRS Form 8824
                </a>
                ,{" "}
                <a className="text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips" target="_blank" rel="noreferrer">
                  IRS Like-Kind Exchange guidance
                </a>{" "}
                and{" "}
                <a className="text-[#5D5838] underline underline-offset-4 transition-colors hover:text-[#7A7654]" href="https://www.revenue.pa.gov/TaxTypes/RTT/Pages/default.aspx" target="_blank" rel="noreferrer">
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

