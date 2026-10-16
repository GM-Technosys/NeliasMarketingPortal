import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { buttonStyles } from "@/components/ui/button-styles";
import { areaIcons } from "@/data/industry-content";
import { capabilityStates, AVAILABILITY } from "@/data/feature-states";
import { describeRule } from "@/sections/pricing/price-format";
import { features } from "@/config/features";

/**
 * Step 3: Here is your recommended setup (Recommendation).
 *
 * @param {Object} props
 * @param {Object} props.data - Configurator state
 * @param {Object} props.rec - Recommendation result { planId, needsReview }
 * @param {Object} props.plansById - Map of plans by id
 * @param {Array} props.options - Useful options { area, addOnId, included }
 * @param {Object} props.catalog - Pricing catalog
 */
export function StepRecommendation({ data, rec, plansById, options, catalog }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language?.startsWith("fr") ? "fr" : "en";

  const planId = rec.planId || "start";
  const planObj = plansById[planId] || plansById.start;
  const planName = t(`pricing:plans.${planId}.name`);

  const inclusions = useMemo(() => {
    const raw = t(`pricing:plans.${planId}.included`, { returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  }, [t, planId]);

  const industryName = useMemo(() => {
    if (!data.industry) return "";
    if (data.industry === "other") return t("contact:form.other");
    return t(`industries:items.${data.industry}.name`);
  }, [data.industry, t]);

  const functionNames = useMemo(() => {
    const list = data.functions || [];
    return list.map((key) => t(`features:areas.${key}.name`));
  }, [data.functions, t]);

  return (
    <div>
      <h2 className="font-display text-h2 text-heading" tabIndex={-1}>
        {t("configurator:steps.recommendation")}
      </h2>
      <p className="mt-2 text-lead text-fg-muted">
        {t("configurator:recommendation.helper")}
      </p>

      {rec.needsReview && (
        <div className="mt-6">
          <Alert tone="warning" live="polite">
            <p className="text-fg font-medium">
              {t("configurator:recommendation.specialist")}
            </p>
            <div className="mt-4">
              <Link
                to="/contact"
                className={buttonStyles({ variant: "primary", size: "md" })}
              >
                {t("cta.talkToExpert")}
              </Link>
            </div>
          </Alert>
        </div>
      )}

      {/* Recommended Setup Panel */}
      <div className="mt-8">
        <Panel tone="tint" padding="lg">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            {t("configurator:recommendation.panelTitle")}
          </h3>

          <div className="mt-3">
            <span className="font-display text-display text-heading block">
              {planName}
            </span>
            <p className="mt-1 text-lead text-fg-muted">
              {t(`pricing:plans.${planId}.tagline`)}
            </p>
          </div>

          {/* Inclusions checklist */}
          <ul className="mt-6 space-y-2 border-t border-line pt-6">
            {inclusions.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-sm font-medium text-fg">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                  <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Why section */}
          <div className="mt-8 border-t border-line pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-heading">
              {t("configurator:recommendation.because")}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
              <li>
                {t("configurator:recommendation.usersLine", {
                  needed: data.users,
                  plan: planName,
                  included: planObj.users,
                })}
              </li>
              <li>
                {t("configurator:recommendation.entitiesLine", {
                  needed: data.entities,
                  plan: planName,
                  included: planObj.legalEntities,
                })}
              </li>
              {data.storage !== "more" && (
                <li>
                  {t("configurator:recommendation.storageLine", {
                    needed: data.storage,
                    plan: planName,
                    included: planObj.storageGb,
                  })}
                </li>
              )}
              {Boolean(industryName) && (
                <li>
                  {t("configurator:recommendation.industryLine", {
                    industry: industryName,
                  })}
                </li>
              )}
              {functionNames.length > 0 && (
                <li>
                  {t("configurator:recommendation.functionsLine", {
                    list: functionNames.join(", "),
                  })}
                </li>
              )}
            </ul>
          </div>
        </Panel>
      </div>

      {/* Included capabilities */}
      {data.functions && data.functions.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display text-h3 text-heading">
            {t("configurator:recommendation.includedTitle")}
          </h3>
          <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface-raised">
            {data.functions.map((key) => {
              const IconComp = areaIcons[key];
              const st = capabilityStates[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3.5 text-sm"
                >
                  <div className="flex items-center gap-3">
                    {IconComp && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-sunken text-heading">
                        <IconComp className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                    <span className="font-semibold text-fg">
                      {t(`features:areas.${key}.name`)}
                    </span>
                  </div>
                  {st && st !== AVAILABILITY.AVAILABLE && (
                    <AvailabilityBadge state={st} size="sm" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Useful options */}
      <div className="mt-10">
        <h3 className="font-display text-h3 text-heading">
          {t("configurator:recommendation.optionsTitle")}
        </h3>

        {options.length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">
            {t("configurator:recommendation.optionsNone")}
          </p>
        ) : (
          <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface-raised">
            {options.map((opt) => {
              const addOnItem = catalog.optionalCharges.addOns.find(
                (a) => a.id === opt.addOnId,
              );
              const priceText =
                features.pricingPublic && addOnItem
                  ? describeRule(addOnItem.rule, t, lng)
                  : "";

              return (
                <div
                  key={opt.addOnId}
                  className="flex flex-wrap items-center justify-between gap-2 p-3.5 text-sm"
                >
                  <span className="font-semibold text-fg">
                    {t(`pricing:optional.items.${opt.addOnId}`)}
                  </span>
                  <div className="flex items-center gap-3">
                    {opt.included ? (
                      <Badge tone="success" size="sm">
                        {t("configurator:recommendation.includedInPlan", {
                          plan: planName,
                        })}
                      </Badge>
                    ) : (
                      priceText && (
                        <span className="text-fg-muted font-medium">
                          {priceText}
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
