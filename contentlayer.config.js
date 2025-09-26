import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import readingTime from "reading-time"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

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
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/blog/${doc.slug}` },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: { rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]] },
})
