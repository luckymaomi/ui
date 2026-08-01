import {
  createElement,
  lazy,
  Suspense,
  type ComponentType,
  type ReactElement,
} from "react";

const modules = import.meta.glob("./styles/*.tsx");
const showcases = new Map<string, ReactElement>();
for (const [modulePath, importer] of Object.entries(modules)) {
  const slug = modulePath.match(/\/([^/]+)\.tsx$/)?.[1];
  if (!slug) continue;
  const component = lazy(async () => {
    const module = (await importer()) as { default: ComponentType };
    return { default: module.default };
  });
  showcases.set(slug, createElement(component));
}

export function ShowcaseLoader({ slug }: { slug: string }) {
  const showcase = showcases.get(slug);
  if (!showcase) throw new Error(`没有找到风格展示：${slug}`);
  return (
    <Suspense
      fallback={<div className="showcase-loading">正在载入完整展示...</div>}
    >
      {showcase}
    </Suspense>
  );
}
