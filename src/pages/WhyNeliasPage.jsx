import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { WhyIllustration } from "@/sections/why/WhyIllustration";
import { ChallengesSection } from "@/sections/why/ChallengesSection";
import { DifferentiatorSection } from "@/sections/why/DifferentiatorSection";

export default function WhyNeliasPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo pageKey="whyNelias" />
      <PageHeader
        title={t("why:header.title")}
        lead={t("why:header.lead")}
        media={<WhyIllustration />}
        tone="tint"
        spacing="md"
        className="py-12 md:py-16 lg:py-20"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] lg:leading-[1.1] max-w-[20ch]"
        leadClassName="mt-4 md:mt-5 text-base sm:text-lg lg:text-lead leading-relaxed max-w-[50ch]"
      />
      <ChallengesSection />
      <DifferentiatorSection />
    </>
  );
}

