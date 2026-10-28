import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Boxes,
  Users,
  Building2,
  HardDrive,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { buttonStyles } from "@/components/ui/button-styles";
import { features } from "@/config/features";
import { useFormat } from "@/hooks/useFormat";
import { getHomePricing, MODULES_INCLUDED } from "@/data/home-pricing";
import { EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Enhanced pricing section on the Home page.
 * Displays four plans in responsive cards with an interactive billing switcher,
 * rich specification iconography, and structured callouts.
 */
export function HomePricingSection() {
  const { t } = useTranslation();
  const { formatFcfa, formatNumber } = useFormat();
  const [billing, setBilling] = useState("monthly");

  const pricing = getHomePricing();
  const showPrices = features.pricingPublic;

  // 4 Plan cards configuration
  const planCards = [
    {
      id: "start",
      featured: false,
      name: t("home:pricing.table.plans.start"),
      audience: t("home:pricing.table.for.start"),
      price: billing === "annual" ? pricing.plans.start.annual : pricing.plans.start.monthly,
      customPrice: null,
      modules: String(MODULES_INCLUDED.start),
      users: formatNumber(pricing.plans.start.users),
      entities: formatNumber(pricing.plans.start.legalEntities),
      storage: t("pricing:page.storageValue", { value: pricing.plans.start.storageGb }),
      engine: t("home:pricing.table.included"),
      level: t("home:pricing.table.levels.start"),
      cta: t("home:hero.simulatePrice"),
      href: "https://login.nelias.app/",
      isExternal: true,
      buttonVariant: "outline",
    },
    {
      id: "business",
      featured: true,
      name: t("home:pricing.table.plans.business"),
      audience: t("home:pricing.table.for.business"),
      price: billing === "annual" ? pricing.plans.business.annual : pricing.plans.business.monthly,
      customPrice: null,
      modules: String(MODULES_INCLUDED.business),
      users: formatNumber(pricing.plans.business.users),
      entities: formatNumber(pricing.plans.business.legalEntities),
      storage: t("pricing:page.storageValue", { value: pricing.plans.business.storageGb }),
      engine: t("home:pricing.table.included"),
      level: t("home:pricing.table.levels.business"),
      cta: t("home:hero.simulatePrice"),
      href: "https://login.nelias.app/",
      isExternal: true,
      buttonVariant: "primary",
    },
    {
      id: "professional",
      featured: false,
      name: t("home:pricing.table.plans.professional"),
      audience: t("home:pricing.table.for.professional"),
      price: billing === "annual" ? pricing.plans.professional.annual : pricing.plans.professional.monthly,
      customPrice: null,
      modules: String(MODULES_INCLUDED.professional),
      users: formatNumber(pricing.plans.professional.users),
      entities: formatNumber(pricing.plans.professional.legalEntities),
      storage: t("pricing:page.storageValue", { value: pricing.plans.professional.storageGb }),
      engine: t("home:pricing.table.included"),
      level: t("home:pricing.table.levels.professional"),
      cta: t("home:hero.simulatePrice"),
      href: "https://login.nelias.app/",
      isExternal: true,
      buttonVariant: "outline",
    },
    {
      id: "enterprise",
      featured: false,
      isEnterprise: true,
      name: t("home:pricing.table.plans.enterprise"),
      audience: t("home:pricing.table.for.enterprise"),
      price: null,
      customPrice: t("home:pricing.table.onQuote"),
      modules: t("home:pricing.table.asNeeded"),
      users: t("home:pricing.table.asNeeded"),
      entities: t("home:pricing.table.multiEntity"),
      storage: t("home:pricing.table.sizedToNeed"),
      engine: t("home:pricing.table.included"),
      level: t("home:pricing.table.levels.enterprise"),
      cta: t("cta.talkToExpert"),
      href: "/contact",
      isExternal: false,
      buttonVariant: "secondary",
    },
  ];

  return (
    <Section id="pricing" tone="default" spacing="lg" aria-labelledby="pricing-heading">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="pricing-heading"
                className="font-display text-h2 font-semibold text-heading leading-tight tracking-tight"
              >
                {t("home:pricing.title")}
              </h2>
              <p className="mt-4 text-lead text-fg-muted leading-relaxed">
                {showPrices && (
                  <>
                    {t("home:pricing.introPrices")}{" "}
                  </>
                )}
                {t("home:pricing.introLocation")}
              </p>
            </div>

            {/* Billing Toggle (visible when pricing is public) */}
            {showPrices && (
              <div className="shrink-0">
                <SegmentedControl
                  label={t("pricing:page.billingLabel")}
                  value={billing}
                  onChange={(val) => setBilling(val)}
                  options={[
                    { value: "monthly", label: t("pricing:page.monthly") },
                    {
                      value: "annual",
                      label: t("pricing:page.annual"),
                      badge: (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                          -16%
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </Reveal>

        {/* 4 Plan Cards Grid */}
        <Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {planCards.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl bg-surface-raised p-6 shadow-xs transition-all duration-200 hover:shadow-card",
                  plan.featured
                    ? "border-2 border-accent ring-1 ring-accent/30"
                    : "border border-line hover:border-line-strong",
                )}
              >
                {/* Recommended Badge on featured card */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-selected text-selected-fg text-xs font-semibold px-3 py-0.5 shadow-xs">
                      {t("pricing:page.recommended")}
                    </Badge>
                  </div>
                )}

                <div>
                  {/* Plan Name & Target Audience */}
                  <div className="border-b border-line/60 pb-5">
                    <h3 className="font-display text-xl font-bold text-heading">
                      {plan.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium text-fg-muted leading-snug">
                      {plan.audience}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-5 border-b border-line/60">
                    {showPrices ? (
                      plan.price !== null ? (
                        <div>
                          <div className="font-display text-2xl sm:text-3xl font-bold text-heading tracking-tight">
                            {formatFcfa(plan.price)}
                          </div>
                          <p className="mt-1 text-xs text-fg-subtle">
                            {billing === "annual"
                              ? t("pricing:page.perYear")
                              : t("pricing:page.perMonth")}{" "}
                            · {t("pricing:page.exclTax")}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="font-display text-2xl font-bold text-heading">
                            {plan.customPrice}
                          </div>
                          <p className="mt-1 text-xs text-fg-subtle">
                            {t("pricing:page.customQuote")}
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="font-display text-lg font-semibold text-heading">
                        {t("pricing:page.priceOnRequest")}
                      </div>
                    )}
                  </div>

                  {/* Specification List */}
                  <ul className="py-5 space-y-3 text-xs sm:text-sm">
                    <li className="flex items-center gap-2.5 text-fg">
                      <Boxes className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-heading">{plan.modules}</strong>{" "}
                        {t("home:pricing.table.rows.modules")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-fg">
                      <Users className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-heading">{plan.users}</strong>{" "}
                        {t("home:pricing.table.rows.users")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-fg">
                      <Building2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-heading">{plan.entities}</strong>{" "}
                        {t("home:pricing.table.rows.entities")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-fg">
                      <HardDrive className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-heading">{plan.storage}</strong>{" "}
                        {t("home:pricing.table.rows.storage")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-fg">
                      <Sparkles className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        {t("home:pricing.table.rows.engine")}:{" "}
                        <strong className="font-semibold text-heading">{plan.engine}</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-fg">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        {t("home:pricing.table.rows.level")}:{" "}
                        <strong className="font-semibold text-heading">{plan.level}</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Plan CTA Button */}
                <div className="pt-4 mt-2">
                  {plan.isExternal ? (
                    <a
                      href={plan.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track(EVENTS.PLAN_SELECT, { plan: plan.id, billing })}
                      className={cn(
                        buttonStyles({ variant: plan.buttonVariant, size: "md" }),
                        "w-full text-center justify-center font-semibold",
                      )}
                    >
                      {plan.cta}
                    </a>
                  ) : (
                    <Link
                      to={plan.href}
                      onClick={() => track(EVENTS.PLAN_SELECT, { plan: plan.id, billing })}
                      className={cn(
                        buttonStyles({ variant: plan.buttonVariant, size: "md" }),
                        "w-full text-center justify-center font-semibold",
                      )}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bottom CTA & Legal note */}
        <Reveal>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                to="/pricing"
                onClick={() => track(EVENTS.CTA_CLICK, { location: "home-pricing" })}
                className={cn(
                  buttonStyles({ variant: "outline", size: "md" }),
                  "inline-flex items-center gap-2",
                )}
              >
                <span>{t("home:pricing.cta")}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {showPrices && (
              <p className="text-xs text-fg-subtle leading-relaxed max-w-xl">
                {t("home:pricing.legal")}
              </p>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

