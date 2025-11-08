import { SITE_NAME, SITE_URL, PHONE_E164, CONTACT_EMAIL, LOGO_URL, OG_IMAGE_URL } from "./config/site";
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
  areaServed: ["Philadelphia County, PA", "Bucks County, PA", "Montgomery County, PA", "Chester County, PA", "Delaware County, PA"],
};

export const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  telephone: PHONE_E164,
  contactType: "customer service",
  email: CONTACT_EMAIL,
  areaServed: "US-PA",
  availableLanguage: ["English"],
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
  areaServed: [
    "Philadelphia, PA",
    "Bucks County, PA",
    "Montgomery County, PA",
    "Chester County, PA",
    "Delaware County, PA",
  ],
  provider: {
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
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

