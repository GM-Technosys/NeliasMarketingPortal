import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { pricingCatalog } from "@/data/pricing-catalog";
import { features } from "@/config/features";
import { track, EVENTS } from "@/lib/analytics";
import { PlansSection } from "@/sections/pricing/PlansSection";
import { CompareSection } from "@/sections/pricing/CompareSection";
import { OptionalChargesSection } from "@/sections/pricing/OptionalChargesSection";
import { PricingFaq } from "@/sections/pricing/PricingFaq";
import { PricingClosing } from "@/sections/pricing/PricingClosing";

// TODO(Debass): the PDF intro continues "Prices below are internal commercial V2 reference figures, not automatically approved for public publication." This internal note is intentionally NOT displayed.
// TODO(Debass): "Compare plans" and "Optional charges" are functional labels taken from the V3 notes ("interactive plan comparison", "separate inclusions from optional charges"); the PDF has no heading text for them.

/**
 * Pricing page displaying plans, interactive comparison table,
 * optional charges (when pricing public), FAQ, and conversion closing.
 *
 * @returns {import("react").JSX.Element}
 */
export default function PricingPage() {
  const { t } = useTranslation();
  const showPrices = features.pricingPublic;
  const [billing, setBilling] = useState("monthly");
  const hasWarnedRef = useRef(false);

  // Track page view
  useEffect(() => {
    track(EVENTS.PRICING_VIEW);
  }, []);

  // Intentional developer warning when pricing is public in DEV but catalog figures are not approved
  useEffect(() => {
    if (
      import.meta.env.DEV &&
      showPrices &&
      !pricingCatalog.approvedForPublic &&
      !hasWarnedRef.current
    ) {
      hasWarnedRef.current = true;
      console.warn(
        "[pricing] Amounts shown are internal commercial reference figures not approved for public publication.",
      );
    }
  }, [showPrices]);

  const handleBillingChange = (newBilling) => {
    setBilling(newBilling);
    track(EVENTS.BILLING_CHANGE, { billing: newBilling });
  };

  const faqTone = showPrices ? "muted" : "default";

  return (
    <>
      <Seo pageKey="pricing" />

      <PageHeader
        title={t("pricing:hero.title")}
        lead={t("pricing:hero.lead")}
        tone="tint"
        spacing="md"
        className="py-12 md:py-16 lg:py-20"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] lg:leading-[1.1] max-w-[24ch]"
        leadClassName="mt-4 md:mt-5 text-base sm:text-lg lg:text-lead leading-relaxed max-w-[50ch]"
      />

      <PlansSection
        billing={billing}
        onBillingChange={handleBillingChange}
        showPrices={showPrices}
      />

      <CompareSection showPrices={showPrices} />

      {showPrices && <OptionalChargesSection />}

      <PricingFaq tone={faqTone} />

      <PricingClosing />
    </>
  );
}
