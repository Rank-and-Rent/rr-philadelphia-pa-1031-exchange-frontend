import type { Metadata } from "next";
import { sanityClient } from "../../lib/sanity.client";
import { paginatedArticlesQuery } from "../../lib/queries";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { BlogBrowser, type BlogSummary } from "../../components/blog/blog-browser";
import { CTASection } from "../../components/cta-section";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../lib/config/site";

export const metadata: Metadata = {
  title: "Insights | 1031 Exchange Philadelphia",
  description:
    "Read technical insights on replacement property identification, underwriting, and exchange compliance for investors active in Philadelphia, PA.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

async function fetchArticles() {
  try {
    const data = await sanityClient.fetch<{ total: number; items: BlogSummary[] }>(paginatedArticlesQuery(0, 60));
    if (!data || !data.items) {
      return { total: 0, items: [] };
    }
    return data;
  } catch (error) {
    console.warn("Failed to fetch Sanity articles", error);
    return { total: 0, items: [] };
  }
}

export default async function BlogPage() {
  const { total, items } = await fetchArticles();
  return (
    <>
      <section className="bg-[#F4F3EE] py-16">
        <div className="container space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Insights</p>
            <h1 className="text-4xl font-semibold text-heading">Exchange intelligence from {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.</h1>
            <p className="text-lg text-[#3F3F3F]">
              Field notes on identification tactics, underwriting best practices, and compliance checkpoints supporting Section 1031 exchanges throughout Pennsylvania.
            </p>
          </div>
        </div>
      </section>
      <section className="container space-y-12 py-16">
        <BlogBrowser posts={items} total={total} />
        <CTASection />
      </section>
    </>
  );
}

