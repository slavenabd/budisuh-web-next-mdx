import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

import { Mdx } from "@/components/mdx-components"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } }
): Promise<Metadata> {
  const post = allPosts.find(p => p.slug === slug && p.status !== "draft");
  if (!post) return {};
  const url = `${SITE.domain}${post.url}`;
  const title = post.title;
  const description = post.description ?? SITE.defaultDescription;
  const img = post.cover || SITE.defaultImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: img }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
      site: SITE.twitter,
    },
  };
}

export default function PostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === slug && p.status !== "draft");
  if (!post) return notFound();

  // ... your existing MDX rendering
  // Example:
  // const MDX = useMDXComponent(post.body.code)
  // return <article className="prose mx-auto"><h1>{post.title}</h1><MDX /></article>
}

export async function generateStaticParams() {
  return allPosts
    .filter(p => p.status !== "draft")
    .map(p => ({ slug: p.slug }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  )
}
