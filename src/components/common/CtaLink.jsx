import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import { features } from "@/config/features";
import { EVENTS, track } from "@/lib/analytics";

/**
 * Intent-to-destination mapping.
 * When configurator is off, "configure" falls back to demo with a softer label.
 */
function resolveIntent(intent, t) {
  switch (intent) {
    case "configure":
      if (features.configurator) {
        return { to: "/configure", label: t("cta.configure") };
      }
      return { to: "/demo", label: t("cta.talkToAdvisor") };
    case "demo":
      return { to: "/demo", label: t("cta.bookDemo") };
    case "contact":
      return { to: "/contact", label: t("cta.contactTeam") };
    default:
      return { to: "/", label: "" };
  }
}

/**
 * CTA link styled as a button. Routes based on intent and feature flags.
 *
 * @param {Object} props
 * @param {"configure"|"demo"|"contact"} [props.intent]
 * @param {string} [props.to] - Override destination
 * @param {string} [props.label] - Override label (children take precedence)
 * @param {"primary"|"secondary"|"outline"|"ghost"|"onDark"} [props.variant="primary"]
 * @param {"md"|"lg"} [props.size="md"]
 * @param {string} [props.className]
 * @param {string} [props.location] - Tracking location (e.g. "header", "mobile-menu", "sticky", "footer")
 * @param {import("react").MouseEventHandler<HTMLAnchorElement>} [props.onClick]
 * @param {import("react").ReactNode} [props.children]
 */
export function CtaLink({
  intent,
  to,
  label,
  variant = "primary",
  size = "md",
  className,
  location,
  onClick,
  children,
  ...rest
}) {
  const { t } = useTranslation();
  const resolved = intent ? resolveIntent(intent, t) : { to: to || "/", label: label || "" };
  const destination = to || resolved.to;
  const displayLabel = children || label || resolved.label;

  function handleClick(e) {
    track(EVENTS.CTA_CLICK, { intent, location });
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <Link
      to={destination}
      className={cn(buttonStyles({ variant, size }), className)}
      onClick={handleClick}
      {...rest}
    >
      {displayLabel}
    </Link>
  );
}
