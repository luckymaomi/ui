import type { APIRoute } from "astro";
import { withBase } from "@/lib/base";
import { publishedRoutes } from "@/lib/published-routes";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("生成 sitemap 需要 astro.config.mjs 中的 site 配置");
  const urls = publishedRoutes.map((route) => {
    const location = new URL(withBase(route), site);
    return `  <url><loc>${escapeXml(location.href)}</loc></url>`;
  });
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
