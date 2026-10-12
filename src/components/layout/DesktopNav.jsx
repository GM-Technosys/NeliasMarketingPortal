import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { mainNav } from "@/config/navigation";
import { EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Desktop navigation bar for xl screens and up.
 */
export function DesktopNav() {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("header.mainNavLabel")} className="hidden items-center gap-1 xl:flex">
      {mainNav.map(({ key, to }) => (
        <NavLink
          key={key}
          to={to}
          end
          onClick={() => track(EVENTS.NAV_CLICK, { key })}
          className={({ isActive }) =>
            cn(
              "relative px-2.5 py-2 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors",
              isActive
                ? "text-navy-900 after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:bg-azure-500"
                : "text-ink-700 hover:text-azure-600",
            )
          }
        >
          {t(`nav.${key}`)}
        </NavLink>
      ))}
    </nav>
  );
}
