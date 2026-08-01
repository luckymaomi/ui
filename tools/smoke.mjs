import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));

async function publishedHtmlFiles(directory = dist) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await publishedHtmlFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolute);
  }
  return files;
}

async function auditPublishedLinks() {
  const htmlFiles = await publishedHtmlFiles();
  const checkedTargets = new Set();
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = match[1];
      if (value.startsWith("/") && !value.startsWith("/ui/")) {
        throw new Error(`${path.relative(dist, file)} 使用了生产基路径之外的链接：${value}`);
      }
      if (!value.startsWith("/ui/")) continue;
      const pathname = new URL(value, "http://static.audit").pathname;
      const relative = decodeURIComponent(pathname.slice("/ui/".length));
      let target = path.resolve(dist, relative);
      if (path.relative(dist, target).startsWith("..")) {
        throw new Error(`${path.relative(dist, file)} 的链接越出构建目录：${value}`);
      }
      if (checkedTargets.has(target)) continue;
      try {
        if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
        await stat(target);
      } catch {
        throw new Error(`${path.relative(dist, file)} 的站内链接没有发布目标：${value}`);
      }
      checkedTargets.add(target);
    }
  }
  return { html: htmlFiles.length, targets: checkedTargets.size };
}

async function availablePort() {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, host, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

async function waitFor(url, process) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (process.exitCode !== null) throw new Error(`预览进程提前退出：${process.exitCode}`);
    try {
      const response = await fetch(url);
      if (response.ok) {
        await response.arrayBuffer();
        return;
      }
    } catch (error) {
      if (!(error instanceof TypeError)) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  throw new Error(`预览服务未在期限内启动：${url}`);
}

const paths = [
  "/ui/",
  "/ui/styles/",
  "/ui/styles/bauhaus/",
  "/ui/styles/bauhaus/showcase/",
  "/ui/animations/hover-lift/",
  "/ui/recipes/bauhaus/",
  "/ui/templates/glass-landing/",
  "/ui/templates/glass-landing/preview/",
  "/ui/component-patterns/",
  "/ui/colors/",
  "/ui/ui-prompts/",
  "/ui/guide/",
];

const port = await availablePort();
const origin = `http://${host}:${port}`;
const python = process.platform === "win32" ? "python" : "python3";
const publishedLinks = await auditPublishedLinks();
const preview = spawn(
  python,
  ["start.py", "--no-build", "--no-open", "--port", String(port)],
  { cwd: new URL("..", import.meta.url), stdio: ["ignore", "pipe", "pipe"] },
);
let stderr = "";
preview.stderr.on("data", (chunk) => { stderr += chunk; });

try {
  await waitFor(`${origin}/ui/`, preview);
  for (const path of paths) {
    const response = await fetch(`${origin}${path}`, { redirect: "manual" });
    const body = await response.text();
    if (response.status !== 200 || !body.includes("<!DOCTYPE html>") && !body.includes("<!doctype html>")) {
      throw new Error(`${path} 返回 ${response.status}，且不是完整 HTML。`);
    }
  }
  const publishedFiles = [
    ["/ui/robots.txt", "User-agent: *"],
    ["/ui/llms.txt", "# UI"],
    ["/ui/sitemap.xml", "<urlset"],
  ];
  for (const [path, marker] of publishedFiles) {
    const response = await fetch(`${origin}${path}`);
    const body = await response.text();
    if (response.status !== 200 || !body.includes(marker)) {
      throw new Error(`${path} 没有发布可解析内容。`);
    }
  }
  const root = await fetch(`${origin}/`, { redirect: "manual" });
  await root.arrayBuffer();
  if (root.status !== 302 || root.headers.get("location") !== "/ui/") {
    throw new Error("根路径没有明确跳转到 /ui/。 ");
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
  console.log(JSON.stringify({ status: "ok", paths: paths.length, publishedFiles: publishedFiles.length, publishedLinks, origin }));
} finally {
  preview.kill("SIGTERM");
  await new Promise((resolve) => preview.once("exit", resolve));
  if (stderr) process.stderr.write(stderr);
}
