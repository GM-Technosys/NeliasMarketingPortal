import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Seo } from "@/components/common/Seo";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <Seo pageKey="about" />
        <h1 className="font-display text-h1">{t("nav.about")}</h1>
        <p className="mt-4 text-fg-muted">{t("devPlaceholder")}</p>
      </Container>
    </Section>
  );
}
