import {
  useInView as useIntersectionInView,
  type IntersectionOptions,
} from "react-intersection-observer";

type ShowcaseInViewOptions = IntersectionOptions | number;

export function useInView(options: ShowcaseInViewOptions = {}) {
  const normalizedOptions =
    typeof options === "number" ? { threshold: options } : options;

  return useIntersectionInView({
    threshold: 0.15,
    triggerOnce: true,
    ...normalizedOptions,
  });
}
