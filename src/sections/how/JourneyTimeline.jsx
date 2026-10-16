import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { StepVisual } from "./StepVisual";
import { cn } from "@/lib/cn";

// TODO(Debass): Home shows a 4-step journey (V3 wording) while this page shows the 6 approved steps. Confirm whether the wording should be aligned.
// TODO(Debass): steps 4 and 5 describe self-service price estimates, payment and activation. Confirm the wording is acceptable until the configurator and checkout are live.

/**
 * Journey timeline section for How It Works page.
 * Displays a 6-step ordered list with animated ribbon spine and step markers.
 *
 * @returns {import("react").JSX.Element}
 */
export function JourneyTimeline() {
  const { t } = useTranslation();
  const prefersReduced = usePrefersReducedMotion();
  const rawSteps = t("how:steps", { returnObjects: true });
  const steps = Array.isArray(rawSteps) ? rawSteps : [];

  const [highestReached, setHighestReached] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"));
            if (!Number.isNaN(index)) {
              setHighestReached((prev) => Math.max(prev, index));
            }
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [prefersReduced]);

  const effectiveHighest = prefersReduced ? 5 : highestReached;

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <ol role="list" className="relative">
          {steps.map((step, index) => {
            const isReached = index <= effectiveHighest;
            const isLast = index === steps.length - 1;
            const isSegmentReached = index + 1 <= effectiveHighest;
            const stepNumber = String(index + 1).padStart(2, "0");
            const visualVariant = /** @type {1 | 2 | 3 | 4 | 5 | 6} */ (
              index + 1
            );

            return (
              <li
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-step-index={index}
                className="relative pl-16 pb-14 last:pb-0 sm:pl-20 md:pb-20"
              >
                {/* Connector segment to next step */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="absolute top-6 left-6 z-0 h-full w-[3px] -translate-x-1/2 bg-line"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 origin-top bg-gradient-to-b from-flame-500 to-sun-300 transition-transform duration-700 ease-soft",
                        isSegmentReached ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                  </div>
                )}

                {/* Step marker */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 z-10 grid h-12 w-12 place-items-center rounded-full border-2 font-display text-base font-semibold tabular-nums transition-colors duration-300",
                    isReached
                      ? "border-selected bg-selected text-selected-fg"
                      : "border-line-strong bg-surface-raised text-fg-subtle",
                  )}
                >
                  {stepNumber}
                </div>

                {/* Content grid */}
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  {/* Text column */}
                  <div className="lg:col-span-6">
                    <h2 className="font-display text-h3 font-semibold text-heading md:text-h2">
                      {step.title}
                    </h2>
                    <p className="mt-3 max-w-[46ch] text-lead text-fg-muted">
                      {step.text}
                    </p>
                  </div>

                  {/* Illustration column */}
                  <div className="w-full max-w-md lg:col-span-5 lg:col-start-8">
                    <StepVisual variant={visualVariant} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
