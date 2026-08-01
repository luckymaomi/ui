import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";

export function CopyDownload({
  content,
  sourceId,
  filename,
  label = "内容",
}: {
  content?: string;
  sourceId?: string;
  filename: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  function readContent(): string {
    if (sourceId) {
      const source = document.getElementById(sourceId)?.textContent;
      if (source == null) throw new Error(`找不到复制来源：${sourceId}`);
      return source;
    }
    if (content == null) throw new Error("复制内容为空");
    return content;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(readContent());
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  }

  function download() {
    try {
      const url = URL.createObjectURL(new Blob([readContent()], { type: "text/plain;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="copy-actions" aria-live="polite">
      <button type="button" className="tool-button" onClick={copy}>
        {status === "copied" ? <Check size={16} /> : <Copy size={16} />}
        {status === "copied" ? "已复制" : `复制${label}`}
      </button>
      <button type="button" className="tool-button" onClick={download}>
        <Download size={16} />
        下载
      </button>
      {status === "error" ? <span className="copy-error">复制失败，请选择文本后复制。</span> : null}
    </div>
  );
}
