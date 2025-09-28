// app/atom.xml/route.ts
import { NextResponse } from "next/server";

import { generateAtomFeed } from "@/lib/feed";

export async function GET() {
  return new NextResponse(generateAtomFeed(), {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
