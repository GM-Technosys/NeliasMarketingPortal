import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { IndustryBreadcrumbs } from "@/sections/industries/IndustryBreadcrumbs";
import { IndustryEmblem } from "@/sections/industries/IndustryEmblem";
import { ChallengeOutcomePairs } from "@/sections/industries/ChallengeOutcomePairs";
import { CapabilityList } from "@/sections/industries/CapabilityList";
import { WalkthroughChain } from "@/sections/industries/WalkthroughChain";
import { IndustryFaq } from "@/sections/industries/IndustryFaq";
import { IndustryClosing } from "@/sections/industries/IndustryClosing";
import NotFoundPage from "@/pages/NotFoundPage";
import { industries } from "@/data/industries";

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();

  if (!slug || !industries.includes(slug)) {
    return <NotFoundPage />;
  }

  const name = t(`industries:items.${slug}.name`);
  const summary = t(`industries:items.${slug}.summary`);

  const headlineKey = `industries:items.${slug}.headline`;
  const hasHeadline = i18n.exists(headlineKey);
  // TODO(Debass): no approved benefit-led headline for this industry; the name is used as the title
  const title = hasHeadline ? t(headlineKey) : name;

  // TODO(Debass): the PDF gives no SEO copy for industry pages; the title follows the approved "Industries | NELIAS BMP" pattern and the description is the approved summary.
  const seoTitle = t("industries:detail.seoTitle", { name });

  return (
    <>
      <Seo title={seoTitle} description={summary} />
      <PageHeader
        title={title}
        lead={summary}
        tone="tint"
        spacing="md"
        className="py-12 md:py-16 lg:py-20"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] lg:leading-[1.1] max-w-[20ch]"
        leadClassName="mt-4 md:mt-5 text-base sm:text-lg lg:text-lead leading-relaxed max-w-[48ch]"
        breadcrumbs={<IndustryBreadcrumbs name={name} />}
        media={<IndustryEmblem slug={slug} />}
      />
      <ChallengeOutcomePairs slug={slug} />
      <CapabilityList slug={slug} />
      <WalkthroughChain slug={slug} />
      <IndustryFaq slug={slug} />
      <IndustryClosing
        slug={slug}
        labelKey="cta.seeMyConfiguration"
        showAll={true}
        location="industry-final"
      />
    </>
  );
}
