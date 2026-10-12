import { Info, TriangleAlert, CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

const toneConfig = {
  info: {
    classes: "bg-azure-50 border-azure-200 text-ink-800",
    iconColor: "text-azure-600",
    icon: Info,
  },
  warning: {
    classes: "bg-warning-soft border-warning/40 text-ink-800",
    iconColor: "text-warning-strong",
    icon: TriangleAlert,
  },
  danger: {
    classes: "bg-danger-soft border-danger/40 text-ink-800",
    iconColor: "text-danger-strong",
    icon: CircleAlert,
  },
  success: {
    classes: "bg-success-soft border-success/40 text-ink-800",
    iconColor: "text-success-strong",
    icon: CircleCheck,
  },
  note: {
    classes: "bg-surface-muted border-line text-ink-800",
    iconColor: "text-ink-600",
    icon: Info,
  },
};

/**
 * Accessible alert and notification banner.
 *
 * @param {Object} props
 * @param {"info"|"warning"|"danger"|"success"|"note"} [props.tone="info"]
 * @param {string} [props.title]
 * @param {"off"|"polite"|"assertive"} [props.live="off"]
 * @param {string} [props.className]
 * @param {import("react").ReactNode} props.children
 */
export function Alert({ tone = "info", title, live = "off", className, children, ...rest }) {
  const config = toneConfig[tone] || toneConfig.info;
  const IconComponent = config.icon;

  const role = live === "assertive" ? "alert" : live === "polite" ? "status" : undefined;

  return (
    <div
      role={role}
      className={cn(
        "flex items-start gap-3.5 rounded-lg border p-4 transition-colors",
        config.classes,
        className,
      )}
      {...rest}
    >
      <IconComponent
        className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconColor)}
        aria-hidden="true"
      />
      <div className="flex-1">
        {title && <h4 className="mb-1 leading-snug font-semibold text-navy-900">{title}</h4>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
