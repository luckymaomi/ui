import { Search, X } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import type { StyleSummary } from "@/content/types";
import { withBase } from "@/lib/base";
import { filterStyles } from "@/lib/search";
import { zh } from "@/content/i18n/zh";

const categories = [
  ["all", "全部"],
  ["modern", "现代"],
  ["minimal", "极简"],
  ["expressive", "表现力"],
  ["retro", "复古"],
] as const;

const catalogUrlEvent = "ui:catalog-url";

function subscribeToCatalogUrl(listener: () => void): () => void {
  window.addEventListener("popstate", listener);
  window.addEventListener(catalogUrlEvent, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(catalogUrlEvent, listener);
  };
}

function catalogUrlSnapshot(): string {
  return window.location.search;
}

function serverCatalogUrlSnapshot(): string {
  return "";
}

function updateCatalogUrl(key: string, value: string, defaultValue = ""): void {
  const url = new URL(window.location.href);
  if (value === defaultValue) url.searchParams.delete(key);
  else url.searchParams.set(key, value);
  window.history.replaceState({}, "", url);
  window.dispatchEvent(new Event(catalogUrlEvent));
}

export function StyleExplorer({ items }: { items: StyleSummary[] }) {
  const search = useSyncExternalStore(
    subscribeToCatalogUrl,
    catalogUrlSnapshot,
    serverCatalogUrlSnapshot,
  );
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const type = params.get("type") ?? "all";
  const scenario = params.get("scenario") ?? "all";

  const results = useMemo(() => {
    return filterStyles(items, { query, category, scenario, type });
  }, [category, items, query, scenario, type]);

  function clear() {
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, "", url);
    window.dispatchEvent(new Event(catalogUrlEvent));
  }

  return (
    <section className="catalog-workspace" aria-label="风格目录">
      <div className="catalog-toolbar">
        <label className="search-field">
          <Search aria-hidden="true" size={18} />
          <span className="sr-only">搜索风格</span>
          <input
            value={query}
            onChange={(event) => updateCatalogUrl("q", event.target.value)}
            placeholder="搜索名称、场景、关键词..."
          />
          {query ? (
            <button
              type="button"
              onClick={() => updateCatalogUrl("q", "")}
              aria-label="清空搜索"
              title="清空搜索"
            >
              <X aria-hidden="true" size={16} />
            </button>
          ) : null}
        </label>
        <div className="segmented" aria-label="风格类型">
          {[
            ["all", "全部类型"],
            ["visual", "视觉"],
            ["layout", "布局"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={type === value}
              onClick={() => updateCatalogUrl("type", value, "all")}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="scenario-select">
          <span className="sr-only">应用场景</span>
          <select
            value={scenario}
            onChange={(event) =>
              updateCatalogUrl("scenario", event.target.value, "all")
            }
          >
            {Object.entries(zh.scenarios).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="category-row" aria-label="风格分类">
        {categories.map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={category === value}
            onClick={() => updateCatalogUrl("category", value, "all")}
          >
            {label}
          </button>
        ))}
        <span className="result-count">
          {results.length} / {items.length}
        </span>
      </div>

      {results.length ? (
        <div className="style-grid">
          {results.map((style) => (
            <article className="style-card" key={style.slug}>
              <a
                href={withBase(`/styles/${style.slug}/`)}
                className="style-cover"
              >
                <img
                  src={withBase(style.cover)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="style-card-body">
                <div className="style-heading">
                  <div>
                    <h2>
                      <a href={withBase(`/styles/${style.slug}/`)}>
                        {style.name}
                      </a>
                    </h2>
                    <p>{style.nameEn}</p>
                  </div>
                  <span>{style.styleType === "layout" ? "布局" : "视觉"}</span>
                </div>
                <p className="style-description">{style.description}</p>
                <div className="palette" aria-label={`${style.name} 配色`}>
                  {[
                    style.colors.primary,
                    style.colors.secondary,
                    ...style.colors.accent.slice(0, 3),
                  ].map((color, index) => (
                    <i
                      key={`${color}-${index}`}
                      style={{ background: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="style-card-actions">
                  <a href={withBase(`/styles/${style.slug}/`)}>规则详情</a>
                  <a href={withBase(`/styles/${style.slug}/showcase/`)}>
                    真实展示
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>当前筛选没有匹配风格。</p>
          <button className="tool-button" type="button" onClick={clear}>
            清除筛选
          </button>
        </div>
      )}
    </section>
  );
}
