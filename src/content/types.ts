export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";
export type StyleType = "visual" | "layout";

export interface StyleColors {
  primary: string;
  secondary: string;
  accent: string[];
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
}

export interface StyleData {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn?: string;
  cover: string;
  category: StyleCategory;
  styleType: StyleType;
  tags: string[];
  keywords: string[];
  compatibleWith?: string[];
  scenarios: string[];
  colors: StyleColors;
  philosophy: string;
  doList: string[];
  dontList: string[];
  components: Record<string, ComponentExample>;
  globalCss: string;
  aiRules: string;
  examplePrompts: Array<{
    title: string;
    description: string;
    prompt: string;
  }>;
  variants?: Array<{
    id: string;
    name: string;
    description: string;
    colors: StyleColors;
  }>;
  tokens: Record<string, unknown>;
  recipe: StyleRecipe;
}

export interface StyleSummary {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  cover: string;
  category: StyleCategory;
  styleType: StyleType;
  tags: string[];
  keywords: string[];
  scenarios: string[];
  colors: StyleColors;
}

export interface StyleRecipe {
  styleSlug: string;
  styleName: string;
  recipes: Record<string, RecipeDefinition>;
}

export interface RecipeDefinition {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  skeleton: {
    element: string;
    baseClasses: string[];
    structure?: string;
  };
  parameters: Array<Record<string, unknown>>;
  variants: Record<string, { id: string; labelZh: string; classes: string[] }>;
  slots: Array<Record<string, unknown>>;
  states?: Record<string, string[]>;
}

export interface AnimationMeta {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  category: string;
  tags: string[];
  trigger: string;
  difficulty: string;
  duration: string;
  keywords: string[];
  playgroundMode?: string;
}

export interface ShowcaseTypographyProfile {
  id: string;
  stylesheetUrl: string;
  displayStack: string;
  bodyStack: string;
  monoStack: string;
}

export interface ShowcaseTypographyItem {
  slug: string;
  profile: ShowcaseTypographyProfile | null;
}

export interface TemplateData {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  styleSlug: string;
  coverColors?: StyleColors;
  type: string;
}

export type ComponentPatternPreviewId = string;

export interface ComponentPattern {
  id: string;
  family: string;
  category: string;
  name: string;
  nameZh: string;
  summary: string;
  summaryZh: string;
  useCase: string;
  useCaseZh: string;
  tags: string[];
  tagsZh: string[];
  sourceStyleSlug: string;
  sourceHref: string;
  previewId: ComponentPatternPreviewId;
}

export interface PromptTopic {
  slug: string;
  titleZh: string;
  descriptionZh: string;
  introZh: string;
  relatedStyleSlugs: string[];
  prompts: Array<{
    titleZh: string;
    tool: string;
    promptEn: string;
    promptZh: string;
  }>;
  useCases: Array<{ titleZh: string; descriptionZh: string }>;
  faq: Array<{ questionZh: string; answerZh: string }>;
}

export interface StyleGuide {
  slug: string;
  name: string;
  description: string;
  history: string;
  philosophy: string;
  useCases: Array<{
    title: string;
    description: string;
    industry: string;
  }>;
  references: Array<{ title: string; url: string; type: string }>;
  influenced?: string[];
  influencedBy?: string[];
}
