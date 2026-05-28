# Human Maintenance Guide

This guide is for humans maintaining the Astro bilingual blog template. The goal is to keep content, styling, features, and deployment easy to change without turning one-off edits into long-term debt.

## Project Map

- `src/content/blog/{zh,en}`: blog posts.
- `src/content/projects/{zh,en}`: project notes.
- `src/content/site/*.json`: site title, description, author, About copy, default license, and timezone.
- `src/content/taxonomy/*.json`: localized tag labels and descriptions.
- `src/i18n/messages/*.ts`: fixed UI labels for navigation, buttons, and states.
- `src/layouts/BaseLayout.astro`: document head, navigation, theme switcher, and footer.
- `src/layouts/ContentLayout.astro`: article/project detail pages, table of contents, image zoom, code copy, comments, and content footer.
- `src/styles/global.css`: visual tokens, layout rules, Markdown prose, and component styling.
- `docs/`: workflow, deployment, design, and maintenance documentation.

## Common Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

Run at least `npm run check` and `npm run build` before committing.

## Content Maintenance

Chinese and English posts may be published independently, but translated entries must share the same `contentId`. Keep `slug` values ASCII, short, and stable. Add new tags to every taxonomy file before using them in content.

Use `references` in frontmatter when a post or project should show source links at the end. Use per-entry `license` only when it needs to override the site default.

## Styling Maintenance

Prefer changing CSS variables and existing classes in `global.css` before adding new component-specific styles. When changing typography, colors, shadows, radii, prose width, or card spacing, check both desktop and mobile.

Theme changes must be checked in Light, Dark, and System modes. Motion must respect `prefers-reduced-motion`.

## Feature Maintenance

Keep interactions progressive: static HTML should be useful first, and JavaScript should enhance it. The table of contents, image zoom, code copy, and load more behavior should remain readable without JavaScript.

Use `BaseLayout` for normal pages. Use `ContentLayout` for article-like pages.

## Deployment Maintenance

Production deploys go through GitHub Actions. Do not use local `wrangler deploy` as the normal release path.

GitHub Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

GitHub Variables:

- `SITE_URL`
- `CLOUDFLARE_DEPLOY_ENABLED=true` in the real deploying repository
- Optional `PUBLIC_GISCUS_*`

When the domain changes, update `SITE_URL` and redeploy so canonical URLs, RSS, and sitemap output stay correct.

## Troubleshooting

- Build fails: check frontmatter against `src/content.config.ts`.
- Tag pages fail: check that taxonomy data exists for every locale.
- Search misses pages: check that the page has `data-pagefind-body`.
- Production URLs are wrong: check `SITE_URL`.
- Theme changes feel abrupt: check theme tokens and transition rules.
