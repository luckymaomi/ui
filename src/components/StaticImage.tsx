import { forwardRef, type ImgHTMLAttributes } from "react";
import { withBase } from "@/lib/base";

type StaticImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

const StaticImage = forwardRef<HTMLImageElement, StaticImageProps>(
  ({ src = "", alt = "", fill, priority, unoptimized, style, ...props }, ref) => {
    void unoptimized;
    return (
      <img
        ref={ref}
        src={typeof src === "string" ? withBase(src) : src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={fill ? { ...style, width: "100%", height: "100%", objectFit: "cover" } : style}
        {...props}
      />
    );
  },
);

StaticImage.displayName = "StaticImage";
export default StaticImage;
