import { defineDocumentType, makeSource } from "contentlayer/source-files";
const WORDS_PER_MINUTE = 200;

const readingTime = (text) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = words / WORDS_PER_MINUTE;

  return {
    text: `${Math.max(1, Math.ceil(minutes))} min read`,
    minutes,
    time: Math.ceil(minutes * 60 * 1000),
    words,
  };
};

const removeDirectoryPrefix = (doc, prefix) =>
  doc._raw.flattenedPath.replace(new RegExp(`^${prefix}/`), "");

/** @type {import('contentlayer/source-files').ComputedFields} */
const pageComputedFields = {
  slug: {
    type: "string",
    resolve: doc => removeDirectoryPrefix(doc, "pages"),
  },
  url: {
    type: "string",
    resolve: doc => `/${removeDirectoryPrefix(doc, "pages")}`,
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true }, // keep this stable for SEO
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    cover: { type: "string" },                // /public/images/my-cover.jpg
    status: { type: "string", default: "published" }, // or draft
    author: { type: "string", required: true},
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/blog/${doc.slug}` },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
  },
  computedFields: pageComputedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Page],
})
