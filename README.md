# Bilingual Personal Blog Template

Astro-based bilingual personal blog template with Markdown/MDX content, `/zh/` and `/en/` routes, theme switching, code block copy buttons, static search, RSS, sitemap, favicon/manifest metadata, Giscus-ready comments, and Cloudflare Workers Static Assets deployment.

## Quick Start

```bash
npm install
npm run dev
```

Use `SITE_URL=https://BLOG_DOMAIN npm run build` for a production build with the final domain.

## Content

Blog posts live in:

- `src/content/blog/zh/*.md`
- `src/content/blog/en/*.md`

Projects live in:

- `src/content/projects/zh/*.md`
- `src/content/projects/en/*.md`

Use the same `contentId` and ASCII `slug` across translations. Missing translations are allowed; the language switch disables unavailable versions instead of falling back to the wrong language.

## Site Profile

Localized profile edits live in:

- `src/content/site/zh.json`
- `src/content/site/en.json`

UI labels live in `src/i18n/messages/*`. Localized tag labels live in `src/content/taxonomy/*`.

## UI Features

- Light / System / Dark theme switching
- Article table of contents with desktop sticky navigation and mobile dialog navigation
- Click-to-zoom article images
- Copy buttons on Markdown code blocks
- Load more behavior for long listing pages
- SVG favicon and web manifest in `public/`

## Translation Drafts

Create a paired draft without overwriting reviewed translations:

```bash
npm run translate -- --type blog --from zh --to en --id moonlight-ipad-sidecar
```

The script creates a `draft: true` Markdown file with `translationStatus: machine` and a `sourceHash` so stale drafts can be detected later.

## Deployment

CI runs on pushes and pull requests. Production deploys should go through GitHub Actions. The deploy workflow builds the site and deploys it with Wrangler to Cloudflare Workers Static Assets.

Deploy is disabled by default for template repositories. Enable it only in the real site repository by adding this repository variable:

- `CLOUDFLARE_DEPLOY_ENABLED=true`

Add these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Add this repository variable:

- `SITE_URL`, for example `https://BLOG_DOMAIN`

Giscus comments are disabled until the `PUBLIC_GISCUS_*` variables are filled.

Routine releases should not use local `wrangler deploy`. Use local deploys only for emergency recovery, then follow up with a matching commit and GitHub Actions deployment.

## Docs

- `docs/workflow.md`: publish from zero to first post
- `docs/private-site.md`: create a private personal site from the public template
- `docs/design-workflow.md`: optional Stitch / MCP design workflow
- `docs/media-workflow.md`: cover images, inline images, sizing, and naming rules
- `docs/roadmap.md`: template and private-site roadmap
- `docs/maintenance.md`: maintenance guide index
- `docs/maintenance.zh.md`: Chinese human maintenance guide
- `docs/maintenance.en.md`: English human maintenance guide
- `AGENTS.md`: repository instructions for AI coding agents
