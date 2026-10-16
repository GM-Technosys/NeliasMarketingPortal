import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { IndustriesHub } from "@/sections/industries/IndustriesHub";
import { IndustryRows } from "@/sections/industries/IndustryRows";
import { IndustryClosing } from "@/sections/industries/IndustryClosing";

export default function IndustriesPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo pageKey="industries" />
      <PageHeader
        title={t("industries:landing.title")}
        lead={t("industries:landing.lead")}
        tone="tint"
        spacing="md"
        className="py-12 md:py-16 lg:py-20"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] lg:leading-[1.1] max-w-[20ch]"
        leadClassName="mt-4 md:mt-5 text-base sm:text-lg lg:text-lead leading-relaxed max-w-[48ch]"
        media={<IndustriesHub />}
      />
      <IndustryRows />
      <IndustryClosing
        labelKey="cta.findConfiguration"
        showAll={false}
        location="industries-landing-final"
      />
    </>
  );
}
