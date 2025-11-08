"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "../../lib/data/services";
import { searchServices, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";

type FeaturedCard = {
  title: string;
  description: string;
  slug: string;
};

type HomeServiceGridProps = {
  featuredSlugs: string[];
  services: Service[];
  featuredCards: FeaturedCard[];
};

export function HomeServiceGrid({ featuredSlugs, services, featuredCards }: HomeServiceGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return featuredSlugs
        .map((slug) => services.find((service) => service.slug === slug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service));
    }
    return searchServices(query).slice(0, 6);
  }, [featuredSlugs, query, services]);

  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search services"
        placeholder="Search timeline control, identification, underwriting..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {query ? (
        hasResults ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((service) => (
              <article key={service.slug} className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service</p>
                <h3 className="mt-2 text-xl font-semibold text-heading">{service.name}</h3>
                <p className="mt-3 text-sm text-[#3F3F3F]">{service.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
                  <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                    Learn more
                  </Link>
                  <Link href={`/contact?projectType=${buildPrefillQuery(service.name)}#lead-form`} className="underline underline-offset-4">
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
              Share your requirement and we will assemble a tailored service path for your exchange.
            </p>
            <Link
              href={`/contact?projectType=${buildPrefillQuery(query || "Exchange support")}#lead-form`}
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
            >
              Contact advisor
            </Link>
          </div>
        )
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {featuredCards.map((card) => (
            <article key={card.slug} className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service</p>
              <h3 className="mt-2 text-xl font-semibold text-heading">{card.title}</h3>
              <p className="mt-3 text-sm text-[#3F3F3F]">{card.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
                <Link href={`/services/${card.slug}`} className="underline underline-offset-4">
                  Learn more
                </Link>
                <Link href={`/contact?projectType=${buildPrefillQuery(card.title)}#lead-form`} className="underline underline-offset-4">
                  Prefill contact
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

