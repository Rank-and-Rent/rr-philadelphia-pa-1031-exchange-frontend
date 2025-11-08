"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "../../lib/data/services";
import { searchServices, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";

type RelatedServicesPanelProps = {
  services: Service[];
};

export function RelatedServicesPanel({ services }: RelatedServicesPanelProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return services;
    }
    const matches = searchServices(query);
    return matches.filter((match) => services.some((item) => item.slug === match.slug));
  }, [query, services]);

  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-6">
      <SearchInput
        label="Filter related services"
        placeholder="Search related strategies..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {hasResults ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((service) => (
            <article key={service.slug} className="rounded-3xl border border-outline/15 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Related service</p>
              <h4 className="mt-2 text-lg font-semibold text-heading">{service.name}</h4>
              <p className="mt-2 text-sm text-[#3F3F3F]">{service.shortDescription}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
                <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                  View details
                </Link>
                <Link
                  href={`/contact?projectType=${buildPrefillQuery(service.name)}#lead-form`}
                  className="underline underline-offset-4"
                >
                  Prefill contact
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-[#1B1B1B]">
          <p className="font-semibold text-heading">We can help with “{query}”.</p>
          <p className="mt-2">
            Submit your request and we will assign a specialist to source or underwrite this requirement.
          </p>
          <Link
            href={`/contact?projectType=${buildPrefillQuery(query)}#lead-form`}
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
          >
            Contact advisor
          </Link>
        </div>
      )}
    </div>
  );
}

