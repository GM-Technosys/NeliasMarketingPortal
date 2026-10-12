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
        <Panel tone="default" padding="lg" className="shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Left summary & link */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <div>
                <h3 className="font-display text-h3 font-semibold text-navy-900">
                  {name}
                </h3>
                {headline && (
                  <p className="mt-2 text-lg font-semibold text-navy-900 leading-snug">
                    {headline}
                  </p>
                )}
                <p className="mt-3 text-base text-fg-muted leading-relaxed">
                  {summary}
                </p>
              </div>

              <div className="pt-2">
                <TextLink to={`/industries/${slug}`}>
                  {t("home:industries.viewIndustry", { name })}
                </TextLink>
              </div>
            </div>

            {/* Right suggested capability chips */}
            <div className="lg:col-span-5 mt-6 border-t border-line pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
              <p className="text-sm font-semibold text-navy-900 mb-3">
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
          </div>
        </Panel>
      ),
    };
  });

  return (
    <Section
      id="industries"
      tone="tint"
      spacing="lg"
      aria-labelledby="industries-heading"
      className="overflow-x-clip"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="industries-heading"
            title={t("home:industries.title")}
          />
        </Reveal>

        <Reveal delay={120} className="w-full min-w-0 max-w-full">
          <div className="flex w-full min-w-0 max-w-full flex-col gap-8">
            <Tabs
              variant="pill"
              label={t("home:industries.title")}
              items={tabItems}
              defaultValue={industries[0]}
              className="w-full min-w-0 max-w-full"
            />

            <div className="text-center">
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
