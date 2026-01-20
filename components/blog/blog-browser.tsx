"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { buildPrefillQuery } from "../../lib/search";

export type BlogSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: number;
  featuredImage?: {
    url?: string;
    alt?: string;
  };
  author?: string;
  categories?: string[];
};

type BlogBrowserProps = {
  posts: BlogSummary[];
  total: number;
};

export function BlogBrowser({ posts, total }: BlogBrowserProps) {
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const determinePageSize = () => {
      const width = window.innerWidth;
      setPageSize(width >= 1024 ? 6 : 3);
      setPage(1);
    };
    determinePageSize();
    window.addEventListener("resize", determinePageSize);
    return () => window.removeEventListener("resize", determinePageSize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [currentPage, pageSize, posts]);

  if (posts.length === 0) {
    return (
      <div className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8 text-sm text-[#1B1B1B]">
        <p className="font-semibold text-[#5D5838]">Articles will be published soon.</p>
        <p className="mt-2 text-[#3F3F3F]">
          Share your exchange priorities and we will notify you when new guidance is available.
        </p>
        <Link
          href={`/contact?projectType=${buildPrefillQuery("Blog updates")}#lead-form`}
          className="mt-6 inline-flex bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326]"
        >
          Contact advisor
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-1 md:grid-cols-2">
        {paginatedPosts.map((post) => (
          <article key={post._id} className="flex h-full flex-col bg-white">
            {post.featuredImage?.url ? (
              <div className="aspect-[16/9] overflow-hidden bg-[#F8F7F4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} className="h-full w-full object-cover" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col space-y-3 p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#5D5838]/60">
                <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</time>
                {post.readingTime ? <span>• {post.readingTime} min read</span> : null}
              </div>
              <h2 className="text-lg font-semibold text-[#5D5838]">
                <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[#7A7654]">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm leading-relaxed text-[#3F3F3F]">{post.excerpt}</p>
              {post.categories && post.categories.length > 0 ? (
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">
                  {post.categories.join(" • ")}
                </p>
              ) : null}
              <div className="mt-auto flex items-center justify-between text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838]">
                <Link href={`/blog/${post.slug}`} className="underline underline-offset-4 hover:text-[#7A7654]">
                  Read article
                </Link>
                <Link
                  href={`/contact?projectType=${buildPrefillQuery(`Discuss article: ${post.title}`)}#lead-form`}
                  className="underline underline-offset-4 hover:text-[#7A7654]"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-[#3F3F3F]">
          Page {currentPage} of {totalPages} · {total} published articles
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="border border-[#5D5838] px-5 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="border border-[#5D5838] px-5 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
