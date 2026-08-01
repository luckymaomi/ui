import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { withBase } from "@/lib/base";

export interface ShowcaseLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: string | { pathname?: string };
  children?: ReactNode;
  prefetch?: boolean;
}

const ShowcaseLink = forwardRef<HTMLAnchorElement, ShowcaseLinkProps>(
  ({ href, children, prefetch: _prefetch, ...props }, ref) => {
    void _prefetch;
    const target = typeof href === "string" ? href : (href.pathname ?? "/");
    const route = target.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
    const returnLabel =
      route === "/ui"
        ? "返回首页"
        : route === "/ui/styles"
          ? "返回风格目录"
          : /^\/ui\/styles\/[^/]+$/.test(route)
            ? "返回风格详情"
            : null;

    if (returnLabel) {
      return (
        <a
          ref={ref}
          href={withBase(target)}
          className={`showcase-back-link ${props.className ?? ""}`.trim()}
          style={props.style}
        >
          {returnLabel}
        </a>
      );
    }

    return (
      <a ref={ref} href={withBase(target)} {...props}>
        {children}
      </a>
    );
  },
);

ShowcaseLink.displayName = "ShowcaseLink";
export default ShowcaseLink;
