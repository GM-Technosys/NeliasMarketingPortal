import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CtaBand } from "@/components/patterns/CtaBand";
import { CtaLink } from "@/components/common/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { EVENTS, track } from "@/lib/analytics";

// TODO(Debass): the PDF has two closing versions (Section 3: "Build the right environment…" with Book a Demo / Contact Our Team; V3 final: "A better way to manage starts here." with Configure My NELIAS / Talk to an Advisor). Section 3 is used.
export function HomeFinalCta() {
  const { t } = useTranslation();

  const actions = (
    <>
      <Link
        to="/demo"
        onClick={() => {
          track(EVENTS.CTA_CLICK, { intent: "demo", location: "home-final" });
        }}
        className={buttonStyles({ variant: "primary", size: "lg" })}
      >
        {t("cta.bookDemo")}
      </Link>
      <CtaLink
        intent="contact"
        variant="outline"
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
        tone="tint"
        title={t("home:final.title")}
        body={t("home:final.body")}
        actions={actions}
      />
    </Reveal>
  );
}
