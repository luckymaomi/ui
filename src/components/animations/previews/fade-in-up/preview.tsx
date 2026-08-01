"use client";

import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

export function FadeInUpPreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="gradient">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 420ms cubic-bezier(0.2, 0.75, 0.25, 1) backwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
          }
        }
      `}</style>
      <ReplayButton onReplay={replay} />
      <div
        key={key}
        className="animate-fade-in-up w-full max-w-sm rounded-lg border border-border bg-background p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-foreground">
          通知
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          更改已保存，即将开始部署。
        </p>
      </div>
    </PreviewContainer>
  );
}
