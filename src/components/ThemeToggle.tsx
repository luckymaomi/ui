import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(listener: () => void): () => void {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, currentTheme, () => "light");

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("ui-theme", next);
  }

  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
      title={theme === "dark" ? "浅色主题" : "深色主题"}
    >
      <Icon aria-hidden="true" size={18} />
    </button>
  );
}
