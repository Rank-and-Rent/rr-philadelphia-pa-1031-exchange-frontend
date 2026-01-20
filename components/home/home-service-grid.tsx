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
          <div className="grid gap-px bg-[#5D5838]/10 md:grid-cols-2">
            {filtered.map((service) => (
              <article key={service.slug} className="bg-white p-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Service</p>
                <h3 className="mt-3 text-lg font-semibold text-[#5D5838]">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3F3F3F]">{service.shortDescription}</p>
                <div className="mt-6 flex items-center justify-between text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                  <Link href={`/services/${service.slug}`} className="underline underline-offset-4 hover:text-[#7A7654]">
                    Learn more
                  </Link>
                  <Link href={`/contact?projectType=${buildPrefillQuery(service.name)}#lead-form`} className="underline underline-offset-4 hover:text-[#7A7654]">
                    Prefill contact
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8 text-sm text-[#1B1B1B]">
            <p className="font-semibold text-[#5D5838]">We can help with &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-[#3F3F3F]">
              Share your requirement and we will assemble a tailored service path for your exchange.
            </p>
            <Link
              href={`/contact?projectType=${buildPrefillQuery(query || "Exchange support")}#lead-form`}
              className="mt-6 inline-flex bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326]"
            >
              Contact advisor
            </Link>
          </div>
        )
      ) : (
        <div className="grid gap-px bg-[#5D5838]/10 md:grid-cols-2">
          {featuredCards.map((card) => (
            <article key={card.slug} className="bg-white p-8">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Service</p>
              <h3 className="mt-3 text-lg font-semibold text-[#5D5838]">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3F3F3F]">{card.description}</p>
              <div className="mt-6 flex items-center justify-between text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                <Link href={`/services/${card.slug}`} className="underline underline-offset-4 hover:text-[#7A7654]">
                  Learn more
                </Link>
                <Link href={`/contact?projectType=${buildPrefillQuery(card.title)}#lead-form`} className="underline underline-offset-4 hover:text-[#7A7654]">
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
