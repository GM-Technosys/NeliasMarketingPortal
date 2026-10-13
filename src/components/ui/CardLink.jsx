import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Clickable card with stretched title link.
 * Entire card is clickable; hover outlines in azure-500 without transform lift.
 *
 * @param {Object} props
 * @param {string} props.to
 * @param {string} props.title
 * @param {import("react").ElementType} [props.headingLevel=3]
 * @param {import("react").ComponentType} [props.icon]
 * @param {string} [props.className]
 * @param {import("react").ReactNode} props.children
 */
export function CardLink({
  to,
  title,
  headingLevel = 3,
  icon: IconComponent,
  className,
  children,
  ...rest
}) {
  const HeadingTag = `h${headingLevel}`;
  const isExternal = typeof to === "string" && !to.startsWith("/");

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-lg border border-line bg-surface p-6 transition-colors",
        "hover:border-azure-500",
        "has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-focus",
        className,
      )}
      {...rest}
    >
      {IconComponent && (
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-azure-50 text-azure-700">
          <IconComponent className="h-5 w-5" aria-hidden="true" />
        </span>
      )}

      <HeadingTag className="font-display text-lg font-semibold text-navy-900 transition-colors group-hover:text-azure-700 md:text-xl flex items-center justify-between gap-2">
        {isExternal ? (
          <a
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none group-hover:underline after:absolute after:inset-0"
          >
            {title}
          </a>
        ) : (
          <Link to={to} className="outline-none group-hover:underline after:absolute after:inset-0">
            {title}
          </Link>
        )}
        <ArrowUpRight className="h-4 w-4 shrink-0 text-link transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </HeadingTag>

      {children && (
        <div className="mt-2 text-sm leading-relaxed text-fg-muted md:text-base">{children}</div>
      )}
    </div>
  );
}
