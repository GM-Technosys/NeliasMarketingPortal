import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Layers,
  Sparkles,
  Sliders,
  ShieldCheck,
  ArrowLeftRight,
  Building2,
  Shield,
  Pill,
  Hammer,
  Laptop,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/button-styles";
import { features } from "@/config/features";
import { useFormat } from "@/hooks/useFormat";
import { getHomePricing } from "@/data/home-pricing";

// TODO(Debass): the packs are not sold yet; the document gives no per-pack page, so the packs are described here only.

const PACK_IDS = ["immo", "courtage", "pharma", "chantier", "services"];

const packIcons = {
  immo: Building2,
  courtage: Shield,
  pharma: Pill,
  chantier: Hammer,
  services: Laptop,
};

const highlightIcons = {
  tailored: Sliders,
  zeroFee: ShieldCheck,
  flexible: ArrowLeftRight,
};

const HIGHLIGHT_KEYS = ["tailored", "zeroFee", "flexible"];

/**
 * Sector configurations and Industry+ Packs section on Features and Industries pages.
 *
 * @param {Object} props
 * @param {string} [props.tone="default"]
 * @param {boolean} [props.showIndustriesLink=true]
 * @returns {import("react").JSX.Element}
 */
export function FeaturesSectors({ tone = "default", showIndustriesLink = true }) {
  const { t } = useTranslation();
  const { lng, formatFcfa } = useFormat();
  const { extensions } = getHomePricing();

  return (
    <Section id="sectors" tone={tone} spacing="lg" aria-labelledby="sectors-heading">
      <Container>
        <Reveal>
          {/* 1. Sector configurations included (Elevated reassurance card) */}
          <div className="rounded-3xl border border-line bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-xs relative">
            {/* Header with Badges & Metadata */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap mb-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-tint border border-accent-line px-3 py-1 text-xs font-semibold text-accent">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("pricing:sectors.badge")}
                  </span>
                  <Badge className="bg-surface-tint text-accent border border-accent/25 text-xs font-semibold px-2.5 py-0.5">
                    {t("home:pricing.table.included")}
                  </Badge>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted border border-line px-3 py-1 text-xs font-medium text-fg-subtle">
                    <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {t("pricing:sectors.supportedSectors")}
                  </span>
                </div>

                <h2
                  id="sectors-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-heading"
                >
                  {t("pricing:sectors.title")}
                </h2>
                <p className="mt-3.5 text-base sm:text-lg text-fg-muted leading-relaxed">
                  {t("pricing:sectors.body")}
                </p>
              </div>

              {/* Reassurance Callout Box */}
              <div className="shrink-0 self-start lg:self-center">
                <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-surface-muted/60 p-4 sm:px-5 sm:py-4 shadow-2xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-tint text-accent border border-accent-line">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold text-accent">
                      {t("home:pricing.table.included")}
                    </div>
                    <div className="text-sm font-semibold text-heading mt-0.5">
                      {t("pricing:sectors.highlights.zeroFee.title")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Key Pillar highlights (Distinct, tactile cards) */}
            <div className="mt-8 pt-8 border-t border-line/70 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHT_KEYS.map((key, idx) => {
                const Icon = highlightIcons[key];
                return (
                  <div
                    key={key}
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-surface-muted/40 p-5 sm:p-6 transition-all duration-200 hover:border-accent-line hover:bg-surface-muted hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        {Icon && (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-tint text-accent border border-accent-line transition-transform duration-200 group-hover:scale-105">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                        )}
                        <span className="text-xs font-semibold text-accent/80 bg-surface-tint/60 px-2.5 py-0.5 rounded-md border border-accent/15">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-heading tracking-tight">
                        {t(`pricing:sectors.highlights.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                        {t(`pricing:sectors.highlights.${key}.text`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal>
          {/* 2. Industry+ Packs */}
          <div className="mt-14 sm:mt-18">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h3
                  id="packs-heading"
                  className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-heading sm:whitespace-nowrap"
                >
                  {t("pricing:packs.title")}
                </h3>
                <p className="mt-2 text-base text-fg-muted leading-relaxed">
                  {t("pricing:packs.intro")}
                </p>
              </div>

              {features.pricingPublic && (
                <div className="shrink-0 self-start lg:self-end">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-surface-raised border border-line px-4 py-2 text-xs sm:text-sm font-semibold text-heading shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {t("pricing:packs.price", {
                      amount: formatFcfa(extensions.industryPack, lng),
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 5 Pack Cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PACK_IDS.map((id) => {
                const Icon = packIcons[id];
                return (
                  <div
                    key={id}
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-surface-raised p-6 shadow-2xs transition-all duration-200 hover:border-accent-line hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-tint border border-accent-line px-2.5 py-1 text-xs font-semibold text-accent">
                          {Icon && <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
                          {t(`pricing:packs.items.${id}.sector`)}
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle bg-surface-muted px-2 py-0.5 rounded border border-line">
                          {t("pricing:packs.head.pack")}
                        </span>
                      </div>

                      <h4 className="font-display text-lg font-bold text-heading group-hover:text-accent-strong transition-colors">
                        {t(`pricing:packs.items.${id}.name`)}
                      </h4>

                      <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                        {t(`pricing:packs.items.${id}.functions`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {showIndustriesLink && (
              <div className="mt-8">
                <Link
                  to="/industries"
                  className={buttonStyles({ variant: "outline", size: "md" })}
                >
                  {t("features:extras.exploreIndustries")}
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
