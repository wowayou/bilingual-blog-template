import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const sharedSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  contentId: z.string(),
  slug: z.string(),
  locale: z.enum(["zh", "en"]),
  translationOf: z.string().optional(),
  translationStatus: z.enum(["original", "machine", "reviewed"]),
  sourceHash: z.string().optional(),
  tags: z.array(z.string()).default([]),
  license: z
    .object({
      label: z.string(),
      url: z.url()
    })
    .optional(),
  references: z
    .array(
      z.object({
        title: z.string(),
        url: z.url(),
        note: z.string().optional()
      })
    )
    .default([])
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, "")
  }),
  schema: sharedSchema.extend({
    author: z.string().default("XCG")
  })
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, "")
  }),
  schema: sharedSchema.extend({
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional()
  })
});

export const collections = { blog, projects };
