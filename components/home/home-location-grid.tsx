"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Location } from "../../lib/data/locations";
import { searchLocations, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";
import { getLocationImageBasePath } from "../../lib/utils/images-client";

type FeaturedLocationCard = {
  name: string;
  description: string;
  slug: string;
};

type HomeLocationGridProps = {
  featuredSlugs: string[];
  locations: Location[];
  featuredCards: FeaturedLocationCard[];
};

export function HomeLocationGrid({ featuredSlugs, locations, featuredCards }: HomeLocationGridProps) {
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () =>
      featuredSlugs
        .map((slug) => locations.find((location) => location.slug === slug))
        .filter((location): location is NonNullable<typeof location> => Boolean(location)),
    [featuredSlugs, locations]
  );

  const filtered = useMemo(() => {
    if (!query) {
      return featured;
    }
    return searchLocations(query).slice(0, 8);
  }, [featured, query]);

  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search service areas"
        placeholder="Search Philadelphia neighborhoods or suburbs..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {query ? (
        hasResults ? (
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((location) => {
              const imageBasePath = getLocationImageBasePath(location.slug);
              return (
                <article key={location.slug} className="group overflow-hidden bg-white text-center">
                  {imageBasePath && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={`${imageBasePath}.webp`}
                        alt={location.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const currentSrc = target.src;
                          const basePath = currentSrc.replace(/\.(webp|avif|jpg|jpeg|png)$/, '');
                          const extensions = ['.jpg', '.avif', '.jpeg', '.png'];
                          const currentExt = currentSrc.match(/\.(webp|avif|jpg|jpeg|png)$/)?.[0];
                          const currentIndex = extensions.indexOf(currentExt || '');
                          if (currentIndex < extensions.length - 1) {
                            target.src = `${basePath}${extensions[currentIndex + 1]}`;
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="py-4">
                    <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838]">{location.name}</h3>
                    <div className="mt-3 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                      <Link href={`/locations/${location.slug}`} className="underline underline-offset-4 hover:text-[#7A7654]">
                        View
                      </Link>
                      <Link
                        href={`/contact?projectType=${buildPrefillQuery(location.name)}#contact-form`}
                        className="underline underline-offset-4 hover:text-[#7A7654]"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8 text-sm text-[#1B1B1B]">
            <p className="font-semibold text-[#5D5838]">We can help with &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-[#3F3F3F]">
              Tell us which jurisdiction you are targeting and we will assign the appropriate Pennsylvania exchange advisor.
            </p>
            <Link
              href={`/contact?projectType=${buildPrefillQuery(query || "Other location")}#lead-form`}
              className="mt-6 inline-flex bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326]"
            >
              Contact advisor
            </Link>
          </div>
        )
      ) : (
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredCards.map((location) => {
            const imageBasePath = getLocationImageBasePath(location.slug);
            return (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group overflow-hidden bg-white text-center"
              >
                {imageBasePath && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={`${imageBasePath}.webp`}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const currentSrc = target.src;
                        const basePath = currentSrc.replace(/\.(webp|avif|jpg|jpeg|png)$/, '');
                        const extensions = ['.jpg', '.avif', '.jpeg', '.png'];
                        const currentExt = currentSrc.match(/\.(webp|avif|jpg|jpeg|png)$/)?.[0];
                        const currentIndex = extensions.indexOf(currentExt || '');
                        if (currentIndex < extensions.length - 1) {
                          target.src = `${basePath}${extensions[currentIndex + 1]}`;
                        }
                      }}
                    />
                  </div>
                )}
                <div className="py-4">
                  <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838]">{location.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
