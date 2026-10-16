import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { CapabilityMosaic } from "@/sections/features/CapabilityMosaic";
import { FeatureFilterList } from "@/sections/features/FeatureFilterList";
import { FeaturesClosing } from "@/sections/features/FeaturesClosing";

/**
 * Features page presenting platform capability areas and industry filtering.
 *
 * @returns {import("react").JSX.Element}
 */
export default function FeaturesPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo pageKey="features" />
      <PageHeader
        title={t("features:hero.title")}
        lead={t("features:hero.lead")}
        tone="tint"
        spacing="md"
        className="py-12 md:py-16 lg:py-20"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] lg:leading-[1.1] max-w-[20ch]"
        leadClassName="mt-4 md:mt-5 text-base sm:text-lg lg:text-lead leading-relaxed max-w-[48ch]"
        media={<CapabilityMosaic />}
      />
      <FeatureFilterList />
      <FeaturesClosing />
    </>
  );
}
