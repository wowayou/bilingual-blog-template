---
title: "Markdown Style Guide"
description: "A template article for checking prose typography, links, lists, tables, code, quotes, and image zoom behavior."
pubDate: 2026-05-28
contentId: "markdown-style-guide"
slug: "markdown-style-guide"
locale: "en"
translationOf: "markdown-style-guide"
translationStatus: "reviewed"
tags:
  - blogging
  - notes
references:
  - title: "Astro Content Collections"
    url: "https://docs.astro.build/en/guides/content-collections/"
    note: "Content collection reference"
---

This article exists to check Markdown styling. It is not meant to tell a complete story; it covers common prose elements.

## Headings and Paragraphs

Body copy should keep a comfortable measure, stable line height, and clear hierarchy. Links such as [Astro](https://astro.build/) should have a visible clickable state.

### Third-Level Heading

Third-level headings split shorter sections and should not overpower second-level headings.

## Lists

- First unordered item
- Second unordered item
  - Nested item
  - Another nested item

1. First ordered item
2. Second ordered item
3. Third ordered item

## Quote

> A good template should become stable before it becomes ornamental.

## Table

| Capability | Status | Notes |
| --- | --- | --- |
| Bilingual routing | Ready | `/zh/` and `/en/` |
| Search | Ready | Pagefind builds the index |
| Theme switching | Added | Light / System / Dark |

## Code

Inline code such as `contentId` should be clear without feeling loud.

```ts
export function localizedPath(locale: string, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}
```

## Image

Clicking the image should open the zoom layer. Press Esc or click the backdrop to close it.

![Markdown sample image](/images/markdown-sample.svg)
