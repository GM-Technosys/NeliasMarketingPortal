import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Panel } from "@/components/ui/Panel";
import { ChoiceCard } from "@/components/ui/forms";
import { scenarioKeys } from "@/data/home-content";

// TODO(Debass): the PDF gives no business-impact or benefit text for the three scenarios; these use the approved challenge/response pairs from the "Why NELIAS" copy.
export function ScenarioSection() {
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState(scenarioKeys[0]);

  return (
    <div>
      <h3
        id="scenarios-heading"
        className="font-display text-h3 font-semibold text-navy-900 mb-6"
      >
        {t("home:scenarios.title")}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left choice radio cards in radiogroup */}
        <div
          role="radiogroup"
          aria-labelledby="scenarios-heading"
          className="lg:col-span-5 flex flex-col gap-3.5"
        >
          {scenarioKeys.map((key) => (
            <ChoiceCard
              key={key}
              type="radio"
              name="scenario"
              value={key}
              checked={selectedScenario === key}
              onChange={() => setSelectedScenario(key)}
              onMouseEnter={() => setSelectedScenario(key)}
              onFocus={() => setSelectedScenario(key)}
              title={t(`home:scenarios.items.${key}.title`)}
            />
          ))}
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
                <p className="text-sm font-semibold text-fg-muted mb-2">
                  {t("home:scenarios.impactLabel")}
                </p>
                <p className="font-display text-2xl font-semibold text-navy-900 leading-snug">
                  {t(`home:scenarios.items.${selectedScenario}.impact`)}
                </p>
              </div>

              <hr className="border-line my-6" />

              {/* NELIAS benefit block */}
              <div className="border-l-[3px] border-l-azure-500 pl-4 py-1 bg-azure-50/40 rounded-r-md">
                <p className="text-sm font-semibold text-navy-900 mb-2">
                  {t("home:scenarios.benefitLabel")}
                </p>
                <p className="text-lg font-medium text-navy-900 leading-snug">
                  {t(`home:scenarios.items.${selectedScenario}.benefit`)}
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
