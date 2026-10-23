import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "@/components/ui/button-styles";
import { track, EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { features } from "@/config/features";
import { industries } from "@/data/industries";

/**
 * Industry-specific CTA button.
 * Routes to configurator with sector preselected when enabled, otherwise routes to demo advisor.
 *
 * @param {Object} props
 * @param {string} [props.slug] - Industry sector slug
 * @param {string} [props.labelKey="cta.findConfiguration"] - i18n key for the button label when configurator is active
 * @param {string} [props.location] - Tracking location tag
 * @param {"md"|"lg"} [props.size="md"]
 * @param {"primary"|"secondary"|"outline"|"ghost"|"onDark"} [props.variant="primary"]
 * @param {string} [props.className]
 * @param {string} [props.to] - Optional override destination
 * @returns {import("react").JSX.Element}
 */
export function IndustryCta({
  slug,
  labelKey = "cta.findConfiguration",
  location,
  size = "md",
  variant = "primary",
  className,
  to,
}) {
  const { t } = useTranslation();
  const isValidSlug = Boolean(slug && industries.includes(slug));

  let destination = to;
  let label = "";
  let intent = "configure";

  if (features.configurator) {
    destination = destination || (isValidSlug ? `/configure?industry=${slug}` : "/configure");
    label = t(labelKey);
    intent = "configure";
  } else {
    destination = isValidSlug ? `/demo?industry=${slug}` : "/demo";
    label = t("cta.talkToAdvisor");
    intent = "demo";
  }

  const handleClick = () => {
    track(EVENTS.CTA_CLICK, { intent, location, industry: isValidSlug ? slug : undefined });
  };

  return (
    <Link
      to={destination}
      onClick={handleClick}
      className={buttonStyles({
        variant: variant ?? "primary",
        size,
        className: cn("w-full sm:w-auto", className),
      })}
    >
      {label}
    </Link>
  );
}
