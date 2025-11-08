import { services } from "./data/services";
import { locations } from "./data/locations";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();

export function searchServices(query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    return services;
  }

  const normalizedQuery = normalize(trimmed);

  const exactMatches = services.filter((service) =>
    normalize(service.name).includes(normalizedQuery)
  );

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  return services.filter((service) =>
    service.keywords.some((keyword) => normalize(keyword).includes(normalizedQuery))
  );
}

export function searchLocations(query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    return locations;
  }

  const normalizedQuery = normalize(trimmed);

  const exactMatches = locations.filter((location) =>
    normalize(location.name).includes(normalizedQuery)
  );

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  return locations.filter((location) =>
    location.highlights.some((highlight) => normalize(highlight).includes(normalizedQuery))
  );
}

export function buildPrefillQuery(label: string) {
  return encodeURIComponent(label);
}

