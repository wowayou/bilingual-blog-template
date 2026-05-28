import { getCollection, type CollectionEntry } from "astro:content";
import { assertKnownTags, type Locale, locales } from "./i18n";

export type BlogEntry = CollectionEntry<"blog">;
export type ProjectEntry = CollectionEntry<"projects">;
export type ContentEntry = BlogEntry | ProjectEntry;
export type CollectionName = "blog" | "projects";

function byDateDesc<T extends ContentEntry>(a: T, b: T) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export async function getBlogPosts(locale?: Locale, includeDrafts = false) {
  const posts = await getCollection("blog", ({ data }) => {
    return (!locale || data.locale === locale) && (includeDrafts || !data.draft);
  });

  if (locale) {
    assertKnownTags(posts.flatMap((post) => post.data.tags), locale);
  }

  return posts.sort(byDateDesc);
}

export async function getProjects(locale?: Locale, includeDrafts = false) {
  const projects = await getCollection("projects", ({ data }) => {
    return (!locale || data.locale === locale) && (includeDrafts || !data.draft);
  });

  if (locale) {
    assertKnownTags(projects.flatMap((project) => project.data.tags), locale);
  }

  return projects.sort(byDateDesc);
}

export async function getEntryBySlug(
  collection: CollectionName,
  locale: Locale,
  slug: string
) {
  const entries =
    collection === "blog" ? await getBlogPosts(locale) : await getProjects(locale);

  return entries.find((entry) => entry.data.slug === slug);
}

export async function getTranslations(collection: CollectionName, contentId: string) {
  const entries =
    collection === "blog" ? await getBlogPosts(undefined) : await getProjects(undefined);

  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      entries.find((entry) => entry.data.locale === locale && entry.data.contentId === contentId)
    ])
  ) as Partial<Record<Locale, ContentEntry>>;
}

export async function getAllTags(locale: Locale) {
  const posts = await getBlogPosts(locale);
  const projects = await getProjects(locale);
  const tags = new Set<string>();

  for (const entry of [...posts, ...projects]) {
    for (const tag of entry.data.tags) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
}

export async function getEntriesByTag(locale: Locale, tag: string) {
  const posts = await getBlogPosts(locale);
  const projects = await getProjects(locale);

  return [...posts, ...projects]
    .filter((entry) => entry.data.tags.includes(tag))
    .sort(byDateDesc);
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}
