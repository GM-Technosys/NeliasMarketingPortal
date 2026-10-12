import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Inline text link with external target handling and accessibility announcements.
 *
 * @param {Object} props
 * @param {string} props.to - Route path or URL
 * @param {boolean} [props.external=false]
 * @param {string} [props.className]
 * @param {import("react").ReactNode} props.children
 */
export function TextLink({ to, external = false, className, children, ...rest }) {
  const { t } = useTranslation();
  const isInternal = typeof to === "string" && to.startsWith("/") && !external;
  const linkClasses = cn(
    "text-link font-medium underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors inline-flex items-center gap-1",
    className,
  );

  if (isInternal) {
    return (
      <Link to={to} className={linkClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={linkClasses}
      {...rest}
    >
      <span>{children}</span>
      {external && (
        <>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="sr-only"> {t("ui.externalLink")}</span>
        </>
      )}
    </a>
  );
}
