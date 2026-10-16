import { useTranslation } from "react-i18next";
import { Section, Container, Reveal, SectionHeading, Accordion } from "@/components/ui";

// TODO(Debass): confirm the FAQ belongs on the Resources page, and align the "Where will my data be hosted?" answer ("being planned… subject to contractual confirmation") with the definitive hosting statements in the Terms of Use, article 10.

/**
 * FAQ accordion section for the Resources page.
 *
 * @param {Object} props
 * @param {string[]} props.faqKeys - List of visible FAQ item keys
 * @param {string} [props.query=""] - Current search query to reset accordion state
 */
export function ResourcesFaq({ faqKeys = [], query = "" }) {
  const { t } = useTranslation();

  if (!faqKeys || faqKeys.length === 0) {
    return null;
  }

  const items = faqKeys.map((key) => ({
    id: key,
    title: t(`faq:items.${key}.q`),
    content: <p>{t(`faq:items.${key}.a`)}</p>,
  }));

  return (
    <Section tone="muted" spacing="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <SectionHeading title={t("resources:faq.title")} className="mb-8" />
            <Accordion
              key={query}
              items={items}
              headingLevel={3}
              type="single"
              defaultOpen={[]}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
