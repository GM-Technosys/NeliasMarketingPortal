import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "@/components/ui/button-styles";
import { track, EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Industry-specific CTA button.
 * Routes to configurator when enabled, otherwise routes to demo advisor.
 *
 * @param {Object} props
 * @param {string} props.labelKey - i18n key for the button label when configurator is active
 * @param {string} [props.location] - Tracking location tag
 * @param {"md"|"lg"} [props.size="md"]
 * @param {"primary"|"secondary"|"outline"|"ghost"|"onDark"} [props.variant="primary"]
 * @param {string} [props.className]
 * @returns {import("react").JSX.Element}
 */
export function IndustryCta({
  labelKey = "cta.findConfiguration",
  location,
  size = "md",
  variant = "primary",
  className,
  to = "/configure",
}) {
  const { t } = useTranslation();

  const destination = to;
  const label = t(labelKey);

  const handleClick = () => {
    track(EVENTS.CTA_CLICK, { intent: "configure", location });
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
