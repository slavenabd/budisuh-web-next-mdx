// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "@vercel/og";
import { allPosts } from "contentlayer/generated";
export const runtime = "edge";

export async function GET(
  req: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const post = allPosts.find(p => p.slug === slug);
  const title = post?.title ?? "Article";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "white",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800 }}>{title}</div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#555" }}>
          Your Blog Name
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
