# Roadmap

This roadmap keeps the public template focused while making it easy to start a private blog from it.

## Template v0.2 Finalization

Status: current focus.

- Bilingual content structure
- Theme switching
- Search, RSS, sitemap, and Cloudflare workflow
- Article table of contents
- Image zoom and code copy
- Cover image support
- Footer social links
- Media workflow documentation
- Human and AI maintenance documentation

Exit criteria:

```bash
npm run check
npm run build
```

The public repository should remain generic and suitable for GitHub Template usage.

## Private Blog v0.1

Start after the public repository is marked as a GitHub Template.

- Create a private repository from the template.
- Update real site profile data, About copy, favicon, and social links.
- Add the first real posts and projects.
- Configure Cloudflare secrets and `SITE_URL`.
- Set `CLOUDFLARE_DEPLOY_ENABLED=true`.
- Publish the first real article.

The private repository is where personal identity, custom visuals, private drafts, and real deployment settings belong.

## Private Blog v0.2+

Enhance only after real writing has started:

- Custom typography and visual tokens
- Real cover images and social cards
- Giscus comments
- Domain setup and production monitoring
- Backup workflow
- Better search UI if Pagefind default UI becomes limiting

## Later Template Improvements

Consider only when repeated private-site needs prove them useful:

- Optional Astro image pipeline
- Automated image compression
- Series pages
- Related posts
- More flexible navigation sections
- Optional analytics integration

Avoid adding complexity to the public template before it has a clear maintenance payoff.
