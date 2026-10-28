import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import { SignUpLink } from "@/components/common/SignUpLink";
import { useFormat } from "@/hooks/useFormat";
import { MODULES_INCLUDED } from "@/data/home-pricing";
import { track, EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Plan card component displaying plan identity, pricing block, structured facts list, and external Sign Up link.
 *
 * @param {Object} props
 * @param {import("@/data/pricing-catalog").Plan} props.plan
 * @param {"monthly"|"annual"} [props.billing="monthly"]
 * @param {boolean} [props.showPrices=false]
 * @returns {import("react").JSX.Element}
 */
export function PlanCard({ plan, billing = "monthly", showPrices = false }) {
  const { t } = useTranslation();
  const { lng, formatNumber, formatFcfa } = useFormat();

  const isEnterprise = plan.id === "enterprise";
  const isFeatured = Boolean(plan.featured);
  const planName = t(`home:pricing.table.plans.${plan.id}`);

  const handleCtaClick = () => {
    track(EVENTS.PLAN_SELECT, { plan: plan.id, billing });
  };

  const priceAmount = billing === "annual" ? plan.annual : plan.monthly;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col justify-between rounded-lg border bg-surface-raised p-6 shadow-2xs transition-colors",
        isFeatured ? "border-accent ring-1 ring-accent" : "border-line",
      )}
    >
      <div>
        {/* Recommended badge on featured card */}
        {isFeatured && (
          <div className="mb-4">
            <Badge className="bg-selected text-selected-fg">
              {t("pricing:page.recommended")}
            </Badge>
          </div>
        )}

        {/* Plan Name & Target Audience */}
        <h3 className="font-display text-2xl font-bold text-heading">
          {planName}
        </h3>
        <p className="mt-1.5 text-sm text-fg-muted min-h-[2.5rem] leading-snug">
          {t(`home:pricing.table.for.${plan.id}`)}
        </p>

        {/* Price block */}
        <div className="mt-6 min-h-[5rem] flex flex-col justify-end border-b border-line pb-5">
          {isEnterprise ? (
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-heading">
                {t("home:pricing.table.onQuote")}
              </p>
              <p className="mt-1 text-xs text-fg-subtle">
                {t("pricing:page.customQuote")}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-heading tabular-nums">
                {formatFcfa(priceAmount, lng)}
              </p>
              <p className="mt-1 text-xs text-fg-subtle">
                {billing === "annual"
                  ? t("pricing:page.perYear")
                  : t("pricing:page.perMonth")}{" "}
                · {t("pricing:page.exclTax")}
              </p>
            </div>
          )}
        </div>

        {/* Facts specification list */}
        <dl className="mt-6 divide-y divide-line border-b border-line text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-fg-muted">
              {t("home:pricing.table.rows.modules")}
            </dt>
            <dd className="font-semibold text-heading">
              {isEnterprise
                ? t("home:pricing.table.asNeeded")
                : formatNumber(MODULES_INCLUDED[plan.id], lng)}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-fg-muted">{t("home:pricing.table.rows.users")}</dt>
            <dd className="font-semibold text-heading">
              {isEnterprise
                ? t("home:pricing.table.asNeeded")
                : formatNumber(plan.users, lng)}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-fg-muted">
              {t("home:pricing.table.rows.entities")}
            </dt>
            <dd className="font-semibold text-heading">
              {isEnterprise
                ? t("home:pricing.table.multiEntity")
                : formatNumber(plan.legalEntities, lng)}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-fg-muted">
              {t("home:pricing.table.rows.storage")}
            </dt>
            <dd className="font-semibold text-heading">
              {isEnterprise
                ? t("home:pricing.table.sizedToNeed")
                : t("pricing:page.storageValue", {
                    value: formatNumber(plan.storageGb, lng),
                  })}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-fg-muted">
              {t("home:pricing.table.rows.engine")}
            </dt>
            <dd className="font-semibold text-heading">
              {t("home:pricing.table.included")}
            </dd>
          </div>
          {/* TODO(Debass): service levels (Standard, Standard+, Priority, SLA) are still to be specified in the contractual terms. */}
          <div className="flex justify-between py-3">
            <dt className="text-fg-muted">{t("home:pricing.table.rows.level")}</dt>
            <dd className="font-semibold text-heading">
              {t(`home:pricing.table.levels.${plan.id}`)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Action CTA Button */}
      {/* TODO(Debass): the brief asks for every plan button, ENTERPRISE included, to redirect to Sign Up; ENTERPRISE is sized on quote, so the Enterprise block below also offers Talk to an Expert. */}
      {/* TODO(Debass): the document says the self-service purchase journey is not in production and buttons stay Request a demo / Talk to an expert / Simulate my price, never "Buy"; Sign Up is requested by the brief - confirm it matches the real state of login.nelias.app. */}
      <div className="mt-8 pt-2">
        <SignUpLink
          variant={isFeatured ? "primary" : "outline"}
          size="md"
          location={`pricing-${plan.id}`}
          aria-label={t("pricing:overview.signUpFor", { plan: planName })}
          onClick={handleCtaClick}
          className="w-full text-center"
        >
          {t("common:cta.signUp")}
        </SignUpLink>
      </div>
    </div>
  );
}
