import { describe, expect, it } from "vitest";
import { styles } from "@/content/catalog";
import { filterStyles } from "@/lib/search";

describe("风格发现", () => {
  it("用中文关键词和视觉类型返回匹配资料", () => {
    const bauhaus = filterStyles(styles, {
      query: "包豪斯",
      category: "all",
      type: "visual",
      scenario: "creative",
    });
    expect(bauhaus.some((style) => style.slug === "bauhaus")).toBe(true);

    const layouts = filterStyles(styles, {
      query: "仪表盘",
      category: "all",
      type: "layout",
      scenario: "dashboard",
    });
    expect(layouts.length).toBeGreaterThan(0);
    expect(layouts.every((style) => style.styleType === "layout")).toBe(true);
  });
});
