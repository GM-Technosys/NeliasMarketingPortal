import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { cn } from "@/lib/cn";

/**
 * Interactive capability card button modal use-case dialog.
 * Note: Uses <span> for title instead of <h3> to maintain valid HTML within <button>.
 */
export const CapabilityCard = forwardRef(function CapabilityCard(
  { id, icon, onClick, className },
  ref,
) {
  const { t } = useTranslation();

  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      onClick={onClick}
      className={cn(
        "group flex min-h-[120px] flex-col justify-between rounded-lg border border-line bg-surface-raised p-5 text-left transition-colors cursor-pointer",
        "hover:border-accent shadow-2xs",
        "focus-visible:outline-2 focus-visible:outline-focus",
        className,
      )}
    > 
      <div className="flex items-start justify-between gap-3">
        <IconBadge icon={icon} tone="azure" size="md" />
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-link group-hover:text-accent-strong transition-colors">
          <span>{t("home:capabilities.openLabel")}</span>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      
      <div className="mt-4">
        <span className="font-display text-xl font-semibold text-heading group-hover:text-accent-strong transition-colors leading-snug">
          {t(`home:capabilities.items.${id}.title`)}
        </span>
      </div>
    </button>
  );
});
