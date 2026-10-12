import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Lightweight one-time scroll reveal wrapper (max 12px translation).
 * Immediately visible without transition if user prefers reduced motion.
 *
 * @param {Object} props
 * @param {import("react").ElementType} [props.as="div"]
 * @param {number} [props.delay=0] - Delay in milliseconds
 * @param {string} [props.className]
 * @param {import("react").ReactNode} props.children
 */
export function Reveal({ as: Component = "div", delay = 0, className, children, ...rest }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px",
  });
  const prefersReduced = usePrefersReducedMotion();

  const isVisible = prefersReduced || isInView;
  const style = !prefersReduced && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Component
      ref={ref}
      style={style}
      className={cn(
        "transition-all duration-500 ease-soft",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
