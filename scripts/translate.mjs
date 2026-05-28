#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const type = args.type || "blog";
const from = args.from || "zh";
const to = args.to || "en";
const id = args.id;

if (!id) {
  fail("Missing --id. Example: npm run translate -- --type blog --from zh --to en --id site-plan");
}

if (!["blog", "projects"].includes(type)) {
  fail("--type must be blog or projects.");
}

const sourceDir = join(root, "src", "content", type, from);
const targetDir = join(root, "src", "content", type, to);
const sourceFile = findByContentId(sourceDir, id);

if (!sourceFile) {
  fail(`Cannot find ${type}/${from} entry with contentId "${id}".`);
}

const source = readFileSync(sourceFile, "utf8");
const parsed = parseFrontmatter(source);
const slug = parsed.data.slug || id;
const targetFile = join(targetDir, `${slug}.md`);

if (existsSync(targetFile)) {
  const existing = parseFrontmatter(readFileSync(targetFile, "utf8"));
  if (existing.data.translationStatus === "reviewed") {
    fail(`Refusing to overwrite reviewed translation: ${targetFile}`);
  }
}

const sourceHash = createHash("sha256").update(source).digest("hex").slice(0, 16);
const targetData = {
  ...parsed.data,
  title: `[Draft] ${parsed.data.title || id}`,
  description: parsed.data.description || "",
  draft: "true",
  locale: to,
  translationOf: parsed.data.contentId || id,
  translationStatus: "machine",
  sourceHash
};

mkdirSync(targetDir, { recursive: true });
writeFileSync(
  targetFile,
  `---\n${stringifyFrontmatter(targetData)}---\n\n> Machine translation draft. Review before publishing.\n\n${parsed.body.trim()}\n`,
  "utf8"
);

console.log(`Created translation draft: ${targetFile}`);

function parseArgs(values) {
  const result = {};
  const positional = [];
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value.startsWith("--")) {
      result[value.slice(2)] = values[index + 1];
      index += 1;
    } else {
      positional.push(value);
    }
  }
  if (positional.length >= 4) {
    result.type ??= positional[0];
    result.from ??= positional[1];
    result.to ??= positional[2];
    result.id ??= positional[3];
  }
  return result;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function findByContentId(dir, contentId) {
  if (!existsSync(dir)) {
    return undefined;
  }

  const candidates = [join(dir, `${contentId}.md`), join(dir, `${contentId}.mdx`)];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: markdown };
  }

  const data = {};
  const lines = match[1].split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const simple = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!simple) {
      continue;
    }

    const [, key, rawValue] = simple;
    if (rawValue === "") {
      const list = [];
      while (lines[index + 1]?.startsWith("  - ")) {
        index += 1;
        list.push(unquote(lines[index].replace(/^  - /, "")));
      }
      data[key] = list;
    } else {
      data[key] = unquote(rawValue);
    }
  }

  return { data, body: match[2] };
}

function stringifyFrontmatter(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((item) => `  - ${quote(item)}`).join("\n")}\n`;
      }
      return `${key}: ${quote(value)}\n`;
    })
    .join("");
}

function unquote(value) {
  const trimmed = String(value).trim();
  return trimmed.replace(/^["']|["']$/g, "");
}

function quote(value) {
  if (value === "true" || value === "false") {
    return value;
  }
  return `"${String(value).replaceAll('"', '\\"')}"`;
}
