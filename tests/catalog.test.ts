import { describe, expect, it } from "vitest";
import {
  animations,
  componentPatterns,
  prompts,
  styles,
  templateSource,
  templates,
} from "@/content/catalog";

describe("生产内容目录", () => {
  it("提供完整且互相关联的生产内容", () => {
    expect(styles).toHaveLength(143);
    expect(animations).toHaveLength(57);
    expect(templates).toHaveLength(35);
    for (const style of styles) {
      expect(style.slug).toMatch(/^[a-z0-9-]+$/);
      expect(style.philosophy.length).toBeGreaterThan(80);
      expect(style.aiRules.length).toBeGreaterThan(80);
      expect(Object.keys(style.components).length).toBeGreaterThan(0);
      expect(style.recipe.styleSlug).toBe(style.slug);
    }
    expect(componentPatterns.length).toBeGreaterThan(20);
    expect(prompts.length).toBeGreaterThan(0);
    for (const template of templates) {
      expect(templateSource(template.id).length).toBeGreaterThan(500);
    }
  });
});
