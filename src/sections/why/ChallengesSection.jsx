import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Challenges and benefits comparison section for Why NELIAS page.
 * Displays a ruled list mapping common business challenges to NELIAS responses.
 *
 * @returns {import("react").JSX.Element}
 */
export function ChallengesSection() {
  const { t } = useTranslation();
  const rawItems = t("why:challenges.items", { returnObjects: true });
  const items = Array.isArray(rawItems) ? rawItems : [];

  return (
    <Section
      id="challenges"
      tone="default"
      spacing="lg"
      aria-labelledby="challenges-title"
    >
      <Container>
        <Reveal>
          {/* TODO(Debass): confirm "Challenges and benefits" is meant as a visible customer-facing headline (the PDF uses it as a table label). */}
          <SectionHeading
            id="challenges-title"
            as="h2"
            title={t("why:challenges.title")}
          />

          {/* Desktop column header labels (sentence case, visually hidden for screen readers as per-row sr-only spans handle them) */}
          <div
            aria-hidden="true"
            className="hidden pb-3 border-b border-line md:grid md:grid-cols-12 md:gap-10 text-sm font-semibold text-fg-muted"
          >
            <div className="md:col-span-5">{t("why:challenges.challengeLabel")}</div>
            <div className="md:col-span-7 pl-5">{t("why:challenges.responseLabel")}</div>
          </div>

          <ul className="divide-y divide-line">
            {items.map((item, index) => (
              <li
                key={index}
                className="grid gap-3 py-6 md:grid-cols-12 md:gap-10 md:py-8"
              >
                <div className="md:col-span-5">
                  <span className="sr-only">
                    {t("why:challenges.challengeLabel")}:{" "}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-fg md:text-2xl">
                    {item.challenge}
                  </h3>
                </div>

                <div className="border-l-[3px] border-accent pl-5 md:col-span-7">
                  <span className="sr-only">
                    {t("why:challenges.responseLabel")}:{" "}
                  </span>
                  <p className="text-lg text-heading">{item.response}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
