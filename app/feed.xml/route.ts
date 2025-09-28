// app/feed.xml/route.ts
import { NextResponse } from "next/server";

import { generateRssFeed } from "@/lib/feed";

export async function GET() {
  return new NextResponse(generateRssFeed(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
