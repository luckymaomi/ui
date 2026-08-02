import { expect, test } from "@playwright/test";

test("风格搜索、筛选和深层详情可用", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await expect(page.locator('astro-island[component-export="StyleExplorer"]')).toHaveCount(0);
  const search = page.getByPlaceholder("搜索名称、场景、关键词...");
  await expect(search).toBeVisible();
  await search.fill("包豪斯");
  await expect(page).toHaveURL(/q=%E5%8C%85%E8%B1%AA%E6%96%AF/);
  await expect(page.getByText("1 / 143", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "包豪斯风格" })).toBeVisible();
  await page.getByRole("link", { name: "规则详情" }).click();
  await expect(page.getByRole("heading", { name: "设计理念" })).toBeVisible();
  await expect(page.getByText("应该这样做")).toBeVisible();
});

test("主题偏好产生可观察状态并可恢复", async ({ page }) => {
  await page.goto("./styles/");
  const initial = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /切换到/ }).click();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme",
    initial ?? "",
  );
  await page.reload();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme",
    initial ?? "",
  );
});

test("真实风格展示加载并产生交互状态变化", async ({ page }) => {
  await page.goto("./styles/bauhaus/showcase/");
  await expect(
    page.getByText("BAUHAUS", { exact: false }).first(),
  ).toBeVisible();
  const cardsTab = page.getByRole("button", { name: /Cards/i }).first();
  await cardsTab.click();
  await expect(page.getByText(/Card/i).nth(1)).toBeVisible();
});

test("真实动效和完整模板能在生产静态站运行", async ({ page, isMobile }) => {
  await page.goto("./animations/hover-lift/");
  const card = page.getByText("Design", { exact: true }).locator("..");
  await expect(card).toBeVisible();
  if (isMobile) {
    await expect(card).toContainText("Create beautiful interfaces");
  } else {
    await card.hover();
    await expect(card).not.toHaveCSS("translate", "none");
  }

  await page.goto("./templates/glass-landing/");
  await expect(
    page.getByRole("heading", { name: "玻璃拟态落地页" }),
  ).toBeVisible();
  const templateFrame = page.locator(".template-viewport iframe");
  await expect(templateFrame).toBeVisible();
  await expect(page.locator('astro-island[component-export="TemplateCanvas"]')).toHaveCount(0);
  await page.getByRole("button", { name: "移动画布" }).click();
  await expect(page.locator(".template-viewport")).toHaveAttribute("data-size", "mobile");
  await expect(
    page.frameLocator(".template-viewport iframe").getByRole("button").first(),
  ).toBeVisible();
});

test("复制与下载把当前静态内容交给浏览器", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./styles/bauhaus/");
  const copyIsland = page.locator("#ai-implementation astro-island");
  await copyIsland.scrollIntoViewIfNeeded();
  await expect.poll(() => copyIsland.evaluate((island) => !island.hasAttribute("ssr"))).toBe(true);
  await page.getByRole("button", { name: "复制实现规则" }).click();
  await expect(
    page.getByRole("button", { name: "已复制" }).first(),
  ).toBeVisible();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).length,
  ).toBeGreaterThan(20);

  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "下载" }).first().click();
  expect((await download).suggestedFilename()).toContain("bauhaus");
});

test("组件模式、鼠标交互和移动布局提供真实内容", async ({ page, isMobile }) => {
  await page.goto("./component-patterns/", { waitUntil: "domcontentloaded" });
  await expect(page.locator('astro-island[component-export="PatternExplorer"]')).toHaveCount(0);
  await expect(page.getByText(/个真实组件模式/)).toBeVisible();
  const patternCount = page.locator("[data-pattern-count]");
  const initialCount = await patternCount.textContent();
  await page.getByPlaceholder("搜索组件样式...").fill("按钮");
  await expect(patternCount).not.toHaveText(initialCount ?? "");
  await expect(page.locator(".pattern-item:not([hidden]) .pattern-preview").first()).toBeVisible();
  await page.goto("./mouse-interactions/");
  await expect(page.getByRole("heading", { name: "鼠标交互" })).toBeVisible();
  await expect(page.getByRole("button", { name: /新野兽派/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  if (isMobile) {
    await expect(page.locator("body")).toHaveJSProperty(
      "scrollWidth",
      await page.locator("body").evaluate((body) => body.clientWidth),
    );
  }
});

test("第三方字体失败时独立展示仍立即可读", async ({ page }) => {
  await page.route("https://fonts.loli.net/**", (route) => route.abort());
  await page.goto("./styles/bauhaus/showcase/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("BAUHAUS", { exact: false }).first()).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("font-family", "");
});

test("逐帧展示限制初始请求且静止排版不持续调度帧", async ({ page }) => {
  const frameRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/launch-keynote/frames/")) frameRequests.push(request.url());
  });
  await page.goto("./styles/launch-keynote/showcase/");
  await expect(page.locator("h1").filter({ hasText: "Vertex Pro" })).toBeVisible();
  await page.waitForTimeout(750);
  expect(frameRequests.length).toBeLessThanOrEqual(12);

  await page.addInitScript(() => {
    const original = window.requestAnimationFrame.bind(window);
    Object.defineProperty(window, "__uiRafCount", { value: 0, writable: true });
    window.requestAnimationFrame = (callback) =>
      original((time) => {
        (window as typeof window & { __uiRafCount: number }).__uiRafCount += 1;
        callback(time);
      });
  });
  await page.goto("./styles/kinetic-typography/showcase/");
  await expect(page.getByText("WORDS", { exact: true }).first()).toBeVisible();
  await page.waitForTimeout(500);
  const before = await page.evaluate(
    () => (window as typeof window & { __uiRafCount: number }).__uiRafCount,
  );
  await page.waitForTimeout(750);
  const after = await page.evaluate(
    () => (window as typeof window & { __uiRafCount: number }).__uiRafCount,
  );
  expect(after - before).toBeLessThanOrEqual(2);
});
