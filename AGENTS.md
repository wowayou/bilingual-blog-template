# AGENTS.md

This file gives AI coding agents the project-specific context needed to modify this repository safely.

## Project

This is an Astro static bilingual personal blog template. It supports `/zh/` and `/en/` routes, Markdown/MDX content, localized site profiles, localized taxonomy, RSS, sitemap, Pagefind search, Giscus-ready comments, theme switching, image zoom, table of contents, and code block copy buttons.

## Commands

Use these commands for verification:

```bash
npm run check
npm run build
```

For local development:

```bash
npm run dev
npm run preview
```

For private-site identity setup:

```bash
npm run customize
```

This reads the ignored local `site.customize.json` file and updates localized site profiles plus optional web manifest fields.

Do not run deployment commands unless explicitly asked.

## Important Paths

- `src/content.config.ts`: content collection schema.
- `src/lib/i18n.ts`: locale helpers, UI labels, taxonomy helpers.
- `src/content/site/*.json`: localized site profile data.
- `src/content/taxonomy/*.json`: localized tag metadata.
- `src/i18n/messages/*.ts`: localized UI strings.
- `site.customize.example.json`: example config for one-command private-site replacement.
- `scripts/customize-site.mjs`: applies local `site.customize.json` values to site profiles and manifest.
- `public/images/posts/<contentId>/`: post media using stable public paths.
- `src/layouts/BaseLayout.astro`: base document shell.
- `src/layouts/ContentLayout.astro`: article/project shell and content enhancements.
- `src/styles/global.css`: global tokens, layout, prose, and component styles.
- `docs/maintenance.zh.md` and `docs/maintenance.en.md`: human maintenance guides.

## Editing Rules

- Keep the site static-first. JavaScript should enhance usable HTML, not replace it.
- Do not introduce heavy frontend frameworks or runtime dependencies for small interactions.
- Keep content schema changes backward compatible when possible.
- When adding a UI label, add it to both `src/i18n/messages/zh.ts` and `src/i18n/messages/en.ts`.
- When adding a tag, add it to every taxonomy file before using it in content.
- Keep `site.customize.json` uncommitted. It is for private-site local identity values.
- Keep footer social links in `src/content/site/*.json` under `socialLinks`; use the customization script for repeated private-site setup.
- When adding post images, keep them under `public/images/posts/<contentId>/` and prefer explicit `cover` frontmatter over implicit first-image behavior.
- Keep all routes trailing-slash compatible.
- Respect `prefers-reduced-motion` for visual transitions.
- Do not commit generated directories such as `dist/`, `.astro/`, `.wrangler/`, or `node_modules/`.

## Deployment Rules

Production deploys use GitHub Actions and Cloudflare Workers Static Assets. Required GitHub Secrets are `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Required GitHub Variables are `SITE_URL` and `CLOUDFLARE_DEPLOY_ENABLED=true` in the real deploying repository.

Routine releases should not use local `wrangler deploy`. Local deploys are emergency-only and must be followed by a normal GitHub Actions deployment.

## Verification Checklist

Before finishing any implementation:

- Run `npm run check`.
- Run `npm run build`.
- Confirm any changed localized UI text exists in both languages.
- Confirm no generated output is staged.
