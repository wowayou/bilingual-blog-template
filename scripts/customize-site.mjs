import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const args = process.argv.slice(2);
const configPath = args.find((arg) => !arg.startsWith("-")) ?? "site.customize.json";

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: npm run customize -- [site.customize.json]

Creates a private-site identity by applying localized site profile values.
Copy site.customize.example.json to site.customize.json, edit it, then run this command.
`);
  process.exit(0);
}

function mergeProfile(current, next) {
  if (!next || typeof next !== "object") return current;

  return {
    ...current,
    ...Object.fromEntries(Object.entries(next).filter(([, value]) => value !== undefined))
  };
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function writeJson(file, data) {
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

const absoluteConfigPath = path.resolve(root, configPath);
const config = await readJson(absoluteConfigPath);
const locales = ["zh", "en"];

for (const locale of locales) {
  if (!config[locale]) continue;

  const profilePath = path.join(root, "src", "content", "site", `${locale}.json`);
  const current = await readJson(profilePath);
  await writeJson(profilePath, mergeProfile(current, config[locale]));
  console.log(`Updated ${path.relative(root, profilePath)}`);
}

if (config.manifest) {
  const manifestPath = path.join(root, "public", "site.webmanifest");
  const currentManifest = await readJson(manifestPath);
  await writeJson(manifestPath, mergeProfile(currentManifest, config.manifest));
  console.log(`Updated ${path.relative(root, manifestPath)}`);
}
