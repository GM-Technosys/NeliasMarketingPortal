import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { industries } from "@/data/industries";
import { industryProfiles } from "@/data/home-content";
import { capabilityStates, AVAILABILITY } from "@/data/feature-states";

// TODO(Debass): the PDF promises "examples, benefits and suggested capabilities" per industry but supplies only a short summary (and a headline for six industries). The capability chips are derived only from words in each approved summary. They need Debass confirmation.
export function IndustrySelectorSection() {
  const { t, i18n } = useTranslation();

  const tabItems = industries.map((slug) => {
    const profile = industryProfiles[slug];
    const name = t(`industries:items.${slug}.name`);
    const hasHeadline = i18n.exists(`industries:items.${slug}.headline`);
    const headline = hasHeadline ? t(`industries:items.${slug}.headline`) : null;
    const summary = t(`industries:items.${slug}.summary`);

    // Filter out areas marked as hidden in capabilityStates
    const visibleAreas = (profile?.areas || []).filter(
      (areaKey) => capabilityStates[areaKey] !== AVAILABILITY.HIDDEN,
    );

    return {
      id: slug,
      label: name,
      icon: profile?.icon,
      content: (
        <Panel tone="default" padding="lg" className="shadow-card h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              {profile?.icon && (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-tint text-accent-strong">
                  <profile.icon className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-heading">
                {name}
              </h3>
            </div>

            {headline && (
              <p className="mt-3 text-lg font-semibold text-heading leading-snug">
                {headline}
              </p>
            )}

            <p className="mt-3 text-base text-fg-muted leading-relaxed">
              {summary}
            </p>

            {/* Suggested capabilities chips */}
            {visibleAreas.length > 0 && (
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle mb-3">
                  {t("home:industries.suggestedLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {visibleAreas.map((areaKey) => (
                    <Badge key={areaKey} tone="neutral" size="md">
                      {t(`features:areas.${areaKey}.name`)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <TextLink to={`/industries/${slug}`}>
              {t("home:industries.viewIndustry", { name })}
            </TextLink>
          </div>
        </Panel>
      ),
    };
  });

  return (
    <Section
      id="industries"
      tone="default"
      spacing="lg"
      aria-labelledby="industries-heading"
      className="overflow-x-clip"
    >
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            id="industries-heading"
            title={t("home:industries.title")}
            lead={t("home:industries.body")}
          />
        </Reveal>

        <Reveal delay={90} className="w-full min-w-0 max-w-full">
          <div className="flex w-full min-w-0 max-w-full flex-col">
            <h3
              id="industry-selector-heading"
              className="font-display text-h3 font-semibold text-heading mt-10 md:mt-12 mb-6"
            >
              {t("home:industries.selectorLabel")}
            </h3>

            <Tabs
              variant="pill"
              orientation="vertical"
              label={t("home:industries.selectorLabel")}
              items={tabItems}
              defaultValue={industries[0]}
              selectOnHover={true}
              className="w-full min-w-0 max-w-full"
            />

            <div className="mt-8 text-center">
              <Link
                to="/industries"
                className={buttonStyles({ variant: "outline" })}
              >
                {t("home:industries.cta")}
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
