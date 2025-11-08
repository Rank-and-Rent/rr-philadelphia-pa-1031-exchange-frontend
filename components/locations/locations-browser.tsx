"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Location } from "../../lib/data/locations";
import { searchLocations, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";

type LocationsBrowserProps = {
  locations: Location[];
};

export function LocationsBrowser({ locations }: LocationsBrowserProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return locations;
    }
    const results = searchLocations(query);
    return results.filter((location) => locations.some((item) => item.slug === location.slug));
  }, [locations, query]);
  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-8">
      <SearchInput
        label="Location search"
        placeholder="Search by neighborhood or county..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {hasResults ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((location) => (
            <article key={location.slug} className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service area</p>
              <h3 className="mt-2 text-xl font-semibold text-heading">{location.name}</h3>
              <p className="mt-3 text-sm text-[#3F3F3F]">{location.shortDescription}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                {location.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
                <Link href={`/locations/${location.slug}`} className="underline underline-offset-4">
                  View location
                </Link>
                <Link
                  href={`/contact?projectType=${buildPrefillQuery(location.name)}#lead-form`}
                  className="underline underline-offset-4"
                >
                  Contact advisor
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-[#1B1B1B]">
          <p className="font-semibold text-heading">We can help with “{query}”.</p>
          <p className="mt-2">
            Provide the target jurisdiction and we will assign Pennsylvania counsel to confirm transfer tax and closing requirements.
          </p>
          <Link
            href={`/contact?projectType=${buildPrefillQuery(query || "Other")}#lead-form`}
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
          >
            Contact advisor
          </Link>
        </div>
      )}
    </div>
  );
}

