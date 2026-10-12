import { CtaLink } from "@/components/common/CtaLink";
import { features } from "@/config/features";
import { cn } from "@/lib/cn";

/**
 * Header and Mobile Menu CTA buttons.
 * Renders dual CTAs if configurator is active; otherwise a single demo CTA.
 *
 * @param {Object} props
 * @param {string} [props.location="header"]
 * @param {"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.stacked=false]
 * @param {boolean} [props.showSecondary=true]
 * @param {boolean} [props.onDark=false]
 * @param {string} [props.className]
 */
export function HeaderCtas({
  location = "header",
  size = "md",
  stacked = false,
  showSecondary = true,
  onDark = false,
  className,
}) {
  const isConfiguratorEnabled = features.configurator;

  return (
    <div className={cn("flex items-center gap-3", stacked && "w-full flex-col", className)}>
      {isConfiguratorEnabled ? (
        <>
          <CtaLink
            intent="configure"
            size={size}
            location={location}
            className={stacked ? "w-full" : undefined}
          />
          {showSecondary && (
            <CtaLink
              intent="demo"
              variant={onDark ? "onDark" : "outline"}
              size={size}
              location={location}
              className={stacked ? "w-full" : undefined}
            />
          )}
        </>
      ) : (
        <CtaLink
          intent="demo"
          size={size}
          location={location}
          className={stacked ? "w-full" : undefined}
        />
      )}
    </div>
  );
}
