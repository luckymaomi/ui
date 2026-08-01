import type { StyleSummary } from "@/content/types";

export interface StyleFilters {
  query: string;
  category: string;
  type: string;
  scenario?: string;
}

export function filterStyles<T extends StyleSummary>(
  items: T[],
  filters: StyleFilters,
): T[] {
  const needle = filters.query.trim().toLocaleLowerCase("zh-CN");
  return items.filter((item) => {
    const matchesQuery =
      !needle ||
      [item.name, item.nameEn, item.description, ...item.keywords, ...item.tags]
        .join(" ")
        .toLocaleLowerCase("zh-CN")
        .includes(needle);
    return (
      matchesQuery &&
      (filters.category === "all" || item.category === filters.category) &&
      (filters.type === "all" || item.styleType === filters.type) &&
      (!filters.scenario ||
        filters.scenario === "all" ||
        item.scenarios.includes(filters.scenario))
    );
  });
}
