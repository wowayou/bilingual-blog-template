---
title: "中英文个人博客首版规划"
description: "把个人博客从想法收敛到可发布结构：双语路由、内容集合、搜索、RSS、评论和 Cloudflare 部署。"
pubDate: 2026-05-28
featured: true
contentId: "site-plan"
slug: "site-plan"
locale: "zh"
translationStatus: "original"
tags:
  - blogging
  - i18n
  - cloudflare
---

这篇文章记录本站首版的结构选择。目标不是一次性做成复杂产品，而是先把长期写作需要的底座搭稳：文章、项目、归档、搜索、RSS、评论占位、部署流水线。

## 路由

中文入口是 `/zh/`，英文入口是 `/en/`，根路径 `/` 只负责语言选择。这样既不会按地理位置强行跳转，也能让搜索引擎清楚理解每种语言的页面。

文章和项目都使用稳定的 ASCII slug。中文标题可以自由变化，URL 仍然保持长期可引用。

## 内容

内容放在 Astro content collections 里，中文和英文按目录拆开。每篇内容都有 `contentId`，用来把不同语言版本配对。缺失译文时，语言切换会显示不可用状态，而不是拿另一种语言的正文兜底。

## 发布

首版部署目标是 Cloudflare Workers Static Assets。推送到 GitHub 后，GitHub Actions 执行检查、构建、Pagefind 索引生成和 Wrangler 部署。

后续可以逐步补充真实域名、Giscus 评论仓库、备份镜像和监控。
