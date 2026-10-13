import { useTranslation } from "react-i18next";
import { ScanSearch, Blocks, TrendingUp } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

const pillars = [
  { key: "understand", icon: ScanSearch },
  { key: "compose", icon: Blocks },
  { key: "evolve", icon: TrendingUp },
];

/**
 * Three pillars of the NELIAS approach: Understand, Compose, Evolve.
 */
export function HomePillars() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* 2px connector line behind icons from centre of 1st icon to centre of last icon (lg and up) */}
      <div
        className="hidden lg:block absolute h-0.5 bg-ink-200 z-0 pointer-events-none"
        style={{
          left: "calc((100% - 5rem) / 6)",
          right: "calc((100% - 5rem) / 6)",
          top: "24px",
        }}
        role="presentation"
      />

      <ul
        aria-label={t("home:approach.title")}
        className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-10 relative z-10"
      >
        {pillars.map(({ key, icon }) => (
          <li key={key} className="flex flex-col items-center text-center">
            <div className="mb-6">
              <IconBadge
                icon={icon}
                tone="azure"
                size="lg"
                className="ring-8 ring-surface relative z-10"
              />
            </div>
            <h3 className="font-display text-h3 font-semibold text-navy-900 mb-3 text-center">
              {t(`home:approach.pillars.${key}.title`)}
            </h3>
            <p className="text-base text-fg-muted leading-relaxed text-center max-w-sm">
              {t(`home:approach.pillars.${key}.text`)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
