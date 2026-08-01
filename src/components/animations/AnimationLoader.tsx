import { createElement, lazy, Suspense, type ComponentType, type ReactElement } from "react";

const modules = import.meta.glob("./previews/*/preview.tsx");
const previews = new Map<string, ReactElement>();
for (const [modulePath, importer] of Object.entries(modules)) {
  const slug = modulePath.match(/previews\/([^/]+)\/preview\.tsx$/)?.[1];
  if (!slug) continue;
  const component = lazy(async () => {
    const module = (await importer()) as Record<string, unknown>;
    const preview = Object.entries(module).find(
      ([name, value]) => name.endsWith("Preview") && typeof value === "function",
    )?.[1] as ComponentType | undefined;
    if (!preview) throw new Error(`动效 ${slug} 没有可渲染 Preview 导出`);
    return { default: preview };
  });
  previews.set(slug, createElement(component));
}

export function AnimationLoader({ slug }: { slug: string }) {
  const preview = previews.get(slug);
  if (!preview) throw new Error(`没有找到动效预览：${slug}`);
  return (
    <Suspense fallback={<div className="interactive-loading">正在载入动效...</div>}>
      {preview}
    </Suspense>
  );
}
