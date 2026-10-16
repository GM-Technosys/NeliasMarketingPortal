import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Panel, IconBadge, AvailabilityBadge } from "@/components/ui";
import { AVAILABILITY } from "@/data/feature-states";
import { cn } from "@/lib/cn";

/**
 * Article card component for the resources directory.
 * Supports featured variant and interactive stretched-link when published.
 *
 * @param {Object} props
 * @param {{ id: string, icon: import("react").ComponentType<{ className?: string }>, state: string, path?: string }} props.article
 * @param {boolean} [props.featured=false]
 */
export function ArticleCard({ article, featured = false }) {
  const { t } = useTranslation();
  const title = t(`resources:articles.items.${article.id}.title`);
  const summary = t(`resources:articles.items.${article.id}.summary`);

  const isInteractive = article.state === AVAILABILITY.AVAILABLE && Boolean(article.path);

  const titleNode = isInteractive ? (
    <Link
      to={article.path}
      className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      {title}
    </Link>
  ) : (
    title
  );

  const statusRow = (
    <div className="mt-5 flex items-center justify-between gap-4">
      {article.state !== AVAILABILITY.AVAILABLE && (
        <AvailabilityBadge state={article.state} />
      )}
      {isInteractive && (
        <span className="inline-flex items-center text-sm font-semibold text-link underline-offset-4 group-hover:underline">
          {t("resources:articles.readArticle")}
        </span>
      )}
    </div>
  );

  if (featured) {
    return (
      <Panel
        tone="tint"
        padding="lg"
        className={cn(
          "w-full transition-colors",
          isInteractive && "relative group hover:border-accent",
        )}
      >
        <div className="md:flex md:items-start md:gap-8">
          <div className="mb-6 shrink-0 md:mb-0">
            <IconBadge icon={article.icon} size="lg" tone="azure" />
          </div>
          <div className="flex-1">
            <h3
              className={cn(
                "font-display text-h3 font-semibold text-heading [overflow-wrap:anywhere]",
                isInteractive && "group-hover:text-link",
              )}
            >
              {titleNode}
            </h3>
            <p className="mt-3 text-lead leading-relaxed text-fg-muted [overflow-wrap:anywhere]">
              {summary}
            </p>
            {statusRow}
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-between rounded-lg border border-line bg-surface-raised p-6 transition-colors",
        isInteractive && "relative group hover:border-accent",
      )}
    >
      <div>
        <div className="mb-4">
          <IconBadge icon={article.icon} size="lg" tone="azure" />
        </div>
        <h3
          className={cn(
            "font-display text-xl font-semibold text-heading [overflow-wrap:anywhere]",
            isInteractive && "group-hover:text-link",
          )}
        >
          {titleNode}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-fg-muted [overflow-wrap:anywhere]">
          {summary}
        </p>
      </div>
      {statusRow}
    </div>
  );
}
