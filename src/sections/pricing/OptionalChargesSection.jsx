import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsiveTable } from "@/components/ui/ResponsiveTable";
import { Alert } from "@/components/ui/Alert";
import { optionalCharges } from "@/data/pricing-catalog";
import { useFormat } from "@/hooks/useFormat";
import { describeRule } from "./price-format";
import { cn } from "@/lib/cn";

/**
 * Expandable pricing details for developers section displaying capacity,
 * sector packs, add-ons, and connectors in an interactive structured table.
 *
 * @returns {import("react").JSX.Element}
 */
export function OptionalChargesSection() {
  const { t } = useTranslation();
  const { lng } = useFormat();
  const [expanded, setExpanded] = useState(true);

  const groups = [
    { key: "capacity", items: optionalCharges.capacity },
    { key: "sectorPacks", items: optionalCharges.sectorPacks },
    { key: "addOns", items: optionalCharges.addOns },
    { key: "connectors", items: optionalCharges.connectors },
  ];

  return (
    <Section tone="default" spacing="md" className="py-10 md:py-14">
      <Container>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-line">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
                {t("pricing:page.devPricingTitle")}
              </h2>
              <p className="mt-2 text-base text-fg-muted max-w-2xl">
                {t("pricing:page.optionalLead")}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface-raised px-4 py-2 text-sm font-semibold text-fg-strong shadow-2xs hover:bg-surface-muted hover:text-heading cursor-pointer shrink-0 self-start sm:self-center transition-colors"
            >
              <span>{expanded ? t("pricing:page.collapseDetails") : t("pricing:page.expandDetails")}</span>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
                aria-hidden="true"
              />
            </button>
          </div>

          {expanded && (
            <div className="mt-6">
              <ResponsiveTable
                caption={t("pricing:page.devPricingTitle")}
                captionHidden={true}
                label={t("pricing:page.devPricingTitle")}
                tableClassName="min-w-[24rem] sm:min-w-[32rem]"
              >
                <thead>
                  <tr>
                    <th scope="col" className="w-1/2 min-w-[9.5rem]">{t("pricing:page.itemCol")}</th>
                    <th scope="col" className="w-1/2 min-w-[12rem]">{t("pricing:page.ruleCol")}</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(({ key, items }) =>
                    items.map(({ id, rule }, idx) => (
                      <tr key={id}>
                        <th scope="row" className="font-medium text-fg">
                          <span className="flex items-center gap-2">
                            {idx === 0 && (
                              <span className="sr-only">[{t(`pricing:optional.groups.${key}`)}]</span>
                            )}
                            {t(`pricing:optional.items.${id}`)}
                          </span>
                        </th>
                        <td className="tabular-nums font-semibold text-heading">
                          {describeRule(rule, t, lng)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </ResponsiveTable>
            </div>
          )}

          {/* Pricing disclaimer note */}
          <div className="mt-8 max-w-3xl">
            <Alert tone="note">{t("pricing:disclaimer")}</Alert>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
