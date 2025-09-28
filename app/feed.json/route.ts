// app/feed.json/route.ts
import { NextResponse } from "next/server";

import { generateJsonFeed } from "@/lib/feed";

export async function GET() {
  return new NextResponse(generateJsonFeed(), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
