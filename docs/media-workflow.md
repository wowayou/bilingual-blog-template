# Media Workflow

This template keeps media handling simple. Images are static files, named clearly, and referenced with stable public paths. Do not add an image processing pipeline until a private site has enough real media to justify it.

## Where Images Go

Post and project media should live under:

```text
public/images/posts/<contentId>/
```

Examples:

```text
public/images/posts/markdown-style-guide/cover.webp
public/images/posts/markdown-style-guide/screenshot-01.webp
public/images/posts/markdown-style-guide/diagram-01.svg
```

Use the same `contentId` across translations so Chinese and English versions can share media.

## Cover Images

Add a cover in frontmatter only when it improves scanning or sharing:

```yaml
cover:
  src: "/images/posts/my-post/cover.webp"
  alt: "Short, useful image description"
  caption: "Optional caption"
  objectPosition: "center"
```

The cover is used by article pages, list cards, archive entries, and Open Graph metadata. Do not rely on the first Markdown image as an implicit cover; explicit frontmatter is easier to maintain.

## Size Defaults

Use "good enough" sizes by default:

- Cover image: `1200x675`, 16:9, usually `<200KB`
- Open Graph image: `1200x630` only when a custom social card is needed
- Inline screenshots/photos: `1000-1400px` wide, usually `<300KB`
- Complex screenshots: up to `<500KB` as an exception
- Diagrams and architecture drawings: SVG when practical

Avoid oversized images unless the reader needs to inspect detail.

## Formats

- WebP: default for photos, covers, and screenshots
- SVG: diagrams, charts, interface sketches, and vector illustrations
- PNG: transparent images or screenshots where WebP is not suitable
- JPEG: acceptable for photos when WebP is not available

## Markdown Usage

Use normal Markdown image syntax:

```md
![Screenshot of the publishing workflow](/images/posts/my-post/screenshot-01.webp)
```

Always write meaningful alt text. If an image is decorative, reconsider whether it belongs in the post.

## Maintenance Rules

- Keep media next to the post `contentId`.
- Use lowercase filenames with hyphens.
- Prefer replacing large files before committing.
- Do not commit private source files such as `.psd`, `.fig`, or raw camera exports.
- Do not add automatic image dependencies to the template without a clear maintenance reason.
