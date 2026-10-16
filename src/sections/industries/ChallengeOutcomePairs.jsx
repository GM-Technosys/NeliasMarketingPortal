import { useTranslation } from "react-i18next";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { defaultPairIndexes } from "@/data/industry-content";

/**
 * Common challenges and outcomes section for industry detail page.
 *
 * @param {Object} props
 * @param {string} props.slug
 * @returns {import("react").JSX.Element}
 */
export function ChallengeOutcomePairs({ slug }) {
  const { t } = useTranslation();

  const customPairs = t(`industries:items.${slug}.pairs`, {
    returnObjects: true,
  });

  let pairs = [];
  if (Array.isArray(customPairs) && customPairs.length > 0) {
    pairs = customPairs;
  } else {
    const whyItems = t("why:challenges.items", { returnObjects: true });
    if (Array.isArray(whyItems)) {
      pairs = defaultPairIndexes.map((idx) => {
        const item = whyItems[idx] || {};
        return {
          challenge: item.challenge || "",
          outcome: item.response || "",
        };
      });
    }
  }

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            title={t("industries:detail.challengesTitle")}
          />

          {/* Desktop column labels */}
          <div
            aria-hidden="true"
            className="hidden grid-cols-2 gap-6 text-sm font-semibold text-fg-muted md:grid"
          >
            <div>{t("industries:detail.challengeLabel")}</div>
            <div>{t("industries:detail.outcomeLabel")}</div>
          </div>

          <ul className="mt-6 space-y-4">
            {pairs.map((pair, index) => (
              <li key={index} className="grid gap-3 md:grid-cols-2 md:gap-6">
                {/* Challenge cell */}
                <div className="rounded-lg bg-surface-muted p-5 md:p-6">
                  <span className="sr-only">
                    {t("industries:detail.challengeLabel")}:{" "}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-fg">
                    {pair.challenge}
                  </h3>
                </div>

                {/* Outcome cell */}
                <div className="flex gap-3 rounded-lg border border-accent-line bg-surface-tint p-5 md:p-6">
                  <CircleCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-link"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="sr-only">
                      {t("industries:detail.outcomeLabel")}:{" "}
                    </span>
                    <p className="text-heading">{pair.outcome}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
