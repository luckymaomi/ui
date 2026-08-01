import animationsJson from "./data/animations.json";
import componentPatternsJson from "./data/component-patterns.json";
import guidesJson from "./data/guides.json";
import promptsJson from "./data/prompts.json";
import resourcesJson from "./data/resources.json";
import showcaseTypographyJson from "./data/showcase-typography.json";
import stylesJson from "./data/styles.json";
import templatesJson from "./data/templates.json";
import type {
  AnimationMeta,
  ComponentPattern,
  PromptTopic,
  StyleData,
  StyleGuide,
  ShowcaseTypographyItem,
  TemplateData,
  StyleSummary,
} from "./types";

export const styles = stylesJson as unknown as StyleData[];
export const styleSummaries: StyleSummary[] = styles.map((style) => ({
  slug: style.slug,
  name: style.name,
  nameEn: style.nameEn,
  description: style.description,
  cover: style.cover,
  category: style.category,
  styleType: style.styleType,
  tags: style.tags,
  keywords: style.keywords,
  scenarios: style.scenarios,
  colors: style.colors,
}));
export const animations = animationsJson.items as AnimationMeta[];
export const animationDefinitions = animationsJson.definitions;
export const animationVocabulary = animationsJson.vocabulary;
export const templates = templatesJson as TemplateData[];
export const componentPatterns = componentPatternsJson as ComponentPattern[];
export const prompts = promptsJson as PromptTopic[];
export const guides = guidesJson as unknown as Record<string, StyleGuide>;
export const resources = resourcesJson;
export const showcaseTypography =
  showcaseTypographyJson as ShowcaseTypographyItem[];

const templateSourceFiles = import.meta.glob(
  "../components/templates/pages/*/page.tsx",
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

const templateSources = new Map<string, string>();
for (const [filePath, source] of Object.entries(templateSourceFiles)) {
  const id = filePath.match(/\/pages\/([^/]+)\/page\.tsx$/)?.[1];
  if (id) templateSources.set(id, source);
}

export function templateSource(id: string): string {
  const source = templateSources.get(id);
  if (!source) throw new Error(`没有找到模板源代码：${id}`);
  return source;
}

export function styleBySlug(slug: string): StyleData | undefined {
  return styles.find((style) => style.slug === slug);
}
