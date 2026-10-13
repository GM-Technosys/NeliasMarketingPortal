import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { HomePillars } from "./HomePillars";
import { cn } from "@/lib/cn";
import { EVENTS, track } from "@/lib/analytics";

/**
 * Section 3: "The NELIAS Approach" section with high-level description
 * and the three pillars (Understand, Compose, Evolve).
 */
export function HomeApproachSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="approach"
      tone="default"
      spacing="lg"
      aria-labelledby="approach-heading"
    >
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                as="h2"
                id="approach-heading"
                title={t("home:approach.title")}
                titleClassName="text-3xl sm:text-4xl lg:text-[2.45rem] lg:leading-[1.15] max-w-[420px] lg:max-w-[440px]"
                className="mb-0 md:mb-0"
              />
            </div>
            <div className="lg:col-span-7 mt-6 lg:mt-0 flex flex-col items-start">
              <p className="text-lead text-fg-muted leading-relaxed">
                {t("home:approach.body")}
              </p>
              <div className="mt-6 w-full sm:w-auto">
                <Link
                  to="/how-it-works"
                  onClick={() =>
                    track(EVENTS.CTA_CLICK, {
                      intent: "how-it-works",
                      location: "home-approach",
                    })
                  }
                  className={cn(
                    buttonStyles({ variant: "outline", size: "md" }),
                    "w-full sm:w-auto inline-flex items-center gap-2",
                  )}
                >
                  <span>{t("cta.seeHowNeliasWorks")}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <HomePillars />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
