import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx-components";
import { SITE } from "@/lib/seo";

interface PageProps {
  params: {
    slug: string;
  };
}

function getPostFromParams(params: PageProps["params"]) {
  const slug = params?.slug ?? "";
  const post = allPosts.find(
    entry => entry.slug === slug && entry.status !== "draft"
  );

  return post ?? null;
}

export async function generateStaticParams() {
  return allPosts
    .filter(post => post.status !== "draft")
    .map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getPostFromParams(params);

  if (!post) {
    return {};
  }

  const url = `${SITE.domain}${post.url}`;
  const img = post.cover || SITE.defaultImage;

  return {
    title: post.title,
    description: post.description ?? SITE.defaultDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description ?? SITE.defaultDescription,
      images: [{ url: img }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      title: post.title,
      description: post.description ?? SITE.defaultDescription,
      images: [img],
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose mx-auto max-w-3xl py-12 dark:prose-invert">
      <header className="not-prose mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        {post.description ? (
          <p className="mt-2 text-lg text-gray-600">{post.description}</p>
        ) : null}
        <time
          dateTime={post.date}
          className="mt-4 block text-sm text-gray-500"
        >
          {new Date(post.date).toLocaleDateString("hr-HR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </header>
      <Mdx code={post.body.code} />
    </article>
  );
}
