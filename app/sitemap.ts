import { allPosts } from "contentlayer/generated";
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts
    .filter(p => p.status !== "draft")
    .map(p => ({ url: `${SITE.domain}${p.url}`, lastModified: p.date }));
  // Add home page and blog index:
  const base = [
    { url: `${SITE.domain}/`, lastModified: new Date() },
    { url: `${SITE.domain}/blog`, lastModified: new Date() },
  ];
  return [...base, ...posts];
}