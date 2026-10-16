import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { defaultFaqKeys, industryFaqExtras } from "@/data/industry-content";

/**
 * Frequently asked questions section for industry detail pages.
 *
 * @param {Object} props
 * @param {string} props.slug
 * @returns {import("react").JSX.Element}
 */
export function IndustryFaq({ slug }) {
  const { t } = useTranslation();
  const extraKeys = industryFaqExtras[slug] || [];
  const faqKeys = [...defaultFaqKeys, ...extraKeys];

  const items = faqKeys.map((key) => ({
    id: key,
    title: t(`faq:items.${key}.q`),
    content: <p>{t(`faq:items.${key}.a`)}</p>,
  }));

  return (
    <Section tone="muted" spacing="lg">
      <Container>
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <SectionHeading as="h2" align="center" title={t("industries:detail.faqTitle")} />
            <Accordion items={items} type="single" headingLevel={3} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
