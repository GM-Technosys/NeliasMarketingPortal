import { CtaLink } from "./CtaLink";
import { features } from "@/config/features";

/**
 * Primary CTA helper component for marketing pages.
 * Resolves to "configure" if configurator is enabled, otherwise "demo" (Book a Demo).
 *
 * @param {Object} props
 * @param {string} [props.location]
 * @param {"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.onDark=false]
 * @param {string} [props.className]
 */
export function PrimaryCta({
  location,
  size = "md",
  onDark = false,
  className,
}) {
  const intent = features.configurator ? "configure" : "demo";
  const variant = onDark ? "onDark" : "primary";

  return (
    <CtaLink
      intent={intent}
      variant={variant}
      size={size}
      location={location}
      className={className}
    />
  );
}
