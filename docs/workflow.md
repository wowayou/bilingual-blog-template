# Project Workflow

This site is developed locally and deployed through GitHub Actions to Cloudflare Workers Static Assets.

## 1. Local Development

Install dependencies once:

```bash
npm install
```

Run the dev server while editing:

```bash
npm run dev
```

Use the content and configuration map in `docs/maintenance.md` to decide where a change belongs.

## 2. Local Verification

Before opening a pull request or merging to `main`, run:

```bash
npm run check
npm run build
```

For a production-like local preview:

```bash
npm run preview
```

Check at least:

- Home page
- About page
- Blog list
- One article page with table of contents
- Search page
- RSS route

## 3. Review and Merge

Keep changes focused. For visual updates, include desktop and mobile screenshots. For content schema or deployment changes, note the exact config files touched.

Merge to `main` only after local checks pass.

## 4. Production Deployment

Production deploys are handled by `.github/workflows/deploy.yml`.

The workflow runs:

1. `npm ci`
2. `npm run build`
3. `npx wrangler deploy`

Do not use local `wrangler deploy` for routine releases. Local deploys are only for emergencies.

## 5. Required GitHub Settings

Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Variables:

- `SITE_URL`

Optional variables:

- `PUBLIC_GISCUS_ENABLED`
- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- `PUBLIC_GISCUS_THEME`

If the final domain is not ready, use the Cloudflare-provided URL as `SITE_URL` temporarily. Update `SITE_URL` and rerun the workflow when the domain changes.

## 6. Post-Deploy Verification

After GitHub Actions succeeds, verify the production `SITE_URL`:

- `/`
- `/zh/`
- `/zh/about/`
- `/zh/blog/`
- One article page
- `/zh/search/`
- `/zh/rss.xml/`
- `/sitemap-index.xml`

Confirm canonical URLs, RSS links, and search assets resolve under the production URL.

## 7. Rollback

Rollback through Git history:

1. Revert the problematic commit, or reset the branch to the previous stable commit through a normal Git workflow.
2. Push to `main`.
3. Let GitHub Actions redeploy.

Do not treat a manual local deploy as the normal rollback path.
