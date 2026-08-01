import {
  createElement,
  lazy,
  Suspense,
  type ComponentType,
  type ReactElement,
} from "react";

const modules = import.meta.glob("./pages/*/page.tsx");
const templateComponents = new Map<string, ReactElement>();
for (const [modulePath, importer] of Object.entries(modules)) {
  const id = modulePath.match(/pages\/([^/]+)\/page\.tsx$/)?.[1];
  if (!id) continue;
  const component = lazy(async () => {
    const module = (await importer()) as { default: ComponentType };
    return { default: module.default };
  });
  templateComponents.set(id, createElement(component));
}

export function TemplateLoader({ id }: { id: string }) {
  const template = templateComponents.get(id);
  if (!template) throw new Error(`没有找到模板实现：${id}`);
  return (
    <Suspense
      fallback={<div className="interactive-loading">正在载入完整模板...</div>}
    >
      {template}
    </Suspense>
  );
}
