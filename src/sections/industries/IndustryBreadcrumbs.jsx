import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumb navigation for industry detail pages.
 *
 * @param {Object} props
 * @param {string} props.name - Display name of the active industry
 * @returns {import("react").JSX.Element}
 */
export function IndustryBreadcrumbs({ name }) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("industries:detail.breadcrumb")}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        <li>
          <Link
            to="/industries"
            className="inline-flex min-h-[44px] items-center py-2 transition-colors hover:text-link hover:underline"
          >
            {t("nav.industries")}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <ChevronRight className="h-4 w-4 shrink-0 text-fg-subtle" />
        </li>
        <li
          aria-current="page"
          className="flex min-h-[44px] items-center py-2 font-medium text-heading"
        >
          <span>{name}</span>
        </li>
      </ol>
    </nav>
  );
}
