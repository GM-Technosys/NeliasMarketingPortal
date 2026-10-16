import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Panel } from "@/components/ui/Panel";

/**
 * Compact read-only configuration summary displayed in the sidebar aside.
 *
 * @param {Object} props
 * @param {Object} props.data - Configurator state
 * @param {string} props.effectivePlan - Current plan id
 * @param {Object} props.plansById - Plans map
 * @param {Object} props.catalog - Pricing catalog
 * @param {string} [props.className]
 */
export function SummaryPanel({
  data,
  effectivePlan,
  plansById,
  catalog,
  className = "",
}) {
  const { t } = useTranslation();

  const industryLabel = useMemo(() => {
    if (!data.industry) return t("configurator:panel.empty");
    if (data.industry === "other") return t("contact:form.other");
    return t(`industries:items.${data.industry}.name`);
  }, [data.industry, t]);

  const functionsLabel = useMemo(() => {
    if (!data.functions || data.functions.length === 0) {
      return t("configurator:panel.empty");
    }
    return data.functions
      .map((k) => t(`features:areas.${k}.name`))
      .join(", ");
  }, [data.functions, t]);

  const capacityLabel = `${data.users} ${t("pricing:page.usersLabel").toLowerCase()} · ${data.entities} ${t("pricing:page.entitiesLabel").toLowerCase()}`;

  const storageLabel =
    data.storage === "more"
      ? t("configurator:customize.storageMore", { value: 50 })
      : t("pricing:page.storageValue", { value: data.storage });

  const planLabel = effectivePlan
    ? t(`pricing:plans.${effectivePlan}.name`)
    : t("configurator:panel.empty");

  const optionsLabel = useMemo(() => {
    const list = [];
    (data.sectorPacks || []).forEach((id) =>
      list.push(t(`pricing:optional.items.${id}`)),
    );
    (data.addOns || []).forEach((id) =>
      list.push(t(`pricing:optional.items.${id}`)),
    );
    (data.connectors || []).forEach((id) =>
      list.push(t(`pricing:optional.items.${id}`)),
    );
    return list.length > 0 ? list.join(", ") : t("configurator:panel.empty");
  }, [data.sectorPacks, data.addOns, data.connectors, t]);

  return (
    <Panel tone="muted" padding="md" className={`space-y-4 ${className}`}>
      <p className="font-display text-h3 font-semibold text-heading">
        {t("configurator:panel.title")}
      </p>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {t("contact:form.industry")}
          </dt>
          <dd className="mt-0.5 font-medium text-fg">{industryLabel}</dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {t("configurator:panel.functions")}
          </dt>
          <dd className="mt-0.5 font-medium text-fg">{functionsLabel}</dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {t("configurator:panel.capacity")}
          </dt>
          <dd className="mt-0.5 font-medium text-fg">{capacityLabel}</dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {t("configurator:panel.storage")}
          </dt>
          <dd className="mt-0.5 font-medium text-fg">{storageLabel}</dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {t("configurator:panel.plan")}
          </dt>
          <dd className="mt-0.5 font-medium text-fg">{planLabel}</dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {t("configurator:panel.options")}
          </dt>
          <dd className="mt-0.5 font-medium text-fg">{optionsLabel}</dd>
        </div>
      </dl>
    </Panel>
  );
}
