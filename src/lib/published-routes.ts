import { animations, guides, prompts, styles, templates } from "@/content/catalog";

const staticRoutes = [
  "/",
  "/styles/",
  "/animations/",
  "/animations/vocabulary/",
  "/recipes/",
  "/templates/",
  "/resources/",
  "/component-patterns/",
  "/guide/",
  "/guides/",
  "/mouse-interactions/",
  "/ui-prompts/",
  "/colors/",
  "/gradients/",
  "/shadows/",
  "/backgrounds/",
  "/typography/",
  "/type-scale/",
  "/spacing/",
  "/design-principles/",
  "/visual-hierarchy/",
] as const;

export const publishedRoutes = [
  ...staticRoutes,
  ...styles.flatMap((style) => [
    `/styles/${style.slug}/`,
    `/styles/${style.slug}/showcase/`,
    `/recipes/${style.slug}/`,
  ]),
  ...animations.map((animation) => `/animations/${animation.slug}/`),
  ...templates.flatMap((template) => [
    `/templates/${template.id}/`,
    `/templates/${template.id}/preview/`,
  ]),
  ...prompts.map((prompt) => `/ui-prompts/${prompt.slug}/`),
  ...Object.values(guides).map((guide) => `/guides/${guide.slug}/`),
] as const;
