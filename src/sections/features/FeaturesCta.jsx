import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "@/components/ui/button-styles";
import { track, EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { features } from "@/config/features";
import { industries } from "@/data/industries";

/**
 * CTA button for the Features page closing strip.
 * Routes to configurator when enabled (carrying active industry filter), otherwise routes to demo advisor.
 *
 * @param {Object} props
 * @param {"md"|"lg"} [props.size="md"]
 * @param {string} [props.location="features-final"]
 * @param {string} [props.className]
 * @returns {import("react").JSX.Element}
 */
export function FeaturesCta({
  size = "md",
  location = "features-final",
  className,
}) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const rawIndustry = searchParams.get("industry");
  const isValidIndustry = Boolean(rawIndustry && industries.includes(rawIndustry));

  let destination = "/configure";
  let label = "";
  let intent = "configure";

  if (features.configurator) {
    destination = isValidIndustry ? `/configure?industry=${rawIndustry}` : "/configure";
    label = t("cta.exploreConfiguration");
    intent = "configure";
  } else {
    destination = isValidIndustry ? `/demo?industry=${rawIndustry}` : "/demo";
    label = t("cta.talkToAdvisor");
    intent = "demo";
  }

  const handleClick = () => {
    track(EVENTS.CTA_CLICK, { intent, location, industry: isValidIndustry ? rawIndustry : undefined });
  };

  return (
    <Link
      to={destination}
      onClick={handleClick}
      className={buttonStyles({
        variant: "primary",
        size,
        className: cn("w-full sm:w-auto", className),
      })}
    >
      {label}
    </Link>
  );
}
