import { useParams } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Seo } from "@/components/common/Seo";
import { useTranslation } from "react-i18next";

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <Seo pageKey="industries" />
        <h1 className="font-display text-h1">{slug}</h1>
        <p className="mt-4 text-fg-muted">{t("devPlaceholder")}</p>
      </Container>
    </Section>
  );
}
