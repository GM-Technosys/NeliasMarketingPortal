import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/button-styles";
import { useFormat } from "@/hooks/useFormat";
import { track, EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";

// TODO(Debass): the PDF gives no destination for "Talk to an Expert"; /contact is used.
// TODO(Debass): no approved wording exists for the hidden-price state; "Pricing on request" is a functional placeholder.
// TODO(Debass): the inclusions split the approved plan sentences into list items (the word "included" is carried by the "Included" label).

/**
 * Plan card component displaying details, pricing, specs, inclusions, and CTA.
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

  // CTA button variant, label, and destination
  let ctaLabel;
  let ctaDestination;
  let ctaVariant;

  if (isEnterprise) {
    ctaLabel = t("pricing:plans.enterprise.cta");
    ctaDestination = "/contact";
    ctaVariant = "onDark";
  } else {
    ctaVariant = isFeatured ? "primary" : "outline";
    ctaLabel = t(`pricing:plans.${plan.id}.cta`);
    ctaDestination = `/configure?plan=${plan.id}&billing=${billing}`;
  }

  const handleCtaClick = () => {
    track(EVENTS.PLAN_SELECT, { plan: plan.id, billing });
  };

  const includedItems = t(`pricing:plans.${plan.id}.included`, {
    returnObjects: true,
  });

  const priceAmount = billing === "annual" ? plan.annual : plan.monthly;

  return (
    <div
      data-tone={isEnterprise ? "inverse" : undefined}
      className={cn(
        "flex w-full flex-col rounded-lg p-6 transition-colors",
        isEnterprise
          ? "bg-brand-deep text-fg-inverse"
          : cn(
              "border border-line bg-surface-raised",
              isFeatured && "border-accent ring-1 ring-accent",
            ),
      )}
    >
      {/* Recommended badge header */}
      {isFeatured && (
        <div className="mb-4">
          <Badge className="bg-selected text-selected-fg">
            {t("pricing:page.recommended")}
          </Badge>
        </div>
      )}

      {/* Plan Name & Tagline */}
      <h3
        className={cn(
          "font-display text-h3 font-bold",
          isEnterprise ? "text-white" : "text-heading",
        )}
      >
        {t(`pricing:plans.${plan.id}.name`)}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm md:text-base",
          isEnterprise ? "text-fg-inverse-muted" : "text-fg-muted",
        )}
      >
        {t(`pricing:plans.${plan.id}.tagline`)}
      </p>

      {/* Price block */}
      <div className="mt-6 min-h-[5.5rem] flex flex-col justify-end">
        {isEnterprise ? (
          <p className="font-display text-3xl font-semibold text-white">
            {t("pricing:page.customQuote")}
          </p>
        ) : showPrices ? (
          <div>
            <p className="font-display text-3xl font-semibold text-heading">
              {formatFcfa(priceAmount, lng)}
            </p>
            <p className="mt-1 text-sm text-fg-muted">
              {billing === "annual"
                ? t("pricing:page.perYear")
                : t("pricing:page.perMonth")}{" "}
              · {t("pricing:page.exclTax")}
            </p>
          </div>
        ) : (
          <p className="font-display text-2xl font-semibold text-heading">
            {t("pricing:page.priceOnRequest")}
          </p>
        )}
      </div>

      {/* Specs dl */}
      <dl
        className={cn(
          "mt-6 divide-y border-y text-sm",
          isEnterprise
            ? "divide-white/15 border-white/15"
            : "divide-line border-line",
        )}
      >
        <div className="flex justify-between py-3">
          <dt className={isEnterprise ? "text-fg-inverse-muted" : "text-fg-muted"}>
            {t("pricing:page.modulesLabel")}
          </dt>
          <dd
            className={cn(
              "font-semibold",
              isEnterprise ? "text-white" : "text-heading",
            )}
          >
            {isEnterprise
              ? t("pricing:plans.enterprise.modules")
              : formatNumber(plan.includedModules, lng)}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className={isEnterprise ? "text-fg-inverse-muted" : "text-fg-muted"}>
            {t("pricing:page.usersLabel")}
          </dt>
          <dd
            className={cn(
              "font-semibold",
              isEnterprise ? "text-white" : "text-heading",
            )}
          >
            {isEnterprise
              ? t("pricing:plans.enterprise.users")
              : formatNumber(plan.users, lng)}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className={isEnterprise ? "text-fg-inverse-muted" : "text-fg-muted"}>
            {t("pricing:page.entitiesLabel")}
          </dt>
          <dd
            className={cn(
              "font-semibold",
              isEnterprise ? "text-white" : "text-heading",
            )}
          >
            {isEnterprise
              ? t("pricing:plans.enterprise.entities")
              : formatNumber(plan.legalEntities, lng)}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className={isEnterprise ? "text-fg-inverse-muted" : "text-fg-muted"}>
            {t("pricing:page.storageLabel")}
          </dt>
          <dd
            className={cn(
              "font-semibold",
              isEnterprise ? "text-white" : "text-heading",
            )}
          >
            {isEnterprise
              ? t("pricing:plans.enterprise.storage")
              : t("pricing:page.storageValue", {
                  value: formatNumber(plan.storageGb, lng),
                })}
          </dd>
        </div>
      </dl>

      {/* Included items */}
      <div className="mt-6">
        <p
          className={cn(
            "text-sm font-semibold",
            isEnterprise ? "text-white" : "text-heading",
          )}
        >
          {t("pricing:page.includedLabel")}
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {Array.isArray(includedItems) &&
            includedItems.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <Check
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    !isEnterprise && "text-link",
                  )}
                  style={
                    isEnterprise
                      ? { color: "var(--color-sun-300)" }
                      : undefined
                  }
                  aria-hidden="true"
                />
                <span className={isEnterprise ? "text-fg-inverse" : "text-fg"}>
                  {item}
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-8">
        <Link
          to={ctaDestination}
          onClick={handleCtaClick}
          className={buttonStyles({
            variant: ctaVariant,
            size: "md",
            className:
              "w-full text-center leading-tight whitespace-normal py-2.5",
          })}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
