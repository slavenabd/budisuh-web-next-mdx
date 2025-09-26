// app/feed.xml/route.ts
import { NextResponse } from "next/server";
import { Feed } from "feed";
import { allPosts } from "contentlayer/generated";
import { SITE } from "@/lib/seo";

function buildFeed() {
  const feed = new Feed({
    title: SITE.name,
    id: SITE.domain,
    link: SITE.domain,
    description: SITE.defaultDescription,
  });
  allPosts
    .filter(p => p.status !== "draft")
    .sort((a,b)=> (a.date < b.date ? 1 : -1))
    .forEach(p => {
      feed.addItem({
        title: p.title,
        id: `${SITE.domain}${p.url}`,
        link: `${SITE.domain}${p.url}`,
        date: new Date(p.date),
        description: p.description,
      });
    });
  return feed;
}

export async function GET() {
  const feed = buildFeed();
  return new NextResponse(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
