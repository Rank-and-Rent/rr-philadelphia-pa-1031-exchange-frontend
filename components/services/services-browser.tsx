"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "../../lib/data/services";
import { searchServices, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";

type ServicesBrowserProps = {
  services: Service[];
};

export function ServicesBrowser({ services }: ServicesBrowserProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return services;
    }
    const results = searchServices(query);
    return results.filter((service) => services.some((item) => item.slug === service.slug));
  }, [query, services]);
  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-8">
      <SearchInput
        label="Service search"
        placeholder="Search replacement property support, timelines, underwriting..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {hasResults ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((service) => (
            <article key={service.slug} className="flex h-full flex-col rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service</p>
                  <h3 className="mt-2 text-xl font-semibold text-heading">{service.name}</h3>
                  <p className="mt-3 text-sm text-[#3F3F3F]">{service.shortDescription}</p>
                </div>
                <ul className="space-y-2 text-sm text-[#3F3F3F]">
                  {service.deliverables.slice(0, 3).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
                <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                  Explore service
                </Link>
                <Link href={`/contact?projectType=${buildPrefillQuery(service.name)}#lead-form`} className="underline underline-offset-4">
                  Prefill contact form
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-[#1B1B1B]">
          <p className="font-semibold text-heading">We can help with “{query}”.</p>
          <p className="mt-2">
            Tell us more about this requirement and we will prefill your request to accelerate intake. Reach out below.
          </p>
          <Link
            href={`/contact?projectType=${buildPrefillQuery(query)}#lead-form`}
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
          >
            Contact advisor with prefilled request
          </Link>
        </div>
      )}
    </div>
  );
}

