import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { plans } from "@/data/pricing-catalog";
import { PlanCard } from "./PlanCard";

// TODO(Debass): annual billing equals 10 paid months for 12 months of service "subject to final Debass validation" (V3 note); the approved sentence from Section 8 is displayed.

/**
 * Plans section rendering the billing toggle (when prices public),
 * annual discount note, and the grid of 4 plan cards.
 *
 * @param {Object} props
 * @param {"monthly"|"annual"} props.billing
 * @param {(billing: "monthly"|"annual") => void} props.onBillingChange
 * @param {boolean} props.showPrices
 * @returns {import("react").JSX.Element}
 */
export function PlansSection({ billing, onBillingChange, showPrices }) {
  const { t } = useTranslation();

  return (
    <Section tone="default" spacing="md" className="py-10 md:py-14">
      <Container>
        <Reveal>
          {/* Visually hidden section heading for document outline */}
          <h2 className="sr-only">{t("pricing:page.plansTitle")}</h2>

          {/* Billing toggle: only shown when pricing is public */}
          {showPrices && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <SegmentedControl
                name="billing"
                size="lg"
                label={t("pricing:page.billingLabel")}
                value={billing}
                onChange={onBillingChange}
                options={[
                  { value: "monthly", label: t("pricing:page.monthly") },
                  { value: "annual", label: t("pricing:page.annual") },
                ]}
              />

              <p className="text-sm text-fg-muted sm:max-w-md">
                {t("pricing:page.annualNote")}
              </p>

              {/* Polite live region announcing billing period change */}
              <p role="status" aria-live="polite" className="sr-only">
                {t("pricing:page.announce", {
                  period:
                    billing === "monthly"
                      ? t("pricing:page.periodMonthly")
                      : t("pricing:page.periodAnnual"),
                })}
              </p>
            </div>
          )}

          {/* Plan cards grid */}
          <ul
            aria-label={t("pricing:page.plansTitle")}
            className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {plans.map((plan) => (
              <li key={plan.id} className="flex">
                <PlanCard
                  plan={plan}
                  billing={billing}
                  showPrices={showPrices}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
