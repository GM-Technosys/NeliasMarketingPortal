import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { HowHeroVisual } from "@/sections/how/HowHeroVisual";
import { JourneyTimeline } from "@/sections/how/JourneyTimeline";
import { ExampleSection } from "@/sections/how/ExampleSection";

export default function HowItWorksPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo pageKey="howItWorks" />
      <PageHeader
        title={t("how:header.title")}
        lead={t("how:header.lead")}
        media={<HowHeroVisual />}
        tone="tint"
        spacing="md"
        className="py-12 md:py-16 lg:py-20"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] lg:leading-[1.1] max-w-[20ch]"
        leadClassName="mt-4 md:mt-5 text-base sm:text-lg lg:text-lead leading-relaxed max-w-[48ch]"
        accent={false}
      />
      <JourneyTimeline />
      <ExampleSection />
    </>
  );
}

