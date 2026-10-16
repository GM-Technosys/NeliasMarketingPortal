import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Closing differentiator band for Why NELIAS page.
 * Uses the tinted surface matching the Home page closing CTA band.
 *
 * @returns {import("react").JSX.Element}
 */
export function DifferentiatorSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="differentiator"
      tone="tint"
      spacing="md"
      className="border-t border-accent-line/50"
      aria-labelledby="differentiator-statement"
    >
      <Container>
        <Reveal>
          {/* TODO(Debass): the approved English sentence is grammatically awkward ("helps to understand … and help streamline"). Kept exactly as approved; suggest a corrected version to Debass. */}
          <h2
            id="differentiator-statement"
            className="max-w-[28ch] font-display text-3xl sm:text-4xl lg:text-[2.45rem] font-semibold leading-tight tracking-tight text-heading"
          >
            {t("why:differentiator.statement")}
          </h2>

          <div className="mt-8">
            <Link
              to="/how-it-works"
              onClick={() =>
                track(EVENTS.CTA_CLICK, {
                  intent: "how-it-works",
                  location: "why-final",
                })
              }
              className={buttonStyles({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              {t("common:cta.discoverHowItWorks")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
