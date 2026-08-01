import { createPortal } from "react-dom";
import { withBase } from "@/lib/base";

export function TemplateBackLink() {
  const outlet = document.getElementById("template-preview-navigation");
  if (!outlet) throw new Error("模板预览缺少返回导航插槽");

  return createPortal(
    <a href={withBase("/templates/")} className="template-preview-back-link">
      返回模板目录
    </a>,
    outlet,
  );
}
