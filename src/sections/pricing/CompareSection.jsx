import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveTable } from "@/components/ui/ResponsiveTable";
import { Badge } from "@/components/ui/Badge";
import { plans } from "@/data/pricing-catalog";
import { useFormat } from "@/hooks/useFormat";

// TODO(Debass): "Compare plans" and "Optional charges" are functional labels taken from the V3 notes ("interactive plan comparison", "separate inclusions from optional charges"); the PDF has no heading text for them.

/**
 * Interactive plan comparison table section.
 * Displays capacity and feature limits across the 4 plans, with conditional pricing columns.
 *
 * @param {Object} props
 * @param {boolean} props.showPrices
 * @returns {import("react").JSX.Element}
 */
export function CompareSection({ showPrices }) {
  const { t } = useTranslation();
  const { lng, formatNumber, formatFcfa } = useFormat();

  return (
    <Section tone="muted" spacing="sm" className="py-8 md:py-12">
      <Container>
        <Reveal>
          <SectionHeading title={t("pricing:page.compareTitle")} className="mb-4 md:mb-6" />

          <ResponsiveTable
            stickyFirstCol
            caption={t("pricing:compare.caption")}
            captionHidden={true}
            label={t("pricing:compare.caption")}
            tableClassName="min-w-[40rem]"
          >
            <thead>
              <tr>
                <th scope="col">{t("pricing:compare.plan")}</th>
                {showPrices && (
                  <>
                    <th scope="col">{t("pricing:compare.monthlyCol")}</th>
                    <th scope="col">{t("pricing:compare.annualCol")}</th>
                  </>
                )}
                <th scope="col">{t("pricing:page.modulesLabel")}</th>
                <th scope="col">{t("pricing:page.usersLabel")}</th>
                <th scope="col">{t("pricing:page.entitiesLabel")}</th>
                <th scope="col">{t("pricing:page.storageLabel")}</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => {
                const isEnterprise = plan.id === "enterprise";
                const isFeatured = Boolean(plan.featured);

                return (
                  <tr
                    key={plan.id}
                    className={
                      isFeatured
                        ? "bg-surface-tint [&>th[scope=row]]:bg-surface-tint"
                        : undefined
                    }
                  >
                    <th scope="row">
                      <div className="flex items-center gap-2">
                        <span>{t(`pricing:plans.${plan.id}.name`)}</span>
                        {isFeatured && (
                          <Badge className="bg-selected text-selected-fg">
                            {t("pricing:page.recommended")}
                          </Badge>
                        )}
                      </div>
                    </th>
                    {showPrices && (
                      <>
                        <td className="tabular-nums font-semibold text-heading">
                          {isEnterprise
                            ? t("pricing:page.customQuote")
                            : formatFcfa(plan.monthly, lng)}
                        </td>
                        <td className="tabular-nums font-semibold text-heading">
                          {isEnterprise
                            ? t("pricing:page.customQuote")
                            : formatFcfa(plan.annual, lng)}
                        </td>
                      </>
                    )}
                    <td>
                      {isEnterprise
                        ? t("pricing:plans.enterprise.modules")
                        : formatNumber(plan.includedModules, lng)}
                    </td>
                    <td>
                      {isEnterprise
                        ? t("pricing:plans.enterprise.users")
                        : formatNumber(plan.users, lng)}
                    </td>
                    <td>
                      {isEnterprise
                        ? t("pricing:plans.enterprise.entities")
                        : formatNumber(plan.legalEntities, lng)}
                    </td>
                    <td>
                      {isEnterprise
                        ? t("pricing:plans.enterprise.storage")
                        : t("pricing:page.storageValue", {
                            value: formatNumber(plan.storageGb, lng),
                          })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ResponsiveTable>
        </Reveal>
      </Container>
    </Section>
  );
}
