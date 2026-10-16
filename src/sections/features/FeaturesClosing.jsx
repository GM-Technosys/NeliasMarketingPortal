import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FeaturesCta } from "./FeaturesCta";

// TODO(Debass): the PDF gives no closing headline for the Features page; the strip holds the approved button only.

/**
 * Closing conversion band for Features page.
 * Uses the tinted surface matching the Home page closing CTA band.
 *
 * @returns {import("react").JSX.Element}
 */
export function FeaturesClosing() {
  const { t } = useTranslation();

  return (
    <Section
      tone="tint"
      spacing="md"
      className="border-t border-accent-line/50"
      aria-label={t("features:page.nextStep")}
    >
      <Container className="flex justify-center text-center">
        <Reveal>
          <FeaturesCta size="lg" location="features-final" />
        </Reveal>
      </Container>
    </Section>
  );
}
