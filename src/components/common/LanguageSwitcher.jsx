import { useTranslation } from "react-i18next";
import { features } from "@/config/features";
import { EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Language switcher toggle. Hidden unless features.frenchEnabled is true.
 *
 * @param {Object} props
 * @param {"default"|"onDark"} [props.variant="default"]
 * @param {string} [props.className]
 */
export function LanguageSwitcher({ variant = "default", className }) {
  const { t, i18n } = useTranslation();

  if (!features.frenchEnabled) {
    return null;
  }

  const currentLang = i18n.resolvedLanguage || i18n.language || "en";

  const handleChange = (to) => {
    if (to === currentLang) return;
    i18n.changeLanguage(to);
    track(EVENTS.LANGUAGE_CHANGE, { to });
  };

  const isDark = variant === "onDark";

  const activeClasses = isDark
    ? "bg-white text-navy-950 font-bold shadow-xs"
    : "bg-navy-900 text-white font-bold shadow-xs";

  const inactiveClasses = isDark
    ? "text-fg-inverse-muted hover:text-white hover:bg-white/10"
    : "text-ink-600 hover:text-navy-900 hover:bg-ink-200/60";

  return (
    <div
      role="group"
      aria-label={t("a11y.language")}
      className={cn(
        "inline-flex items-center rounded-md border p-0.5 text-xs font-semibold",
        isDark ? "border-white/15 bg-white/5" : "border-line bg-ink-50",
        className,
      )}
    >
      <button
        type="button"
        aria-label={t("lang.en")}
        aria-pressed={currentLang === "en"}
        onClick={() => handleChange("en")}
        className={cn(
          "inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded px-2.5 py-1 transition-colors",
          currentLang === "en" ? activeClasses : inactiveClasses,
        )}
      >
        {t("lang.enShort")}
      </button>
      <button
        type="button"
        lang="fr"
        aria-label={t("lang.fr")}
        aria-pressed={currentLang === "fr"}
        onClick={() => handleChange("fr")}
        className={cn(
          "inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded px-2.5 py-1 transition-colors",
          currentLang === "fr" ? activeClasses : inactiveClasses,
        )}
      >
        {t("lang.frShort")}
      </button>
    </div>
  );
}
