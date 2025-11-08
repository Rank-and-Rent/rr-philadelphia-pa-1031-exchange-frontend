import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  console.warn("Sanity environment variables are not configured. Blog pages will render without content.");
}

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});

