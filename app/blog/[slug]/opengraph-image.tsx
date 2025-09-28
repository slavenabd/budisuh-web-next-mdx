import { ImageResponse } from "next/og";

import { allPosts } from "contentlayer/generated";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug ?? "";
  const post = allPosts.find(
    entry => entry.slug === slug && entry.status !== "draft"
  );

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
    size
  );
}
