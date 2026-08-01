import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

function contentJson<T>(name: string): T {
  return JSON.parse(
    readFileSync(new URL(`../../src/content/data/${name}`, import.meta.url), "utf8"),
  ) as T;
}

const animationsJson = contentJson<{ items: Array<{ slug: string }> }>("animations.json");
const stylesJson = contentJson<Array<{ slug: string }>>("styles.json");
const templatesJson = contentJson<Array<{ id: string }>>("templates.json");

type RouteCheck = {
  path: string;
  islandSelector: string;
  contentKind: "animation" | "showcase" | "template";
};

const routeChecks: RouteCheck[] = [
  ...stylesJson.map((style) => ({
    path: `./styles/${style.slug}/showcase/`,
    islandSelector: "body > astro-island",
    contentKind: "showcase" as const,
  })),
  ...animationsJson.items.map((animation) => ({
    path: `./animations/${animation.slug}/`,
    islandSelector: ".animation-stage astro-island",
    contentKind: "animation" as const,
  })),
];

async function expectHydratedContent(page: Page, check: RouteCheck): Promise<void> {
  const response = await page.goto(check.path, {
    waitUntil: "domcontentloaded",
    timeout: 20_000,
  });
  expect(response?.status(), check.path).toBe(200);

  const island = page.locator(check.islandSelector);
  await expect(island, check.path).toBeAttached({ timeout: 10_000 });
  await expect.poll(
    () => island.evaluate((element) =>
      [...element.children].some((child) => child.tagName !== "TEMPLATE"),
    ),
    { message: `${check.path} 的 React island 未完成水合`, timeout: 10_000 },
  ).toBe(true);
  await expect(
    island.locator(".showcase-loading, .interactive-loading"),
    `${check.path} 一直停留在加载状态`,
  ).toHaveCount(0, { timeout: 20_000 });
  await expect.poll(
    () => island.evaluate((element) => {
      const hydratedChildren = [...element.children].filter(
        (child) => child.tagName !== "TEMPLATE",
      );
      return {
        hasHeight: hydratedChildren.some((child) => child.getBoundingClientRect().height > 80),
        hasElements: hydratedChildren.some((child) => child.querySelectorAll("*").length > 0),
      };
    }),
    { message: `${check.path} 没有真实可见内容`, timeout: 10_000 },
  ).toEqual({ hasHeight: true, hasElements: true });

  if (check.contentKind !== "animation") {
    await expect.poll(
      () => island.evaluate((element) => (element.textContent?.trim().length ?? 0) > 20),
      { message: `${check.path} 没有可读的真实内容`, timeout: 10_000 },
    ).toBe(true);
  }
}

test("全部展示和动效入口均完成真实水合", async ({ page, isMobile }) => {
  test.skip(isMobile, "风格展示和动效全量入口由桌面浏览器执行。");
  test.setTimeout(360_000);

  const runtimeErrors: string[] = [];
  const localResponseErrors: string[] = [];
  let currentPath = "";
  page.on("pageerror", (error) => runtimeErrors.push(`${currentPath}: ${error.message}`));
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (
      url.origin === "http://127.0.0.1:4573" &&
      response.status() >= 400
    ) {
      localResponseErrors.push(`${currentPath}: ${response.status()} ${url.pathname}`);
    }
  });

  expect(routeChecks).toHaveLength(200);
  for (const check of routeChecks) {
    currentPath = check.path;
    await expectHydratedContent(page, check);
  }

  expect(runtimeErrors, "全量入口存在浏览器运行时异常").toEqual([]);
  expect(localResponseErrors, "全量入口存在本地资源请求失败").toEqual([]);
});

test("全部模板在当前视口完成真实水合且页面不横向溢出", async ({ page }) => {
  test.setTimeout(360_000);

  const runtimeErrors: string[] = [];
  const localResponseErrors: string[] = [];
  let currentPath = "";
  page.on("pageerror", (error) => runtimeErrors.push(`${currentPath}: ${error.message}`));
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (url.origin === "http://127.0.0.1:4573" && response.status() >= 400) {
      localResponseErrors.push(`${currentPath}: ${response.status()} ${url.pathname}`);
    }
  });

  expect(templatesJson).toHaveLength(35);
  for (const template of templatesJson) {
    currentPath = `./templates/${template.id}/preview/`;
    await expectHydratedContent(page, {
      path: currentPath,
      islandSelector: "body > astro-island",
      contentKind: "template",
    });
    await expect.poll(
      () => page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        window.scrollTo({ left: viewportWidth, top: window.scrollY, behavior: "instant" });
        return {
          document: document.documentElement.scrollWidth - viewportWidth,
          scrollX: window.scrollX,
          overflowingContent: [...document.body.querySelectorAll("*")].flatMap((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            if (
              rect.width <= 0
              || rect.height <= 0
              || style.position === "absolute"
              || style.position === "fixed"
              || rect.left >= -1 && rect.right <= viewportWidth + 1
            ) return [];

            for (
              let parent = element.parentElement;
              parent && parent !== document.body;
              parent = parent.parentElement
            ) {
              const overflow = getComputedStyle(parent).overflowX;
              if (overflow === "hidden" || overflow === "clip") return [];
            }
            return [`${element.tagName.toLowerCase()}.${String(element.className).slice(0, 80)}`];
          }),
        };
      }),
      { message: `${currentPath} 产生页面横向溢出`, timeout: 10_000 },
    ).toEqual({ document: 0, scrollX: 0, overflowingContent: [] });
  }

  expect(runtimeErrors, "模板入口存在浏览器运行时异常").toEqual([]);
  expect(localResponseErrors, "模板入口存在本地资源请求失败").toEqual([]);
});
