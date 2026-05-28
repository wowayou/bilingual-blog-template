# 人类程序员维护指南

这份指南面向后续维护这个 Astro 双语博客模板的人。目标是让样式、内容、功能和部署变更都有清晰入口，避免把一次性修改变成长期负担。

## 项目结构

- `src/content/blog/{zh,en}`：博客文章。
- `src/content/projects/{zh,en}`：项目记录。
- `src/content/site/*.json`：站点标题、简介、作者、About 文案、默认许可、时区。
- `src/content/taxonomy/*.json`：标签的多语言名称和说明。
- `src/i18n/messages/*.ts`：导航、按钮、状态等固定 UI 文案。
- `public/images/posts/<contentId>/`：文章和项目图片。
- `src/layouts/BaseLayout.astro`：页面 head、导航、主题切换、页脚。
- `src/layouts/ContentLayout.astro`：文章/项目详情、目录、图片放大、代码复制、评论和文末信息。
- `src/styles/global.css`：全局视觉 token、布局、Markdown 正文和组件样式。
- `docs/`：工作流、部署、设计和维护文档。

## 常用命令

```bash
npm install
npm run dev
npm run customize
npm run check
npm run build
npm run preview
```

提交前至少运行 `npm run check` 和 `npm run build`。

## 一键替换站点资料

私人站建议从 `site.customize.example.json` 复制出本地的 `site.customize.json`，然后运行 `npm run customize`。这个流程会把站点标题、作者、简介、About、时区、许可、页脚社媒链接和 manifest 名称集中替换到对应文件中。

`site.customize.json` 已加入 `.gitignore`，不要提交真实个人资料、私有社媒或未公开站点信息。模板仓库只维护 `site.customize.example.json` 和脚本本身。

## 内容维护

新增文章时，中文和英文可以分开发布，但同一组翻译必须使用相同 `contentId`。`slug` 应保持 ASCII、短、稳定。新增标签前，先在所有 taxonomy 文件里补齐该标签。

如果文章或项目需要文末参考链接，在 frontmatter 中添加 `references`。只有需要覆盖默认许可时才添加单篇 `license`。

只有文章确实需要卡片图、归档图或首图时才添加 `cover`。图片保持简单：静态文件放在 `public/images/posts/<contentId>/`，frontmatter 显式声明，人工压缩。具体规则见 `docs/media-workflow.md`。

## 样式维护

优先调整 `global.css` 中的 CSS 变量和已有类，不要随手新增一次性组件样式。修改字体、颜色、阴影、圆角、正文宽度、卡片间距时，检查桌面和移动端。

主题相关修改必须同时检查 Light、Dark 和 System。动画要兼容 `prefers-reduced-motion`。

## 功能维护

新增交互时保持“静态 HTML 先可用，JavaScript 只增强”。例如目录、图片放大、代码复制和 load more 都应该在无 JS 时保持可阅读。

新增页面优先复用 `BaseLayout`。文章型页面优先复用 `ContentLayout`。

## 部署维护

正式部署走 GitHub Actions。不要把本地 `wrangler deploy` 当作常规发布方式。

GitHub Secrets：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

GitHub Variables：

- `SITE_URL`
- `CLOUDFLARE_DEPLOY_ENABLED=true`，只在真实部署仓库中开启
- 可选 `PUBLIC_GISCUS_*`

域名变化后必须更新 `SITE_URL` 并重新部署，确保 canonical、RSS 和 sitemap 正确。

## 排查清单

- 构建失败：检查 frontmatter 是否符合 `src/content.config.ts`。
- 标签页失败：检查 taxonomy 是否补齐所有语言。
- 搜索缺内容：检查页面是否包含 `data-pagefind-body`。
- 线上 URL 错误：检查 `SITE_URL`。
- 样式切换突兀：检查 theme token 和 transition 规则。
