import { useTranslation } from "react-i18next";
import { Section, Container } from "@/components/ui";
import { PrimaryCta } from "@/components/common/PrimaryCta";

// TODO(Debass): the PDF gives no closing headline for Resources; the strip holds the approved button only.

/**
 * Closing conversion strip for the Resources page.
 * Uses the tinted surface matching the Home page closing CTA band.
 */
export function ResourcesClosing() {
  const { t } = useTranslation();

  return (
    <Section
      tone="tint"
      spacing="md"
      className="border-t border-accent-line/50"
      aria-label={t("resources:page.nextStep")}
    >
      <Container className="flex justify-center text-center">
        <PrimaryCta size="lg" location="resources-final" />
      </Container>
    </Section>
  );
}
