import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layers } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { IndustryCta } from "./IndustryCta";

/**
 * Closing action strip for Industries landing and detail pages.
 * Uses the tinted surface matching the Home page closing CTA band.
 *
 * @param {Object} props
 * @param {string} [props.labelKey] - CTA label key for configurator
 * @param {boolean} [props.showAll=false] - Whether to show the "All industries" button
 * @param {string} [props.location] - Tracking location
 * @returns {import("react").JSX.Element}
 */
export function IndustryClosing({ labelKey = "cta.findConfiguration", showAll = false, location }) {
  const { t } = useTranslation();

  return (
    <Section
      tone="tint"
      spacing="md"
      className="border-t border-accent-line/50"
      aria-label={t("industries:detail.nextStep")}
    >
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">
            {/* Left side: CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <IndustryCta
                  labelKey={labelKey}
                  size="lg"
                  location={location}
                  to="/configure"
                  className="w-full sm:w-auto text-center"
                />
                {showAll && (
                  <Link
                    to="/industries"
                    className={buttonStyles({
                      variant: "outline",
                      size: "lg",
                      className: "w-full sm:w-auto text-center",
                    })}
                  >
                    {t("industries:detail.allIndustries")}
                  </Link>
                )}
              </div>
            </div>

            {/* Right side: Reassurance card filling the empty space */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 rounded-xl border border-line bg-surface-raised p-4 sm:p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-tint text-accent">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-heading">
                    {t("industries:closing.title")}
                  </h3>
                  <p className="mt-1 text-xs text-fg-muted leading-relaxed">
                    {t("industries:closing.subtitle")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
