import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "../../../lib/sanity.client";
import { articleBySlugQuery, articleSlugsQuery } from "../../../lib/queries";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../../lib/config/site";
import { portableTextComponents } from "../../../lib/portableTextComponents";
import { CTASection } from "../../../components/cta-section";
import { createBreadcrumbSchema } from "../../../lib/schema";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

type Article = {
  _id: string;
  title: string;
  excerpt: string;
  content: PortableTextBlock[];
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  seoTitle?: string;
  canonicalUrl?: string;
  slug: string;
  author?: string;
  categories?: Array<{ title: string; slug: string }>;
  featuredImage?: {
    url?: string;
    alt?: string;
    caption?: string;
    attribution?: string;
  };
  internalLinks?: Array<{ text: string; url: string }>;
  externalLinks?: Array<{ text: string; url: string; nofollow?: boolean }>;
  showCTA?: boolean;
  ctaHeader?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
};

export async function generateStaticParams() {
  try {
    const results = await sanityClient.fetch<Array<{ slug: string }>>(articleSlugsQuery);
    return results.map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await sanityClient.fetch<Article | null>(articleBySlugQuery, { slug });
    if (!article) {
      return {};
    }
    const title = article.seoTitle || article.title;
    return {
      title,
      description: article.excerpt,
      alternates: {
        canonical: article.canonicalUrl || `${SITE_URL}/blog/${article.slug}`,
      },
      openGraph: {
        title,
        description: article.excerpt,
        url: `${SITE_URL}/blog/${article.slug}`,
        type: "article",
        images: article.featuredImage?.url
          ? [
              {
                url: article.featuredImage.url,
                alt: article.featuredImage.alt || article.title,
              },
            ]
          : undefined,
      },
    };
  } catch {
    return {};
  }
}

async function fetchArticle(slug: string) {
  try {
    return await sanityClient.fetch<Article | null>(articleBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: article.title, url: `${SITE_URL}/blog/${article.slug}` },
  ]);

  return (
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />
        <article className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Insights for {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}
          </p>
          <h1 className="text-4xl font-semibold text-heading">{article.title}</h1>
          <p className="text-lg text-[#3F3F3F]">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B6B6B]">
            <time dateTime={article.publishedAt}>Published {new Date(article.publishedAt).toLocaleDateString()}</time>
            {article.updatedAt ? (
              <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
            ) : null}
            {article.readingTime ? <span>{article.readingTime} min read</span> : null}
            {article.author ? <span>By {article.author}</span> : null}
          </div>
          {article.categories && article.categories.length > 0 ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {article.categories.map((category) => category.title).join(" • ")}
            </p>
          ) : null}
          {article.featuredImage?.url && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-outline/15 bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.featuredImage.url}
                alt={article.featuredImage.alt || article.title}
                className="h-auto w-full object-cover"
              />
              {article.featuredImage.caption && (
                <p className="mt-2 px-6 pb-4 text-xs text-[#6B6B6B]">{article.featuredImage.caption}</p>
              )}
            </div>
          )}
        </article>
      </section>
      <section className="container space-y-10 bg-white py-16">
        <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-heading prose-p:text-[#3F3F3F] prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-strong:text-heading prose-ul:text-[#3F3F3F] prose-ol:text-[#3F3F3F]">
          <PortableText value={article.content} components={portableTextComponents} />
        </div>
        {article.showCTA !== false ? (
          <div className="rounded-3xl border border-outline/15 bg-panel p-6 text-sm text-[#1B1B1B]">
            <p className="text-lg font-semibold text-heading">
              {article.ctaHeader || "Request 1031 exchange support."}
            </p>
            <p className="mt-2">
              Share your replacement property goals and we will deliver a compliance roadmap within one business day.
            </p>
            <a
              href={article.ctaButtonLink || "/contact#lead-form"}
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
            >
              {article.ctaButtonText || "Contact advisor"}
            </a>
          </div>
        ) : null}
        <section className="rounded-3xl border border-outline/15 bg-panel p-6 text-sm text-[#3F3F3F]">
          <h2 className="text-lg font-semibold text-heading">References and helpful links.</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {article.internalLinks && article.internalLinks.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Internal</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {article.internalLinks.map((link) => (
                    <li key={link.url}>
                      <a className="underline underline-offset-4" href={link.url}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {article.externalLinks && article.externalLinks.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">External</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {article.externalLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        className="underline underline-offset-4"
                        href={link.url}
                        rel={link.nofollow ? "nofollow noopener noreferrer" : "noopener noreferrer"}
                        target="_blank"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
        <CTASection />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}

