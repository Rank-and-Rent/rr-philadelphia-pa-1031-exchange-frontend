import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";

type PortableImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};

type PortableLinkValue = {
  href: string;
};

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: PortableImageValue }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const { alt = "Article image", caption } = value;
      return (
        <figure className="my-6 rounded-3xl border border-outline/15 bg-panel p-4 text-sm text-[#3F3F3F]">
          <p className="font-semibold text-heading">[Image asset configured in Sanity]</p>
          <p className="mt-2">
            Alt text: {alt}
          </p>
          {caption ? <p className="mt-1 text-xs text-[#6B6B6B]">Caption: {caption}</p> : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: PortableLinkValue }) => {
      if (!value?.href) {
        return <>{children}</>;
      }
      const rel = value.href.startsWith("/") ? undefined : "noopener noreferrer";
      const target = value.href.startsWith("/") ? undefined : "_blank";
      return (
        <Link href={value.href} rel={rel} target={target} className="underline underline-offset-4 text-primary">
          {children}
        </Link>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 text-2xl font-semibold text-heading">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 text-xl font-semibold text-heading">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mt-4 text-sm text-[#3F3F3F]">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="mt-6 border-l-4 border-primary bg-panel p-4 text-sm text-[#1B1B1B]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-[#3F3F3F]">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-[#3F3F3F]">{children}</ol>
    ),
  },
};

