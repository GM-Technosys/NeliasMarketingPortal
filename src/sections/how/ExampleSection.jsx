import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaLink } from "@/components/common/CtaLink";

/**
 * Example and closing action section for How It Works page.
 * Uses the tinted surface matching the Home page closing CTA band.
 *
 * @returns {import("react").JSX.Element}
 */
export function ExampleSection() {
  const { t } = useTranslation();

  return (
    <Section
      tone="tint"
      spacing="md"
      className="border-t border-accent-line/50"
    >
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <div role="group" aria-label={t("how:example.ariaLabel")}>
              <p className="text-lead text-fg leading-relaxed">
                <span className="font-semibold text-heading">{t("how:example.label")}</span>{" "}
                {t("how:example.text")}
              </p>

              <div
                aria-hidden="true"
                className="mt-6 inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-surface-raised px-5 py-3 font-display text-base text-heading shadow-xs"
              >
                <Globe className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="break-all">{t("how:example.address")}</span>
              </div>
            </div>

            <div className="mt-8">
              <CtaLink
                to="/configure"
                intent="configure"
                size="lg"
                location="how-final"
                className="w-full sm:w-auto"
              >
                {t("cta.configure")}
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
