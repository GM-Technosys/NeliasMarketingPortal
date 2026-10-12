import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Sequential process steps list with numbered markers, supporting 3 or 4 columns
 * and optional animated scroll entrance with connector line.
 *
 * @param {Object} props
 * @param {Array<{ title: string, text: string }>} props.steps
 * @param {number} [props.headingLevel=3]
 * @param {3|4} [props.columns=3]
 * @param {boolean} [props.animated=false]
 * @param {string} [props.className]
 */
export function ProcessSteps({
  steps = [],
  headingLevel = 3,
  columns = 3,
  animated = false,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.15 });
  const prefersReduced = usePrefersReducedMotion();

  const isVisible = !animated || prefersReduced || isInView;
  const HeadingTag = `h${headingLevel}`;

  const colClasses =
    columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div ref={ref} className="relative">
      {/* Animated connector line behind markers (desktop lg and up only when animated is true) */}
      {animated && (
        <div
          className="hidden lg:block absolute top-[46px] left-[6%] right-[6%] h-0.5 bg-ink-200 z-0 pointer-events-none"
          role="presentation"
        >
          <div
            className={cn(
              "h-full bg-azure-500 origin-left transition-transform duration-900 ease-soft",
              isVisible ? "scale-x-100" : "scale-x-0",
            )}
          />
        </div>
      )}

      <ol className={cn("grid gap-8 relative z-10", colClasses, className)}>
        {steps.map(({ title, text }, index) => {
          const stepNumber = index + 1;

          const animationStyle =
            animated && !prefersReduced
              ? { animationDelay: `${index * 120}ms` }
              : undefined;

          return (
            <li
              key={stepNumber}
              style={animationStyle}
              className={cn(
                "flex flex-col items-start rounded-lg border border-line bg-surface p-6 shadow-xs",
                animated &&
                  !prefersReduced && [
                    isVisible ? "animate-tile-in" : "opacity-0 translate-y-3",
                  ],
              )}
            >
              <span
                aria-hidden="true"
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-white shadow-xs shrink-0"
              >
                {stepNumber}
              </span>

              <HeadingTag className="mb-2 font-display text-lg font-semibold text-navy-900 md:text-xl">
                {title}
              </HeadingTag>

              <p className="text-sm leading-relaxed text-fg-muted md:text-base">
                {text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
