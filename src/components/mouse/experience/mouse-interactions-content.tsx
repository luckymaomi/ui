"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ROOMS } from "./rooms/registry";
import { EditorialRoom } from "./rooms/editorial-room";
import { GenericRoom } from "./rooms/generic-room";
import { GlassmorphismRoom } from "./rooms/glassmorphism-room";
import { NeoBrutalistRoom } from "./rooms/neo-brutalist-room";

export type MouseExperienceLanguage = "en" | "zh";

const labels = {
  en: { title: "Mouse interactions", effects: "Interaction effects" },
  zh: { title: "鼠标交互", effects: "交互效果" },
} as const;

export function MouseInteractionsContent({ lang }: { lang: MouseExperienceLanguage }) {
  const [active, setActive] = useState(0);
  const room = ROOMS[active];
  const text = labels[lang];

  return (
    <div className="bg-background pb-16 text-foreground">
      <header className="py-10 md:py-14">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">{text.title}</h1>
      </header>

      <section aria-label={text.title}>
        <div className="mb-6 flex flex-wrap gap-2" aria-label="交互风格">
          {ROOMS.map((candidate, index) => {
            const selected = index === active;
            return (
              <button
                key={candidate.slug}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-white text-muted hover:text-foreground dark:bg-zinc-900",
                )}
                aria-pressed={selected}
              >
                <span className="font-mono text-xs opacity-60">{candidate.index}</span>
                <span>{candidate.name[lang]}</span>
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: candidate.accent }}
                />
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-lg">
          {room.slug === "neo-brutalist" ? <NeoBrutalistRoom /> : null}
          {room.slug === "glassmorphism" ? <GlassmorphismRoom /> : null}
          {room.slug === "editorial" ? <EditorialRoom /> : null}
          {room.Component === undefined && room.stage ? <GenericRoom config={room} /> : null}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <article className="rounded-lg bg-white p-6 dark:bg-zinc-900">
            <p className="font-mono text-xs text-muted">{room.index} · {room.name[lang]}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight">{room.tagline[lang]}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{room.note[lang]}</p>
          </article>
          <article className="rounded-lg bg-white p-6 dark:bg-zinc-900">
            <h2 className="text-sm font-semibold">{text.effects}</h2>
            <ul className="mt-4 grid gap-2">
              {room.effects[lang].map((effect) => (
                <li key={effect} className="rounded-lg bg-background px-4 py-3 text-sm">
                  {effect}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
