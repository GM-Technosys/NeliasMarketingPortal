import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

// TODO(Debass): confirm which approved FAQ answers belong on the Pricing page.

const FAQ_KEYS = [
  "multipleOffices",
  "addLater",
  "moreThanOneCompany",
  "tryNelias",
];

/**
 * Frequently asked questions accordion section for Pricing page.
 *
 * @param {Object} props
 * @param {"default"|"muted"} [props.tone="default"]
 * @returns {import("react").JSX.Element}
 */
export function PricingFaq({ tone = "default" }) {
  const { t } = useTranslation();

  const faqItems = FAQ_KEYS.map((key) => ({
    id: key,
    title: t(`faq:items.${key}.q`),
    content: <p>{t(`faq:items.${key}.a`)}</p>,
  }));

  return (
    <Section tone={tone} spacing="lg">
      <Container>
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <SectionHeading align="center" title={t("pricing:page.faqTitle")} />
            <Accordion items={faqItems} type="single" headingLevel={3} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
