import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Seo } from "@/components/common/Seo";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <Seo pageKey="notFound" noIndex />
        <h1 className="font-display text-h1">404</h1>
        <p className="mt-4 text-fg-muted">{t("notFound.message")}</p>
      </Container>
    </Section>
  );
}
