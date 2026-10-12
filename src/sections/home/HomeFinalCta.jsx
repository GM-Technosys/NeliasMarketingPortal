import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CtaBand } from "@/components/patterns/CtaBand";
import { CtaLink } from "@/components/common/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { features } from "@/config/features";

export function HomeFinalCta() {
  const { t } = useTranslation();

  const actions = features.configurator ? (
    <>
      <CtaLink intent="configure" size="lg" location="home-final" />
      <Link
        to="/demo"
        className={buttonStyles({ variant: "onDark", size: "lg" })}
      >
        {t("cta.talkToAdvisor")}
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/demo"
        className={buttonStyles({ variant: "primary", size: "lg" })}
      >
        {t("cta.talkToAdvisor")}
      </Link>
      <CtaLink
        intent="contact"
        variant="onDark"
        size="lg"
        location="home-final"
      >
        {t("cta.contactTeam")}
      </CtaLink>
    </>
  );

  return (
    <Reveal>
      <CtaBand
        id="final-cta"
        title={t("home:final.title")}
        body={t("home:final.body")}
        actions={actions}
      />
    </Reveal>
  );
}
