import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

// TODO(Debass): the PDF gives no walkthrough text except Retail's "supplier order to customer sale" (from the V3 notes); other nodes are the nouns of each approved industry description.

/**
 * Practical walkthrough chain for industry detail pages.
 * Displays a progressive node sequence connected by an animated ribbon rail.
 *
 * @param {Object} props
 * @param {string} props.slug
 * @returns {import("react").JSX.Element}
 */
export function WalkthroughChain({ slug }) {
  const { t } = useTranslation();
  const rawNodes = t(`industries:items.${slug}.walkthrough`, {
    returnObjects: true,
  });
  const nodes = Array.isArray(rawNodes) ? rawNodes : [];

  const title = t("industries:detail.walkthroughTitle");

  const listRef = useRef(null);
  const isInView = useInView(listRef, { once: true, threshold: 0.1 });
  const prefersReduced = usePrefersReducedMotion();
  const isFilled = prefersReduced || isInView;

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading as="h2" title={title} />

          <ol
            ref={listRef}
            role="list"
            aria-label={title}
            style={{ "--cols": nodes.length }}
            className="relative space-y-8 pl-10 lg:grid lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] lg:gap-6 lg:space-y-0 lg:pl-0"
          >
            {/* Connecting ribbon rail */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-[3px] bg-line lg:top-[7px] lg:bottom-auto lg:left-[calc(50%/var(--cols))] lg:right-[calc(50%/var(--cols))] lg:h-[3px] lg:w-auto"
            >
              <div
                className={cn(
                  "h-full w-full origin-top bg-gradient-to-b from-flame-500 to-sun-300 transition-transform duration-700 ease-soft lg:origin-left lg:bg-gradient-to-r",
                  isFilled
                    ? "scale-y-100 lg:scale-x-100"
                    : "scale-y-0 lg:scale-x-0",
                )}
              />
            </div>

            {nodes.map((node, index) => (
              <li key={index} className="relative lg:text-center">
                <div
                  aria-hidden="true"
                  className="absolute top-1 left-[-40px] h-4 w-4 rounded-full bg-selected ring-4 ring-surface lg:static lg:mx-auto lg:mb-4"
                />
                <span className="block font-display text-lg font-semibold text-heading">
                  {node}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
