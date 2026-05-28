import rss from "@astrojs/rss";
import { getBlogPosts } from "../../lib/content";
import { isLocale, localizedPath, t } from "../../lib/i18n";

export async function getStaticPaths() {
  return [{ params: { lang: "zh" } }, { params: { lang: "en" } }];
}

export async function GET(context: { params: { lang?: string }; site?: URL }) {
  const locale = isLocale(context.params.lang) ? context.params.lang : "zh";
  const posts = await getBlogPosts(locale);

  return rss({
    title: t(locale, "siteTitle"),
    description: t(locale, "siteDescription"),
    site: context.site ?? new URL("https://example.com"),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: localizedPath(locale, `blog/${post.data.slug}`)
    }))
  });
}
