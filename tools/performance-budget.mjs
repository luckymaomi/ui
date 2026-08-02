import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { parse } from "parse5";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
const base = "/ui/";
const limits = {
  homeHtml: 180_000,
  mainCssGzip: 25_000,
  cssChunkGzip: 60_000,
};

function filesUnder(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function elements(node, tagName, result = []) {
  if (node.tagName === tagName) result.push(node);
  for (const child of node.childNodes ?? []) elements(child, tagName, result);
  return result;
}

function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value ?? "";
}

function htmlDocument(file) {
  const source = readFileSync(file, "utf8");
  return { source, document: parse(source) };
}

function localPublishedFile(urlValue) {
  const pathname = new URL(urlValue, "https://published.invalid").pathname;
  if (!pathname.startsWith(base)) return null;
  const relative = decodeURIComponent(pathname.slice(base.length));
  const target = path.resolve(dist, relative);
  if (path.relative(dist, target).startsWith("..")) {
    throw new Error(`发布资源越出 dist：${urlValue}`);
  }
  return target;
}

function stylesheetLinks(document) {
  return elements(document, "link")
    .filter((node) => attribute(node, "rel").split(/\s+/).includes("stylesheet"))
    .map((node) => attribute(node, "href"))
    .filter(Boolean);
}

function linksWithRel(document, rel) {
  return elements(document, "link")
    .filter((node) => attribute(node, "rel").split(/\s+/).includes(rel))
    .map((node) => attribute(node, "href"))
    .filter(Boolean);
}

function gzipBytes(file) {
  return gzipSync(readFileSync(file), { level: 9 }).length;
}

if (!existsSync(path.join(dist, "index.html"))) {
  throw new Error("dist/index.html 不存在，请先运行 npm run build。");
}

const failures = [];
const homePath = path.join(dist, "index.html");
const home = htmlDocument(homePath);
const homeBytes = Buffer.byteLength(home.source);
if (homeBytes > limits.homeHtml) {
  failures.push(`首页 HTML ${homeBytes} B，预算 ${limits.homeHtml} B`);
}

const mainCss = stylesheetLinks(home.document)
  .map(localPublishedFile)
  .filter((file) => file && existsSync(file) && statSync(file).isFile());
const mainCssGzip = mainCss.reduce((sum, file) => sum + gzipBytes(file), 0);
if (mainCssGzip > limits.mainCssGzip) {
  failures.push(`首页阻塞 CSS gzip ${mainCssGzip} B，预算 ${limits.mainCssGzip} B`);
}

const cssRoots = ["_astro", "_route-css"]
  .map((directory) => path.join(dist, directory))
  .filter(existsSync);
const cssFiles = cssRoots.flatMap((directory) =>
  filesUnder(directory).filter((file) => path.extname(file) === ".css"),
);
const cssChunks = cssFiles.map((file) => ({
  file: path.relative(dist, file).replaceAll("\\", "/"),
  raw: statSync(file).size,
  gzip: gzipBytes(file),
}));
const oversizedCss = cssChunks.filter((item) => item.gzip > limits.cssChunkGzip);
if (oversizedCss.length) {
  failures.push(
    `${oversizedCss.length} 个 CSS 分片超过 ${limits.cssChunkGzip} B gzip，最大为 ${oversizedCss
      .sort((left, right) => right.gzip - left.gzip)[0].file} ${oversizedCss[0].gzip} B`,
  );
}

const showcaseHtml = filesUnder(path.join(dist, "styles")).filter((file) =>
  file.replaceAll("\\", "/").endsWith("/showcase/index.html"),
);
const blockingExternalStyles = [];
for (const file of showcaseHtml) {
  const { document } = htmlDocument(file);
  for (const href of stylesheetLinks(document)) {
    if (/^https?:\/\//.test(href)) {
      blockingExternalStyles.push({
        page: path.relative(dist, file).replaceAll("\\", "/"),
        href,
      });
    }
  }
}
if (blockingExternalStyles.length) {
  failures.push(`${blockingExternalStyles.length} 个独立展示仍有同步第三方 stylesheet`);
}

const runtimeHtml = [
  ...showcaseHtml,
  ...filesUnder(path.join(dist, "animations")).filter((file) => {
    const relative = path.relative(dist, file).replaceAll("\\", "/");
    return /^animations\/[^/]+\/index\.html$/.test(relative) &&
      relative !== "animations/vocabulary/index.html";
  }),
  ...filesUnder(path.join(dist, "templates")).filter((file) =>
    file.replaceAll("\\", "/").endsWith("/preview/index.html"),
  ),
];
const runtimePreloads = [];
for (const file of runtimeHtml) {
  const { document } = htmlDocument(file);
  const preloads = linksWithRel(document, "modulepreload");
  if (preloads.length !== 1) continue;
  const target = localPublishedFile(preloads[0]);
  if (target && existsSync(target)) runtimePreloads.push(preloads[0]);
}
if (runtimePreloads.length !== runtimeHtml.length) {
  failures.push(
    `${runtimeHtml.length - runtimePreloads.length} 个独立运行页缺少唯一且有效的当前实现 modulepreload`,
  );
}

const report = {
  status: failures.length ? "failed" : "ok",
  budgets: limits,
  actual: {
    pages: filesUnder(dist).filter((file) => path.extname(file) === ".html").length,
    homeHtml: homeBytes,
    mainCssGzip,
    cssChunks: cssChunks.length,
    largestCssGzip: Math.max(0, ...cssChunks.map((item) => item.gzip)),
    blockingExternalStyles: blockingExternalStyles.length,
    runtimePreloads: runtimePreloads.length,
  },
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) {
  for (const failure of failures) console.error(`性能预算失败：${failure}`);
  process.exitCode = 1;
}
