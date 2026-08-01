import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

type CanvasSize = "desktop" | "tablet" | "mobile";

const canvasModes = [
  { id: "desktop", label: "桌面画布", icon: Monitor },
  { id: "tablet", label: "平板画布", icon: Tablet },
  { id: "mobile", label: "移动画布", icon: Smartphone },
] as const;

export function TemplateCanvas({ src, title }: { src: string; title: string }) {
  const [size, setSize] = useState<CanvasSize>("desktop");

  return (
    <section className="template-canvas" aria-label={`${title}交互画布`}>
      <div className="template-canvas-toolbar">
        <div className="canvas-segmented" aria-label="预览画布尺寸">
          {canvasModes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-label={label}
              aria-pressed={size === id}
              title={label}
              onClick={() => setSize(id)}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{label.replace("画布", "")}</span>
            </button>
          ))}
        </div>
        <a className="canvas-open" href={src} target="_blank" rel="noreferrer">
          <ExternalLink aria-hidden="true" size={17} />
          独立打开
        </a>
      </div>
      <div className="template-viewport" data-size={size}>
        <iframe src={src} title={`${title}完整交互预览`} loading="eager" />
      </div>
    </section>
  );
}
