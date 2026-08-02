import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse, serialize } from "parse5";

const base = "/ui/";
const runtimeKinds = [
  {
    loader: /^ShowcaseLoader\..+\.js$/,
    entry: /"\.\/styles\/([^"]+)\.tsx":\(\)=>.*?import\(`\.\/([^`]+\.js)`\)/g,
    html: (id) => path.join("styles", id, "showcase", "index.html"),
  },
  {
    loader: /^AnimationLoader\..+\.js$/,
    entry: /"\.\/previews\/([^"]+)\/preview\.tsx":\(\)=>.*?import\(`\.\/([^`]+\.js)`\)/g,
    html: (id) => path.join("animations", id, "index.html"),
  },
  {
    loader: /^TemplateLoader\..+\.js$/,
    entry: /"\.\/pages\/([^"]+)\/page\.tsx":\(\)=>.*?import\(`\.\/([^`]+\.js)`\)/g,
    html: (id) => path.join("templates", id, "preview", "index.html"),
  },
];

function findElement(node, tagName) {
  if (node.tagName === tagName) return node;
  for (const child of node.childNodes ?? []) {
    const match = findElement(child, tagName);
    if (match) return match;
  }
  return null;
}

function modulePreloadNode(href, parentNode) {
  return {
    nodeName: "link",
    tagName: "link",
    attrs: [
      { name: "rel", value: "modulepreload" },
      { name: "href", value: href },
    ],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    childNodes: [],
    parentNode,
  };
}

async function injectRuntimeModulePreloads(outputDirectory) {
  const assetsDirectory = path.join(outputDirectory, "_astro");
  const assetNames = await readdir(assetsDirectory);
  let injected = 0;

  for (const kind of runtimeKinds) {
    const loaderName = assetNames.find((name) => kind.loader.test(name));
    if (!loaderName) throw new Error(`未找到运行时 Loader：${kind.loader}`);
    const loaderSource = await readFile(path.join(assetsDirectory, loaderName), "utf8");

    for (const match of loaderSource.matchAll(kind.entry)) {
      const [, id, chunkName] = match;
      const htmlPath = path.join(outputDirectory, kind.html(id));
      const source = await readFile(htmlPath, "utf8");
      const document = parse(source);
      const head = findElement(document, "head");
      if (!head) throw new Error(`运行页缺少 head：${htmlPath}`);

      const href = `${base}_astro/${chunkName}`;
      head.childNodes.push(modulePreloadNode(href, head));
      await writeFile(htmlPath, serialize(document));
      injected += 1;
    }
  }

  if (injected !== 235) {
    throw new Error(`运行时 modulepreload 数量异常：${injected}，预期 235`);
  }
  console.log(`已为 ${injected} 个独立运行页注入当前实现 modulepreload。`);
}

export function runtimeModulePreload() {
  return {
    name: "runtime-module-preload",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        await injectRuntimeModulePreloads(fileURLToPath(dir));
      },
    },
  };
}
