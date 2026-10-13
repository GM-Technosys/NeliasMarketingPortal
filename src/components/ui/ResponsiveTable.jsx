import { cn } from "@/lib/cn";

/**
 * Horizontally scrollable data table container with keyboard accessibility and sticky row headers.
 *
 * @param {Object} props
 * @param {string} [props.caption]
 * @param {boolean} [props.captionHidden=false]
 * @param {string} [props.label="Data table"] - Region accessible label
 * @param {string} [props.className]
 * @param {import("react").ReactNode} props.children
 */
export function ResponsiveTable({
  caption,
  captionHidden = false,
  label = "Data table",
  className,
  children,
  ...rest
}) {
  return (
    <div
      role="region"
      tabIndex={0}
      aria-label={label}
      className={cn(
        "relative overflow-x-auto rounded-lg border border-line focus-visible:outline-2 focus-visible:outline-focus",
        "[&_thead_th]:bg-surface-muted [&_thead_th]:px-4 [&_thead_th]:py-3 [&_thead_th]:text-sm [&_thead_th]:font-semibold [&_thead_th]:text-heading",
        "[&_tbody_td]:border-t [&_tbody_td]:border-line [&_tbody_td]:px-4 [&_tbody_td]:py-3",
        "[&_tbody_td]:border-t [&_tbody_th]:border-line [&_tbody_th]:px-4 [&_tbody_th]:py-3",
        "[&_tbody_th[scope=row]]:sticky [&_tbody_th[scope=row]]:left-0 [&_tbody_th[scope=row]]:bg-surface-raised [&_tbody_th[scope=row]]:font-semibold",
        className,
      )}
      {...rest}
    >
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm md:text-base">
        {caption && (
          <caption
            className={cn("p-3 text-left font-semibold text-heading", captionHidden && "sr-only")}
          >
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
}
