import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentPattern } from "@/content/types";
import { PatternPreview } from "@/components/patterns/PatternPreviews";
import { withBase } from "@/lib/base";

export function PatternExplorer({ items }: { items: ComponentPattern[] }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const families = Array.from(new Set(items.map((item) => item.family)));
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    return items.filter(
      (item) =>
        (family === "all" || item.family === family) &&
        (!needle || [item.nameZh, item.summaryZh, item.useCaseZh, ...item.tagsZh].join(" ").toLocaleLowerCase("zh-CN").includes(needle)),
    );
  }, [family, items, query]);

  return (
    <section className="pattern-workspace">
      <div className="catalog-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索组件样式..." />
        </label>
        <select value={family} onChange={(event) => setFamily(event.target.value)} aria-label="组件家族">
          <option value="all">全部家族</option>
          {families.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <p className="result-line">显示 {filtered.length} / {items.length} 个真实组件模式</p>
      <div className="pattern-grid">
        {filtered.map((pattern) => (
          <article className="pattern-item" key={pattern.id}>
            <div className="pattern-preview"><PatternPreview previewId={pattern.previewId} /></div>
            <div className="pattern-copy">
              <div className="meta-row"><span>{pattern.family}</span><span>{pattern.category}</span></div>
              <h2>{pattern.nameZh}</h2>
              <p>{pattern.summaryZh}</p>
              <dl><dt>适用场景</dt><dd>{pattern.useCaseZh}</dd></dl>
              <a href={withBase(`/styles/${pattern.sourceStyleSlug}/showcase/`)}>查看来源风格实现</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
