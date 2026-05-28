import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = process.env.SITE_URL || "https://example.com";

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "zh",
        locales: {
          zh: "zh-CN",
          en: "en-US"
        }
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
