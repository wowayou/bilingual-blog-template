# Design Workflow With Stitch

Stitch is not a runtime dependency of this Astro site. Treat it as an optional design exploration workflow.

## MCP Setup

Follow the official Stitch MCP setup page:

- https://stitch.withgoogle.com/docs/mcp/setup

Keep credentials and MCP environment variables outside committed files.

## Skills

The Stitch Skills repository documents plugin and skill setup:

- https://github.com/google-labs-code/stitch-skills

Useful skills for this project:

- `stitch-design` for generating and editing design screens
- `design-md` for turning design decisions into a reusable `DESIGN.md`
- `enhance-prompt` for refining vague UI prompts
- `stitch-loop` for exploring multi-page variants

## Suggested Use

1. Use Stitch to explore homepage, post detail, archive, and search variants.
2. Export or summarize the chosen direction into `.stitch/DESIGN.md`.
3. Implement the design with this repository's CSS tokens and Astro components.
4. Keep final behavior accessible, static-first, and compatible with `/zh/` and `/en/`.
