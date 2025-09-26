// app/atom.xml/route.ts
import { NextResponse } from "next/server";
import { Feed } from "feed";
import { allPosts } from "contentlayer/generated";
import { SITE } from "@/lib/seo";

export async function GET() {
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
  return new NextResponse(feed.atom1(), {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
