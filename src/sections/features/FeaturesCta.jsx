import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "@/components/ui/button-styles";
import { track, EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * CTA button for the Features page closing strip.
 * Routes to configurator when enabled, otherwise routes to demo advisor.
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

  const destination = "/configure";
  const label = t("cta.exploreConfiguration");

  const handleClick = () => {
    track(EVENTS.CTA_CLICK, { intent: "configure", location });
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
