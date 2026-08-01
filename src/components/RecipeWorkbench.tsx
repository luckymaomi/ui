import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import type { RecipeDefinition } from "@/content/types";

function buildClasses(recipe: RecipeDefinition, variant: string): string {
  return [
    ...recipe.skeleton.baseClasses,
    ...(recipe.variants[variant]?.classes ?? []),
    ...(recipe.states?.hover ?? []),
    ...(recipe.states?.focus ?? []),
    ...(recipe.states?.active ?? []),
  ].join(" ");
}

export function RecipeWorkbench({ recipes }: { recipes: Record<string, RecipeDefinition> }) {
  const ids = Object.keys(recipes);
  const [recipeId, setRecipeId] = useState(ids[0] ?? "");
  const recipe = recipes[recipeId];
  const variants = recipe ? Object.keys(recipe.variants) : [];
  const [variant, setVariant] = useState(variants[0] ?? "");
  const [copied, setCopied] = useState(false);

  const classes = useMemo(
    () => (recipe ? buildClasses(recipe, variant) : ""),
    [recipe, variant],
  );
  if (!recipe) return null;
  const Element = recipe.skeleton.element === "input" ? "input" : recipe.skeleton.element === "button" ? "button" : "div";

  function changeRecipe(next: string) {
    setRecipeId(next);
    setVariant(Object.keys(recipes[next]?.variants ?? {})[0] ?? "");
  }

  async function copy() {
    await navigator.clipboard.writeText(classes);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="recipe-workbench">
      <div className="recipe-controls">
        <label>
          <span>组件</span>
          <select value={recipeId} onChange={(event) => changeRecipe(event.target.value)}>
            {ids.map((id) => <option key={id} value={id}>{recipes[id]?.nameZh ?? id}</option>)}
          </select>
        </label>
        <label>
          <span>变体</span>
          <select value={variant} onChange={(event) => setVariant(event.target.value)}>
            {variants.map((id) => <option key={id} value={id}>{recipe.variants[id]?.labelZh ?? id}</option>)}
          </select>
        </label>
      </div>
      <div className="recipe-stage">
        <Element
          className={classes}
          {...(Element === "input"
            ? { placeholder: String(recipe.slots[0]?.default ?? "输入内容") }
            : {})}
        >
          {Element !== "input" ? String(recipe.slots.find((slot) => slot.default)?.default ?? recipe.nameZh) : null}
        </Element>
      </div>
      <div className="recipe-output">
        <code>{classes}</code>
        <button type="button" onClick={copy} title="复制 className">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? "已复制" : "复制"}</span>
        </button>
      </div>
    </div>
  );
}
