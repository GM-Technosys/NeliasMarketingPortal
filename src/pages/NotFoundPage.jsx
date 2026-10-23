import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/button-styles";
import { CtaLink } from "@/components/common/CtaLink";
import { Seo } from "@/components/common/Seo";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo pageKey="notFound" noIndex />
      <Section tone="tint" spacing="lg" className="py-16 md:py-24 text-center">
        <Container className="max-w-xl flex flex-col items-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">404</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-heading">
            {t("notFound.title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed">
            {t("notFound.message")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              to="/"
              className={buttonStyles({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-auto text-center",
              })}
            >
              {t("nav.home")}
            </Link>
            <CtaLink
              intent="configure"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-center"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
