import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { track, EVENTS } from "@/lib/analytics";

// TODO(Debass): the About document has no closing action; the approved button from the earlier PDF (Section 9) is used.
// TODO(Debass): the closing signature reads "…Your environment, automatically." while the brand promise reads "…automatically configured." Kept exactly as in the document; confirm which one is intended.
export function AboutClosing() {
  const { t } = useTranslation();

  return (
    <Section
      id="closing"
      tone="tint"
      spacing="lg"
      aria-label={t("about:closing.ariaLabel")}
    >
      <Container>
        <Reveal>
          <div className="max-w-4xl">
            <p className="font-display text-h2 font-semibold text-heading leading-tight">
              {t("about:closing.signature")}
            </p>

            <div className="mt-8">
              <Link
                to="/contact"
                onClick={() =>
                  track(EVENTS.CTA_CLICK, {
                    intent: "contact",
                    location: "about-final",
                  })
                }
                className={buttonStyles({
                  variant: "primary",
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                {t("common:cta.contactNeliasTeam")}
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
