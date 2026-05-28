# Design Workflow

This document describes how to evolve the visual design of this Astro blog template without turning experiments into unmaintainable one-off code.

Stitch is optional. The source of truth after implementation is still this repository: Astro components, localized content data, and CSS tokens.

## When to Use This Workflow

Use this workflow when changing:

- Homepage layout or density
- Article page reading experience
- Archive, tag, project, or search pages
- Typography, color, spacing, or theme tokens
- Navigation, footer, table of contents, or other reusable UI patterns
- A new public section that should become part of the template

For small copy edits or one-off posts, use the normal content workflow instead.

## Design Inputs

Before generating or implementing a design, collect:

- Target page or flow, for example `home`, `article`, `archive`, `search`, or `about`
- Audience and reading mode, for example long-form writing, project notes, or reference lookup
- Required states: desktop, mobile, light theme, dark theme, empty state, long content
- Existing local constraints:
  - Astro static output
  - `/zh/` and `/en/` routes
  - no heavy frontend runtime
  - accessibility and keyboard support
  - `prefers-reduced-motion`
- Reference links or screenshots, with notes about what to borrow and what to avoid

## Optional Stitch Path

Use Stitch for exploration, not as a runtime dependency.

1. Configure Stitch MCP by following the official setup page:
   - https://stitch.withgoogle.com/docs/mcp/setup
2. Keep credentials and MCP environment variables outside committed files.
3. Use Stitch or Stitch Skills to explore 2-3 visual directions.
4. Export the useful design decisions into a local design note instead of copying generated code directly.

Useful Stitch Skills:

- `enhance-prompt`: turn rough UI ideas into a clearer design prompt
- `stitch-design`: generate or edit visual screens
- `design-md`: summarize a design system into reusable design rules
- `stitch-loop`: explore multi-page variants

Suggested prompt shape:

```text
Design the article reading page for a bilingual Astro personal blog template.
The page should feel calm, readable, static-first, and suitable for long technical writing.
Include desktop and mobile states, light and dark themes, a subtle table of contents,
code blocks, references, and a footer. Avoid marketing hero layouts and heavy cards.
```

## Repository-First Path

For most changes, design directly in the repository:

1. Identify the owning surface:
   - Layout shell: `src/layouts/BaseLayout.astro`
   - Article/project pages: `src/layouts/ContentLayout.astro`
   - Reusable controls: `src/components/*`
   - Visual tokens and prose styling: `src/styles/global.css`
   - UI copy: `src/i18n/messages/*`
2. Change reusable tokens before adding new component-specific styles.
3. Keep HTML semantic first, then add small JavaScript enhancements only when needed.
4. Validate both `/zh/` and `/en/` pages.

## Design Output

Every meaningful design change should produce:

- A short change summary in the pull request or commit message
- Updated CSS tokens or component styles
- Updated docs if the change creates a new reusable pattern
- Screenshots or manual notes for desktop and mobile if the change is visual

If Stitch was used, also keep a short summary of:

- Which references were used
- Which design direction was selected
- Which generated details were intentionally rejected

Do not commit private Stitch credentials, raw experimental dumps, or large temporary screenshots.

## Implementation Rules

- Keep cards at 8px radius or less unless the local design system changes.
- Do not put page sections inside decorative cards.
- Keep long-form reading clear before adding decoration.
- Prefer icons for compact controls and text labels for irreversible actions.
- Make UI usable without JavaScript where possible.
- Use `dialog` only when the no-JavaScript state remains readable.
- Keep theme changes token-driven and test Light, Dark, and System.
- Respect `prefers-reduced-motion`.
- Do not introduce React/Vue/Svelte islands for small interactions.

## Acceptance Checklist

Run:

```bash
npm run check
npm run build
```

Manually verify:

- Desktop and mobile layouts
- Light, Dark, and System theme modes
- Chinese and English routes
- Article page with table of contents
- Code block copy buttons
- Image zoom
- Search page
- Footer behavior on short pages
- No text overlap or clipped buttons

For production-facing changes, follow `docs/workflow.md` and deploy through GitHub Actions.
