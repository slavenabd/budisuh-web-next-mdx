import { allPosts } from "contentlayer/generated";

import { SITE } from "./seo";

interface FeedItem {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
}

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function getPublishedPosts(): FeedItem[] {
  return allPosts
    .filter(post => post.status !== "draft")
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(post => ({
      id: `${SITE.domain}${post.url}`,
      url: `${SITE.domain}${post.url}`,
      title: post.title,
      description: post.description ?? SITE.defaultDescription,
      date: new Date(post.date).toISOString(),
    }));
}

export function generateRssFeed() {
  const posts = getPublishedPosts();
  const items = posts
    .map(
      post => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(post.url)}</link>
      <guid>${xmlEscape(post.id)}</guid>
      <description>${xmlEscape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(SITE.name)}</title>
    <link>${xmlEscape(SITE.domain)}</link>
    <description>${xmlEscape(SITE.defaultDescription)}</description>
${items}
  </channel>
</rss>`;
}

export function generateAtomFeed() {
  const posts = getPublishedPosts();
  const updated = posts[0]?.date ?? new Date().toISOString();
  const entries = posts
    .map(
      post => `  <entry>
    <title>${xmlEscape(post.title)}</title>
    <link href="${xmlEscape(post.url)}" />
    <id>${xmlEscape(post.id)}</id>
    <updated>${post.date}</updated>
    <summary>${xmlEscape(post.description)}</summary>
  </entry>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${xmlEscape(SITE.name)}</title>
  <link href="${xmlEscape(SITE.domain)}" />
  <updated>${updated}</updated>
  <id>${xmlEscape(SITE.domain)}</id>
${entries}
</feed>`;
}

export function generateJsonFeed() {
  const posts = getPublishedPosts();

  return JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1",
      title: SITE.name,
      home_page_url: SITE.domain,
      feed_url: `${SITE.domain}/feed.json`,
      description: SITE.defaultDescription,
      items: posts.map(post => ({
        id: post.id,
        url: post.url,
        title: post.title,
        summary: post.description,
        date_published: post.date,
      })),
    },
    null,
    2
  );
}
