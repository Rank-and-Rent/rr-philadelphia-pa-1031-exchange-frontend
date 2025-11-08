import groq from "groq";

export const articlesQuery = groq`*[_type == "article" && published == true && !defined(noIndex) || noIndex == false] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  "featuredImage": {
    "url": featuredImage.image.asset->url,
    alt: featuredImage.alt
  },
  "author": author->name,
  "categories": categories[]->title
}`;

export const paginatedArticlesQuery = (start: number, end: number) =>
  groq`{
    "total": count(${articlesQuery}),
    "items": (${articlesQuery})[${start}...${end}]
  }`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug && published == true][0]{
  _id,
  title,
  excerpt,
  content,
  publishedAt,
  updatedAt,
  readingTime,
  seoTitle,
  canonicalUrl,
  noIndex,
  "slug": slug.current,
  "author": author->name,
  "categories": categories[]->{
    title,
    "slug": slug.current
  },
  "featuredImage": {
    "url": featuredImage.image.asset->url,
    alt: featuredImage.alt,
    caption: featuredImage.caption,
    attribution: featuredImage.attribution
  },
  structuredData,
  internalLinks,
  externalLinks,
  showCTA,
  ctaHeader,
  ctaButtonText,
  ctaButtonLink
}`;

export const articleSlugsQuery = groq`*[_type == "article" && defined(slug.current) && published == true]{ "slug": slug.current }`;

