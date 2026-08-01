"use client";

import { RotateCcw } from "lucide-react";
import { useState, useCallback, type ReactNode } from "react";

export function useReplay() {
  const [key, setKey] = useState(0);
  const replay = useCallback(() => setKey((k) => k + 1), []);
  return { key, replay };
}

interface ReplayButtonProps {
  onReplay: () => void;
}

export function ReplayButton({ onReplay }: ReplayButtonProps) {
  return (
    <button
      type="button"
      onClick={onReplay}
      className="animation-replay"
      aria-label="重新播放动效"
    >
      <RotateCcw aria-hidden="true" size={16} />
      <span>重新播放</span>
    </button>
  );
}

interface PreviewContainerProps {
  bg?: "dark" | "light" | "gradient";
  children: ReactNode;
}

export function PreviewContainer({ bg = "light", children }: PreviewContainerProps) {
  const bgClass =
    bg === "dark"
      ? "bg-zinc-900 text-white"
      : bg === "gradient"
        ? "bg-gradient-to-br from-violet-500/10 to-pink-500/10"
        : "bg-zinc-50 dark:bg-zinc-900";

  return (
    <div
      className={`relative w-full min-h-[200px] flex items-center justify-center p-8 rounded-[2rem] ${bgClass}`}
    >
      {children}
    </div>
  );
}
