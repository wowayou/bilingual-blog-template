---
title: "双语个人博客"
description: "基于 Astro 的中英文个人博客，支持 Markdown 内容、静态搜索、RSS、SEO 和 Cloudflare 部署。"
pubDate: 2026-05-28
featured: true
contentId: "blog-platform"
slug: "blog-platform"
locale: "zh"
translationStatus: "original"
tags:
  - projects
  - blogging
  - i18n
  - cloudflare
references:
  - title: "Antfu - Posts"
    url: "https://antfu.me/posts"
    note: "归档密度和轻量背景参考"
  - title: "Innei"
    url: "https://innei.in/en"
    note: "主题切换和文章交互参考"
  - title: "Cassie Codes - Writing"
    url: "https://www.cassie.codes/writing/"
    note: "写作列表和深色模式参考"
  - title: "Stitch via MCP"
    url: "https://stitch.withgoogle.com/docs/mcp/setup"
    note: "后续设计工作流参考"
---

这是本站本身的项目记录。首版重点是把基础能力跑通，而不是堆很多复杂功能。

## 范围

- Astro 静态站点
- 中文 `/zh/` 和英文 `/en/` 路由
- Markdown/MDX 内容集合
- Pagefind 静态搜索
- RSS、sitemap、canonical、`hreflang`
- Giscus 评论占位
- GitHub Actions + Wrangler 部署

## 后续

下一步会围绕真实写作体验继续调整，包括文章模板、标签体系、搜索结果样式和备份验证。
