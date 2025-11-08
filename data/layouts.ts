import type { PageLayoutVariant, LayoutAssignments } from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Traditional layout with hero, description, FAQs, and CTA",
    sections: ["hero", "description", "inclusions", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "sidebar",
    label: "Sidebar",
    description: "Content with sidebar navigation and widgets",
    sections: ["hero", "description", "sidebar", "inclusions", "faqs", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean layout focused on content",
    sections: ["hero", "description", "inclusions", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Comprehensive layout with multiple sections",
    sections: ["hero", "description", "inclusions", "situations", "compliance", "faqs", "example", "cta"],
    features: {
      toc: true,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Streamlined layout emphasizing key points",
    sections: ["hero", "description", "inclusions", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "comprehensive",
    label: "Comprehensive",
    description: "Full featured layout with all sections",
    sections: ["hero", "description", "inclusions", "situations", "compliance", "faqs", "example", "cta"],
    features: {
      toc: true,
      stickyCta: true,
      sidebar: true,
      heroStyle: "image",
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Location page starting with map visualization",
    sections: ["hero", "map", "description", "paths", "faqs", "example", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "map",
    },
  },
  {
    key: "content-first",
    label: "Content First",
    description: "Traditional location page layout",
    sections: ["hero", "description", "paths", "faqs", "example", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "sidebar-location",
    label: "Sidebar Location",
    description: "Location page with sidebar navigation",
    sections: ["hero", "description", "sidebar", "paths", "faqs", "example", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "minimal-location",
    label: "Minimal Location",
    description: "Clean location page layout",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "detailed-location",
    label: "Detailed Location",
    description: "Comprehensive location page",
    sections: ["hero", "description", "paths", "faqs", "example", "cta"],
    features: {
      toc: true,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "focused-location",
    label: "Focused Location",
    description: "Streamlined location page",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
];

function assignLayouts<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[],
  category: "services" | "locations"
): Record<string, string> {
  const assignments: Record<string, string> = {};
  const variantKeys = variants.map((v) => v.key);
  let variantIndex = 0;
  let lastVariant = "";

  items.forEach((item, index) => {
    let selectedVariant = variantKeys[variantIndex % variantKeys.length];

    if (selectedVariant === lastVariant && index > 0) {
      variantIndex++;
      selectedVariant = variantKeys[variantIndex % variantKeys.length];
    }

    assignments[item.slug] = selectedVariant;
    lastVariant = selectedVariant;
    variantIndex++;
  });

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayouts(servicesData, serviceVariants, "services"),
  locations: assignLayouts(locationsData, locationVariants, "locations"),
};

