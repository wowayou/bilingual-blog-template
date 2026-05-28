# Private Site From Public Template

Keep this public repository generic. Use a private repository for personal content, private drafts, real identity, and visual identity.

## 1. Set This Repository as a GitHub Template

In GitHub:

1. Open `wowayou/bilingual-blog-template`.
2. Go to **Settings**.
3. In **General**, find **Template repository**.
4. Enable **Template repository**.
5. Save the setting.

After this, GitHub will show **Use this template** on the repository page.

## 2. Create the Private Blog Repository

1. Click **Use this template**.
2. Choose **Create a new repository**.
3. Suggested name: `my-blog` or `wowayou-blog`.
4. Set visibility to **Private**.
5. Create the repository.
6. Clone the private repository locally.

The private repository should become the real blog. The public template should continue to receive generic improvements only.

## 3. First Private-Site Edits

Update these files first:

- `src/content/site/zh.json`
- `src/content/site/en.json`
- `src/content/taxonomy/*.json` if tags change
- `public/favicon.svg`
- `public/site.webmanifest`
- `wrangler.toml`
- GitHub repository variables and secrets

Suggested private-site identity fields:

- `author`: your real or preferred public name
- `title`: your blog name
- `description`: one sentence about the site
- `introTitle`: homepage headline
- `intro`: homepage intro paragraph
- `about`: the About page paragraphs
- `timeZone`: your preferred display timezone

## 4. About Draft

Use this as a starting point in the private repository. Edit names, tone, and details before publishing.

### Chinese

```json
{
  "introTitle": "写作、构建和长期复盘",
  "intro": "这里记录我在技术、AI 工具、产品构思和个人项目中的实践。写作不是为了追热点，而是为了把做过的事、踩过的坑和逐渐清晰的判断沉淀下来。",
  "about": [
    "这里是我的个人博客，用来记录技术实践、AI Coding、文档驱动开发、工具工作流、项目复盘，以及一些关于效率、设计和长期学习的思考。",
    "我会优先写那些对未来的自己仍然有用的内容：为什么这样做、当时有哪些约束、后来是否证明有效。相比追求完整教程，我更在意真实过程、可复用经验和决策背后的上下文。",
    "这个站点也会作为我的长期实验场：从静态博客、双语内容、搜索、评论、部署自动化，到后续可能加入的更细致的阅读体验和个人知识管理流程，都会在这里慢慢演进。"
  ]
}
```

### English

```json
{
  "introTitle": "Writing, building, and long-term reflection",
  "intro": "This site collects my notes on engineering, AI tools, product ideas, and personal projects. The goal is not to chase every trend, but to preserve the work, lessons, and judgments that keep becoming useful.",
  "about": [
    "This is my personal blog for technical practice, AI coding, document-driven development, tool workflows, project retrospectives, and longer thoughts about productivity, design, and learning.",
    "I prioritize writing that remains useful to my future self: why a choice was made, what constraints existed, and whether the decision held up later. Instead of polished tutorials only, I care about real process, reusable experience, and the context behind decisions.",
    "The site is also a long-running experiment. Static publishing, bilingual content, search, comments, deployment automation, reading experience, and personal knowledge workflows can all evolve here over time."
  ]
}
```

## 5. Private Development Workflow

Use a normal branch workflow:

1. Create a branch for each meaningful change.
2. Edit content or styling.
3. Run:

```bash
npm run check
npm run build
```

4. Preview locally when the change is visual:

```bash
npm run preview
```

5. Commit and push.
6. Merge to `main`.
7. Let GitHub Actions deploy.

For visual changes, check:

- Home page
- About page
- Blog list
- One article with table of contents
- Code block copy button
- Light, Dark, and System themes
- Mobile viewport around 390px wide

## 6. Production Setup

In the private repository, configure GitHub Actions and Cloudflare:

GitHub Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

GitHub Variables:

- `SITE_URL`
- Optional `PUBLIC_GISCUS_*`

Update `wrangler.toml`:

```toml
name = "your-blog-worker-name"
compatibility_date = "2026-05-28"
assets = { directory = "./dist" }
```

If the final domain is not ready, use the Cloudflare-provided URL as `SITE_URL` first. Update `SITE_URL` and redeploy after binding the final domain.

## 7. Keeping Template and Private Site in Sync

Template repository:

- Generic features
- Bug fixes
- Documentation
- Content workflow improvements
- Deployment workflow improvements

Private repository:

- Real identity
- Personal writing
- Private drafts
- Custom visual theme
- Real domain and comments
- Analytics or personal integrations

When the public template improves, bring changes into the private site with normal Git merges or cherry-picks. Review conflicts carefully, especially in `src/styles/global.css`, `src/layouts/*`, and `src/content/site/*.json`.

## 8. Maintenance Rhythm

Weekly or after each publishing session:

- Run `npm run check`.
- Run `npm run build`.
- Check GitHub Actions status.
- Confirm production `SITE_URL` still loads.

Monthly:

- Review dependency updates.
- Review Cloudflare deployment status.
- Check RSS and sitemap.
- Clean stale drafts.
- Back up important private notes.
