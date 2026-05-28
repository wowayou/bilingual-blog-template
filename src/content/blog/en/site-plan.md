---
title: "First-pass plan for a bilingual personal blog"
description: "Turning the blog idea into a publishable structure with bilingual routes, content collections, search, RSS, comments, and Cloudflare deployment."
pubDate: 2026-05-28
featured: true
contentId: "site-plan"
slug: "site-plan"
locale: "en"
translationOf: "site-plan"
translationStatus: "reviewed"
tags:
  - blogging
  - i18n
  - cloudflare
---

This post captures the first version of the site architecture. The goal is not to build a heavy product on day one, but to create a durable base for long-term writing: posts, projects, archives, search, RSS, comment placeholders, and a deployment pipeline.

## Routes

Chinese lives under `/zh/`, English lives under `/en/`, and `/` acts as a language entry page. That avoids forced geo redirects while still making each locale explicit for readers and search engines.

Posts and projects use stable ASCII slugs. Titles can change freely, while URLs stay easy to share and preserve.

## Content

Content lives in Astro content collections, split by language directories. Each entry has a `contentId` that pairs translations. When a translation is missing, the language switch shows the unavailable state instead of falling back to the wrong language body.

## Publishing

The first deployment target is Cloudflare Workers Static Assets. After pushing to GitHub, GitHub Actions runs checks, builds the site, generates the Pagefind index, and deploys with Wrangler.

Later passes can add the final domain, a Giscus comments repository, backup mirrors, and monitoring.
