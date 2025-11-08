import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { services } from "../lib/data/services";
import { locations } from "../lib/data/locations";
import { HomeServiceGrid } from "../components/home/home-service-grid";
import { HomeLocationGrid } from "../components/home/home-location-grid";
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

const HERO_BADGES = ["CPA Guidance", "Attorney Review", "Qualified Intermediary"];

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
    title: "Qualified Intermediary Network",
    description:
      "Secure escrow administration through bonded intermediaries with dual controls and transparent disbursement authorization.",
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
    name: "Center City Philadelphia, PA",
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
    title: "1031 Exchange Philadelphia | Qualified Intermediary Network Pennsylvania",
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
    title: "1031 Exchange Philadelphia | Qualified Intermediary Network Pennsylvania",
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
        <header className="relative isolate overflow-hidden bg-gradient-to-br from-[#14213D] via-[#1D2747] to-[#F9F9F8] text-[#F9F9F8]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),rgba(20,33,61,0.05))]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(20,33,61,0.35),transparent)] mix-blend-soft-light" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24 sm:px-8 lg:flex-row lg:items-center lg:py-32">
            <div className="max-w-3xl space-y-8" data-motion="fade-up">
              <span
                aria-label="Philadelphia skyline silhouette for 1031 Exchange Philadelphia hero."
                role="img"
                className="sr-only"
              >
                Philadelphia skyline silhouette for 1031 Exchange Philadelphia hero.
              </span>
              <p className="ui-font text-sm uppercase tracking-[0.24em] text-[#B68F40]">Federal Trust Confidence</p>
              <h1 className="text-4xl font-semibold text-[#F9F9F8] sm:text-5xl">Philadelphia 1031 Exchange Advisors.</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[#E8E9ED]">
                Helping investors defer capital gains tax through compliant 1031 exchanges across Pennsylvania. Our team guides every milestone with meticulous documentation, trusted intermediaries, and local expertise grounded in Philadelphia financial tradition.
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
            <div
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl lg:ml-auto"
              data-motion="fade-up"
              data-motion-delay="0.24"
            >
              <div className="grid gap-6 text-left text-[#F9F9F8]">
                <p className="text-2xl font-semibold">Heritage-backed counsel. Digitally modern execution.</p>
                <p className="text-sm leading-relaxed text-[#E8E9ED]">
                  Our advisors blend classical Philadelphia wealth stewardship with practical investor clarity. Expect disciplined project plans, transparent escrow oversight, and weekly milestone updates from your exchange lead.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs text-[#F4F4F1]">
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4">
                    <p className="ui-font text-sm font-semibold text-[#FDFDFD]">Average close</p>
                    <p>31 days ahead of the 180 day deadline</p>
                  </div>
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4">
                    <p className="ui-font text-sm font-semibold text-[#FDFDFD]">Compliance rate</p>
                    <p>100 percent audit-ready documentation since 2015</p>
                  </div>
                </div>
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
              Investors, attorneys, and CPAs rely on our East Coast discipline, transparent communication, and proven network of intermediaries to protect capital through every exchange cycle.
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
                Each Philadelphia exchange follows a disciplined three-stage sequence, coordinated with your attorneys, CPAs, brokers, and qualified intermediary.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Sell the Relinquished Property",
                  description:
                    "Proceeds transfer to the qualified intermediary and remain in segregated escrow until replacement closing.",
                },
                {
                  title: "Identify Replacements Within 45 Days",
                  description:
                    "Submit a written identification list detailing addresses, contract amounts, and exchange percentages.",
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
              {PROPERTY_TYPES.map((property, index) => (
                <div
                  key={property.slug}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#D8D2C4] bg-white p-6 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1"
                  data-motion="fade-up"
                  data-motion-delay={(index * 0.08).toFixed(2)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-[#14213D]">{property.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">{property.description}</p>
                  </div>
                  <span className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#B68F40] transition-colors group-hover:text-[#8A6B2F]">
                    View details &gt;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="coverage" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,1fr]">
            <div data-motion="fade-up">
              <h2 className="text-3xl font-semibold text-[#14213D] sm:text-4xl">Serving Philadelphia and All of Pennsylvania.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#353535]">
                Our team manages compliant 1031 exchanges for investors throughout Philadelphia, Bucks, Montgomery, Chester, Delaware, and statewide. We also support multi-state exchanges requiring Pennsylvania legal review, coordinating with counterparties and local counsel across jurisdictions.
              </p>
              <Link className="ui-font mt-6 inline-flex items-center text-sm font-semibold text-[#14213D] underline underline-offset-4 transition-colors hover:text-[#B68F40]" href="/locations">
                See locations
              </Link>
            </div>
            <div className="grid gap-4 rounded-3xl border border-[#D8D2C4] bg-white p-6 md:grid-cols-2" data-motion="fade-up" data-motion-delay="0.12">
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
                    Estimate total costs for a 1031 exchange including QI fees, escrow costs, title insurance, and recording fees.
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
            <form className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur" method="post" action="/api/lead" id="lead-form" data-motion="fade-up" data-motion-delay="0.12" noValidate>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="ui-font block text-sm font-medium text-white" htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required aria-describedby="helper-name error-name" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" placeholder="First and last name" data-input />
                  <p id="helper-name" className="mt-2 text-xs text-[#E8E9ED]">
                    Enter the primary decision maker for this exchange.
                  </p>
                  <p id="error-name" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
                </div>
                <div>
                  <label className="ui-font block text-sm font-medium text-white" htmlFor="email">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required inputMode="email" aria-describedby="helper-email error-email" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" placeholder="name@example.com" data-input />
                  <p id="helper-email" className="mt-2 text-xs text-[#E8E9ED]">We use this email to deliver timeline checklists and closing updates.</p>
                  <p id="error-email" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="ui-font block text-sm font-medium text-white" htmlFor="phone">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" required inputMode="tel" aria-describedby="helper-phone error-phone" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" placeholder="(###) ###-####" data-input />
                  <p id="helper-phone" className="mt-2 text-xs text-[#E8E9ED]">Provide the best number for deadline questions during the exchange.</p>
                  <p id="error-phone" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
                </div>
                <div>
                  <label className="ui-font block text-sm font-medium text-white" htmlFor="property">
                    Property Being Sold
                  </label>
                  <input id="property" name="property" type="text" required aria-describedby="helper-property error-property" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" placeholder="Asset type, address, estimated sale price" data-input />
                  <p id="helper-property" className="mt-2 text-xs text-[#E8E9ED]">Include property type, location, and target closing month.</p>
                  <p id="error-property" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="ui-font block text-sm font-medium text-white" htmlFor="closeDate">
                    Estimated Close Date
                  </label>
                  <input id="closeDate" name="closeDate" type="date" required aria-describedby="helper-closeDate error-closeDate" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" data-input />
                  <p id="helper-closeDate" className="mt-2 text-xs text-[#E8E9ED]">Use the scheduled settlement date for the relinquished property.</p>
                  <p id="error-closeDate" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
                </div>
                <div>
                  <label className="ui-font block text-sm font-medium text-white" htmlFor="city">
                    City
                  </label>
                  <input id="city" name="city" type="text" required aria-describedby="helper-city error-city" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" placeholder="City or county for the property" data-input />
                  <p id="helper-city" className="mt-2 text-xs text-[#E8E9ED]">Note the jurisdiction that requires transfer tax compliance.</p>
                  <p id="error-city" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
                </div>
              </div>
              <div>
                <label className="ui-font block text-sm font-medium text-white" htmlFor="message">
                  Message
                </label>
                <textarea id="message" name="message" required minLength={20} rows={5} aria-describedby="helper-message error-message" aria-invalid="false" className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-sm outline-none transition focus:border-[#B68F40]" placeholder="Outline replacement goals, financing considerations, and stakeholders." data-input />
                <p id="helper-message" className="mt-2 text-xs text-[#E8E9ED]">Share priorities for replacement properties, financing, and timeline support.</p>
                <p id="error-message" className="mt-2 hidden text-xs text-[#FECACA]" data-error />
              </div>
              <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="ui-font inline-flex items-center justify-center rounded-full bg-[#B68F40] px-8 py-3 text-sm font-semibold text-[#F9F9F8] transition-colors hover:bg-[#8A6B2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9F9F8]">
                  Submit request
                </button>
                <p className="text-xs text-[#E8E9ED]">Educational content only. Not tax or legal advice.</p>
              </div>
              <p id="lead-form-status" role="status" aria-live="polite" className="ui-font text-sm font-semibold text-[#E8E9ED]" />
            </form>
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
      <Script id="lead-form-handler" strategy="afterInteractive">
        {`
          (function () {
            var form = document.getElementById("lead-form");
            if (!form) return;
            var status = document.getElementById("lead-form-status");
            var fieldNames = ["name", "email", "phone", "property", "closeDate", "city", "message"];
            var errorElements = {};
            var inputElements = {};
            fieldNames.forEach(function (field) {
              errorElements[field] = document.getElementById("error-" + field);
              inputElements[field] = form.querySelector('[name="' + field + '"]');
            });

            var emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            var phonePattern = /^[+]?[-() 0-9]{7,}$/;

            var setFieldError = function (field, message) {
              var errorEl = errorElements[field];
              var inputEl = inputElements[field];
              if (!errorEl || !inputEl) return;
              if (message) {
                errorEl.textContent = message;
                errorEl.classList.remove("hidden");
                inputEl.setAttribute("aria-invalid", "true");
                inputEl.classList.add("border-[#FECACA]");
              } else {
                errorEl.textContent = "";
                errorEl.classList.add("hidden");
                inputEl.setAttribute("aria-invalid", "false");
                inputEl.classList.remove("border-[#FECACA]");
              }
            };

            var resetStatus = function () {
              if (!status) return;
              status.textContent = "";
              status.classList.remove("text-[#FECACA]", "text-[#B2F2BB]");
              status.classList.add("text-[#E8E9ED]");
            };

            form.addEventListener("submit", function (event) {
              event.preventDefault();
              resetStatus();

              var formData = new FormData(form);
              var payload = {
                name: (formData.get("name") || "").toString().trim(),
                email: (formData.get("email") || "").toString().trim(),
                phone: (formData.get("phone") || "").toString().trim(),
                property: (formData.get("property") || "").toString().trim(),
                closeDate: (formData.get("closeDate") || "").toString(),
                city: (formData.get("city") || "").toString().trim(),
                message: (formData.get("message") || "").toString().trim()
              };

              var hasError = false;
              fieldNames.forEach(function (field) {
                setFieldError(field, "");
                if (!payload[field]) {
                  setFieldError(field, "This field is required.");
                  hasError = true;
                }
              });

              if (payload.email && !emailPattern.test(payload.email)) {
                setFieldError("email", "Enter a valid email address.");
                hasError = true;
              }
              if (payload.phone && !phonePattern.test(payload.phone)) {
                setFieldError("phone", "Enter a valid phone number.");
                hasError = true;
              }
              if (payload.message && payload.message.length < 20) {
                setFieldError("message", "Provide at least 20 characters of context.");
                hasError = true;
              }

              if (hasError) {
                if (status) {
                  status.textContent = "Please resolve the highlighted fields before submitting.";
                  status.classList.remove("text-[#B2F2BB]");
                  status.classList.add("text-[#FECACA]");
                }
                return;
              }

              if (status) {
                status.textContent = "Submitting...";
              }

              fetch(form.action, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              })
                .then(function (response) {
                  if (response.ok) {
                    form.reset();
                    fieldNames.forEach(function (field) {
                      setFieldError(field, "");
                    });
                    if (status) {
                      status.textContent = "Thank you. A Philadelphia exchange advisor will contact you shortly.";
                      status.classList.remove("text-[#FECACA]");
                      status.classList.add("text-[#B2F2BB]");
                    }
                  } else {
                    return response.json().then(function (data) {
                      throw new Error(data && data.message ? data.message : "Submission failed.");
                    });
                  }
                  return null;
                })
                .catch(function (error) {
                  if (status) {
                    status.textContent = error.message || "We could not submit your request. Please try again.";
                    status.classList.remove("text-[#B2F2BB]");
                    status.classList.add("text-[#FECACA]");
                  }
                });
            });
          })();
        `}
      </Script>
    </>
  );
}

