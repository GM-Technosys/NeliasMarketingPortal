import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Seo } from "@/components/common/Seo";
import { features } from "@/config/features";

export default function ConfigurePage() {
  const { t } = useTranslation();

  if (!features.configurator) {
    return <Navigate to="/demo" replace />;
  }

  return (
    <Section>
      <Container>
        <Seo pageKey="fallback" />
        <h1 className="font-display text-h1">{t("cta.configure")}</h1>
        <p className="mt-4 text-fg-muted">{t("devPlaceholder")}</p>
      </Container>
    </Section>
  );
}
