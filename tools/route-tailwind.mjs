import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compile, optimize } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";

const root = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.resolve(root, "public/_route-css");
const styles = JSON.parse(
  await readFile(path.join(root, "src/content/data/styles.json"), "utf8"),
);

const sharedEntries = [
  {
    kind: "workspace",
    id: "patterns",
    sources: [
      "src/components/PatternExplorer.astro",
      "src/components/patterns/PatternPreviews.tsx",
    ],
  },
  {
    kind: "workspace",
    id: "mouse",
    sources: [
      "src/components/mouse/**/*.{ts,tsx}",
      "src/components/pointer-interactions/**/*.{ts,tsx}",
    ],
  },
];

function entries() {
  const showcaseEntries = styles.map((style) => ({
    kind: "showcase",
    id: style.slug,
    sources: [
      `src/components/showcases/styles/${style.slug}.tsx`,
      "src/components/showcases/*.tsx",
      "src/components/pointer-interactions/**/*.tsx",
      "src/components/StaticImage.tsx",
    ],
  }));
  const recipeEntries = styles.map((style) => ({
    kind: "recipe",
    id: style.slug,
    sources: ["src/components/RecipeWorkbench.tsx"],
    content: JSON.stringify(style.recipe?.recipes ?? {}),
  }));

  const templateIds = new Scanner({
    sources: [
      {
        base: root,
        pattern: "src/components/templates/pages/*/page.tsx",
        negated: false,
      },
    ],
  }).files.map((file) => path.basename(path.dirname(file)));
  const templateEntries = templateIds.map((id) => ({
    kind: "template",
    id,
    sources: [
      `src/components/templates/pages/${id}/**/*.{ts,tsx}`,
      "src/components/templates/support/**/*.{ts,tsx}",
      "src/components/templates/*Shim.ts",
      "src/components/StaticImage.tsx",
    ],
  }));

  const animationIds = new Scanner({
    sources: [
      {
        base: root,
        pattern: "src/components/animations/previews/*/preview.tsx",
        negated: false,
      },
    ],
  }).files.map((file) => path.basename(path.dirname(file)));
  const animationEntries = animationIds.map((id) => ({
    kind: "animation",
    id,
    sources: [
      `src/components/animations/previews/${id}/**/*.{ts,tsx}`,
      "src/components/animations/previews/previews/**/*.{ts,tsx}",
      "src/components/animations/previews/anime-utils.ts",
    ],
  }));

  return [
    ...showcaseEntries,
    ...recipeEntries,
    ...templateEntries,
    ...animationEntries,
    ...sharedEntries,
  ];
}

function candidatesFor(entry) {
  const scanner = new Scanner({
    sources: entry.sources.map((pattern) => ({
      base: root,
      pattern,
      negated: false,
    })),
  });
  const candidates = new Set(scanner.scan());
  if (entry.content) {
    for (const candidate of scanner.scanFiles([
      { content: entry.content, extension: "json" },
    ])) {
      candidates.add(candidate);
    }
  }
  return [...candidates].sort();
}

async function buildCss(candidates) {
  const compiler = await compile(
    [
      "@layer theme, base, components, utilities;",
      '@import "tailwindcss/theme.css" layer(theme) theme(reference);',
      '@import "tailwindcss/utilities.css" layer(utilities) source(none);',
    ].join("\n"),
    { base: root, onDependency() {} },
  );
  return optimize(compiler.build(candidates), { minify: true }).code;
}

async function main() {
  const expectedRoot = `${path.resolve(root)}${path.sep}`;
  if (!outputRoot.startsWith(expectedRoot) || path.basename(outputRoot) !== "_route-css") {
    throw new Error(`拒绝清理非预期生成目录：${outputRoot}`);
  }
  await rm(outputRoot, { recursive: true, force: true });

  let totalBytes = 0;
  const routeEntries = entries();
  for (const entry of routeEntries) {
    const candidates = candidatesFor(entry);
    if (!candidates.length) {
      throw new Error(`路由 Tailwind 入口没有候选：${entry.kind}/${entry.id}`);
    }
    const css = await buildCss(candidates);
    const directory = path.join(outputRoot, entry.kind);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, `${entry.id}.css`), css);
    totalBytes += Buffer.byteLength(css);
  }

  console.log(
    `已生成 ${routeEntries.length} 个路由 CSS，合计 ${totalBytes.toLocaleString("en-US")} 字节。`,
  );
}

await main();
