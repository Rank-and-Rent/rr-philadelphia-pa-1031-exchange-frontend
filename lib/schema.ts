import { SITE_NAME, SITE_URL, PHONE_E164, CONTACT_EMAIL, LOGO_URL, OG_IMAGE_URL, OFFICE_ADDRESS_FULL } from "./config/site";
import type { Service } from "./data/services";

export const baseWebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  email: CONTACT_EMAIL,
  telephone: PHONE_E164,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3151 Market St",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    postalCode: "19104",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Philadelphia",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Philadelphia County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Bucks County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Montgomery County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Chester County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Delaware County",
      addressRegion: "PA",
    },
  ],
  priceRange: "$$",
  paymentAccepted: "Cash, Check, Credit Card, Wire Transfer",
  currenciesAccepted: "USD",
  serviceType: "1031 Exchange Advisory Services",
  description: "Trusted 1031 exchange advisors helping Philadelphia investors defer capital gains through compliant processes, identification strategy, and deadline discipline.",
};

export const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  telephone: PHONE_E164,
  contactType: "customer service",
  email: CONTACT_EMAIL,
  areaServed: "US-PA",
  availableLanguage: ["English"],
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "18:00",
    timeZone: "America/New_York",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  image: LOGO_URL,
  logo: LOGO_URL,
  url: SITE_URL,
  telephone: PHONE_E164,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3151 Market St",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
    postalCode: "19104",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.9526",
    longitude: "-75.1652",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "18:00",
    timeZone: "America/New_York",
  },
  priceRange: "$$",
  paymentAccepted: "Cash, Check, Credit Card, Wire Transfer",
  currenciesAccepted: "USD",
};

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createServiceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.shortDescription,
  serviceType: "1031 Exchange Advisory Service",
  areaServed: [
    {
      "@type": "City",
      name: "Philadelphia",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Philadelphia County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Bucks County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Montgomery County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Chester County",
      addressRegion: "PA",
    },
    {
      "@type": "County",
      name: "Delaware County",
      addressRegion: "PA",
    },
  ],
  provider: {
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    telephone: PHONE_E164,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3151 Market St",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      postalCode: "19104",
      addressCountry: "US",
    },
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
});

export const faqPageSchema = (pairs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pairs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

