import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { Reveal } from "@/components/ui/Reveal";
import { Fieldset, ChoiceCard } from "@/components/ui/forms";
import { scenarioKeys } from "@/data/home-content";

// TODO(Debass): Confirm final scenario impact and benefit copy with Debass team.
export function ScenarioSection() {
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState(scenarioKeys[0]);

  return (
    <Section
      id="scenarios"
      tone="tint"
      spacing="lg"
      aria-labelledby="scenarios-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="scenarios-heading"
            title={t("home:scenarios.title")}
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left choice radio cards */}
            <div className="lg:col-span-5">
              <Fieldset legend={t("home:scenarios.title")}>
                <div className="flex flex-col gap-3.5">
                  {scenarioKeys.map((key) => (
                    <ChoiceCard
                      key={key}
                      type="radio"
                      name="scenario"
                      value={key}
                      checked={selectedScenario === key}
                      onChange={() => setSelectedScenario(key)}
                      title={t(`home:scenarios.items.${key}.title`)}
                    />
                  ))}
                </div>
              </Fieldset>
            </div>

            {/* Right details panel */}
            <div className="lg:col-span-7">
              <Panel
                tone="default"
                padding="lg"
                aria-live="polite"
                className="shadow-card"
              >
                <div
                  key={selectedScenario}
                  className="transition-opacity duration-150"
                >
                  {/* Business impact block */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900 mb-2">
                      {t("home:scenarios.impactLabel")}
                    </h3>
                    <p className="text-base text-fg-muted leading-relaxed">
                      {t(`home:scenarios.items.${selectedScenario}.impact`)}
                    </p>
                  </div>

                  <hr className="border-line my-6" />

                  {/* NELIAS benefit block */}
                  <div className="border-l-[3px] border-l-azure-500 pl-4 py-1 bg-azure-50/40 rounded-r-md">
                    <h3 className="text-sm font-semibold text-navy-900 mb-2">
                      {t("home:scenarios.benefitLabel")}
                    </h3>
                    <p className="text-lg font-medium text-navy-900 leading-snug">
                      {t(`home:scenarios.items.${selectedScenario}.benefit`)}
                    </p>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
