import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { PreviewFrame } from "@/components/patterns/PreviewFrame";
import { ProductPreviewMock } from "./ProductPreviewMock";

export function ProductPreviewSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="preview"
      tone="default"
      spacing="lg"
      aria-labelledby="preview-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            id="preview-heading"
            title={t("home:preview.title")}
          />
        </Reveal>

        <Reveal delay={90}>
          <figure
            aria-label={t("home:preview.alt")}
            className="relative mx-auto w-full max-w-5xl pb-6 lg:pb-12"
          >
            {/* Desktop frame (85% width on lg) */}
            <div className="w-full lg:w-[85%]">
              <PreviewFrame device="desktop" illustrative={false}>
                <ProductPreviewMock device="desktop" />
              </PreviewFrame>
            </div>

            {/* Overlapping mobile frame on lg; centered below on small screens */}
            <div className="mt-8 flex justify-center lg:mt-0 lg:block lg:absolute lg:-bottom-6 lg:right-0 z-10">
              <PreviewFrame device="mobile" illustrative={false}>
                <ProductPreviewMock device="mobile" />
              </PreviewFrame>
            </div>

            {/* Figcaption with single-line illustrative badge */}
            <figcaption className="mt-6 lg:mt-14 flex justify-center">
              <Badge tone="neutral" size="md" className="whitespace-nowrap">
                {t("ui.illustrativePreview")}
              </Badge>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
