import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaLink } from "@/components/common/CtaLink";

// TODO(Debass): the PDF gives no closing headline for the Pricing page; the strip holds the approved button only.

/**
 * Closing conversion band for Pricing page.
 * Uses the tinted surface matching the Home page closing CTA band.
 *
 * @returns {import("react").JSX.Element}
 */
export function PricingClosing() {
  const { t } = useTranslation();

  return (
    <Section
      tone="tint"
      spacing="md"
      className="border-t border-accent-line/50"
      aria-label={t("pricing:page.nextStep")}
    >
      <Container className="flex justify-center text-center">
        <Reveal>
          <CtaLink
            to="/configure"
            intent="configure"
            size="lg"
            location="pricing-final"
          >
            {t("cta.configure")}
          </CtaLink>
        </Reveal>
      </Container>
    </Section>
  );
}
