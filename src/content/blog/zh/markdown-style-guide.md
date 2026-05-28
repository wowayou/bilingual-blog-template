---
title: "Markdown 样式指南"
description: "用于验收正文排版、链接、列表、表格、代码、引用和图片放大效果的模板文章。"
cover:
  src: "/images/posts/markdown-style-guide/cover.svg"
  alt: "Markdown 样式指南封面示意图"
  caption: "模板封面示例：用于验证文章首图、卡片图和归档图。"
pubDate: 2026-05-28
contentId: "markdown-style-guide"
slug: "markdown-style-guide"
locale: "zh"
translationStatus: "original"
tags:
  - blogging
  - notes
references:
  - title: "Astro Content Collections"
    url: "https://docs.astro.build/en/guides/content-collections/"
    note: "内容集合参考"
---

这是一篇专门用来检查正文样式的文章。它不追求完整叙事，只覆盖常见 Markdown 元素。

## 标题与段落

正文应该保持舒适的行宽、稳定的行高和清楚的层级。链接例如 [Astro](https://astro.build/) 应该有足够清晰的可点击状态。

### 三级标题

三级标题用于拆分较短的小节，不应该比二级标题更抢眼。

## 列表

- 无序列表第一项
- 无序列表第二项
  - 嵌套列表项
  - 另一条嵌套列表项

1. 有序列表第一项
2. 有序列表第二项
3. 有序列表第三项

## 引用

> 好的模板应该先稳定，再漂亮；先让真实写作进来，再让装饰慢慢长出来。

## 表格

| 能力 | 状态 | 备注 |
| --- | --- | --- |
| 双语路由 | 已有 | `/zh/` 与 `/en/` |
| 搜索 | 已有 | Pagefind 构建时生成 |
| 主题切换 | 新增 | Light / System / Dark |

## 代码

行内代码如 `contentId` 应该清楚但不刺眼。

```ts
export function localizedPath(locale: string, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}
```

## 图片

点击图片应该打开放大层，按 Esc 或点击遮罩关闭。

![Markdown sample image](/images/markdown-sample.svg)
