import { allPages } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx-components";
import { SITE } from "@/lib/seo";

const PAGE_SLUG = "about";

function getAboutPage() {
  return allPages.find(page => page.slug === PAGE_SLUG) ?? null;
}

export function generateMetadata(): Metadata {
  const page = getAboutPage();

  if (!page) {
    return {
      title: "About",
      description: SITE.defaultDescription,
    };
  }

  const url = `${SITE.domain}${page.url}`;

  return {
    title: page.title,
    description: page.description ?? SITE.defaultDescription,
    alternates: {
      canonical: url,
    },
  };
}

export default function AboutPage() {
  const page = getAboutPage();

  if (!page) {
    notFound();
  }

  return (
    <article className="prose mx-auto max-w-3xl py-12 dark:prose-invert">
      <header className="not-prose mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold">{page.title}</h1>
        {page.description ? (
          <p className="mt-2 text-lg text-gray-600">{page.description}</p>
        ) : null}
      </header>
      <Mdx code={page.body.code} />
    </article>
  );
}
