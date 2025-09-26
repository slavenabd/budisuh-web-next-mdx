import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export const dynamic = "force-static"; // build-time
export default function Index() {
  const posts = allPosts
    .filter(p => p.status !== "draft")
    .sort((a,b)=> (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <ul className="space-y-6">
        {posts.map(p => (
          <li key={p.slug}>
            <Link href={p.url} className="text-xl font-semibold underline">
              {p.title}
            </Link>
            <p className="text-gray-600">{p.description}</p>
            <div className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
