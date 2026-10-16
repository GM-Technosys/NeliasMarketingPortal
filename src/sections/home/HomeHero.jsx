import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/common/CtaLink";
import { buttonStyles } from "@/components/ui/button-styles";
import { HeroComposition } from "./HeroComposition";
import { cn } from "@/lib/cn";

// TODO(Debass): Hero subheadline and secondary CTA differ between Section 3 and V3. Section 3 is used; the V3 subheadline is used as the lead of the capabilities section.
/**
 * Main Hero section of the Home page.
 */
export function HomeHero() {
  const { t } = useTranslation();

  return (
    <Section
      id="hero"
      tone="default"
      spacing="lg"
      aria-labelledby="hero-heading"
      className="py-14 md:py-20 lg:py-24 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <p className="mb-4 text-sm font-semibold text-link">
              {t("home:hero.eyebrow")}
            </p>

            <h1
              id="hero-heading"
              className="font-display text-h1 font-semibold text-heading leading-tight tracking-tight max-w-[20ch]"
            >
              {t("home:hero.title")}
            </h1>

            <p className="mt-6 text-lead text-fg-muted max-w-[52ch] leading-relaxed">
              {t("home:hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <CtaLink
                to="/configure"
                intent="configure"
                variant="secondary"
                size="lg"
                location="hero"
                className="w-full sm:w-auto"
              >
                {t("cta.configure")}
              </CtaLink>
              <Link
                to="/how-it-works"
                className={cn(
                  buttonStyles({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {t("cta.exploreHowItWorks")}
              </Link>
            </div>
          </div>

          {/* Decorative composition column */}
          <div className="lg:col-span-6 w-full mt-4 lg:mt-0">
            <HeroComposition />
          </div>
        </div>
      </Container>
    </Section>
  );
}
