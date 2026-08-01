import { expect, test } from "@playwright/test";

test("风格搜索、筛选和深层详情可用", async ({ page }) => {
  await page.goto("./");
  await expect(
    page.locator('astro-island[component-export="StyleExplorer"]:not([ssr])'),
  ).toBeAttached();
  const search = page.getByPlaceholder("搜索名称、场景、关键词...");
  await expect(search).toBeVisible();
  await search.fill("包豪斯");
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
  await page.goto("./component-patterns/");
  await expect(page.getByText(/个真实组件模式/)).toBeVisible();
  await expect(page.locator(".pattern-preview").first()).toBeVisible();
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
