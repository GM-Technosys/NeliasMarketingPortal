import { useState, useRef, useEffect, useId } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * WAI-ARIA compliant accessible tabs with keyboard arrow roving activation.
 * Supports horizontal (default) and vertical sidebar layouts.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, icon?: import("react").ComponentType, content: import("react").ReactNode }>} props.items
 * @param {string} [props.value]
 * @param {(value: string) => void} [props.onValueChange]
 * @param {string} [props.defaultValue]
 * @param {"underline"|"pill"} [props.variant="underline"]
 * @param {"horizontal"|"vertical"} [props.orientation="horizontal"]
 * @param {boolean} [props.selectOnHover=false] - Activate tab on hover (desktop/web mode)
 * @param {string} [props.label] - Accessible name for the tablist
 * @param {string} [props.idPrefix]
 * @param {string} [props.className]
 */
export function Tabs({
  items = [],
  value,
  onValueChange,
  defaultValue,
  variant = "underline",
  orientation = "horizontal",
  selectOnHover = false,
  label,
  idPrefix: explicitPrefix,
  className,
}) {
  const { t } = useTranslation();
  const resolvedLabel = label || t("ui.tabs");
  const generatedPrefix = useId();
  const idPrefix = explicitPrefix || generatedPrefix;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || items[0]?.id || "");
  const activeValue = isControlled ? value : internalValue;
  const activeIndex = items.findIndex((item) => item.id === activeValue);

  const tabRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  const selectTab = (id) => {
    if (!isControlled) {
      setInternalValue(id);
    }
    onValueChange?.(id);
  };

  useEffect(() => {
    // Never auto-scroll on initial mount or hard refresh
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (activeIndex >= 0 && tabRefs.current[activeIndex] && scrollContainerRef.current) {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

      const container = scrollContainerRef.current;
      const tab = tabRefs.current[activeIndex];
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      // Only scroll horizontally inside the container, NEVER scroll the window
      if (tabRect.left < containerRect.left) {
        container.scrollBy({
          left: tabRect.left - containerRect.left - 16,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      } else if (tabRect.right > containerRect.right) {
        container.scrollBy({
          left: tabRect.right - containerRect.right + 16,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      }
    }
  }, [activeIndex]);

  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    const isVertical = orientation === "vertical";
    const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
    const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

    if (e.key === nextKey) {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === prevKey) {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      const nextItem = items[nextIndex];
      if (nextItem) {
        selectTab(nextItem.id);
        tabRefs.current[nextIndex]?.focus();
      }
    }
  };

  const selectedItem = items.find((item) => item.id === activeValue);
  const activeTabId = `${idPrefix}-tab-${activeValue}`;
  const activePanelId = `${idPrefix}-panel-${activeValue}`;

  // Vertical 30% sidebar + 70% content layout
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "grid w-full min-w-0 max-w-full grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8",
          className,
        )}
      >
        {/* Left vertical tablist column (30-35% on lg) */}
        <div className="w-full lg:col-span-4">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={resolvedLabel}
            className="flex flex-col gap-1.5 rounded-xl border border-line bg-surface p-2 sm:p-2.5 shadow-2xs max-h-[460px] lg:max-h-none overflow-y-auto"
          >
            {items.map(({ id, label: tabLabel, icon: IconComponent }, index) => {
              const isActive = id === activeValue;
              const tabId = `${idPrefix}-tab-${id}`;
              const panelId = `${idPrefix}-panel-${id}`;

              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={tabId}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(id)}
                  onMouseEnter={() => {
                    if (selectOnHover) selectTab(id);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={cn(
                    "group flex min-h-12 w-full cursor-pointer items-center justify-between rounded-lg px-3.5 py-3 text-left text-[15px] font-semibold transition-all outline-none focus-visible:outline-2 focus-visible:outline-focus",
                    isActive
                      ? "bg-selected text-selected-fg shadow-xs"
                      : "text-fg-strong hover:bg-surface-sunken hover:text-heading",
                  )}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {IconComponent && (
                      <IconComponent
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-selected-fg"
                            : "text-fg-subtle group-hover:text-link",
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span className="truncate">{tabLabel}</span>
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all",
                      isActive
                        ? "text-selected-fg opacity-90"
                        : "text-fg-subtle opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5",
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right tabpanel column (65-70% on lg) */}
        <div className="w-full lg:col-span-8">
          {selectedItem && (
            <div
              role="tabpanel"
              id={activePanelId}
              aria-labelledby={activeTabId}
              tabIndex={0}
              className="w-full h-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {selectedItem.content}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full min-w-0 max-w-full flex-col", className)}>
      {/* Scrollable Tablist */}
      <div
        ref={scrollContainerRef}
        className="w-full min-w-0 max-w-full overflow-x-auto scrollbar-none py-1"
      >
        <div
          role="tablist"
          aria-label={resolvedLabel}
          className={cn(
            "flex snap-x items-center min-w-max",
            variant === "underline"
              ? "w-full gap-2 border-b border-line"
              : "inline-flex gap-1 rounded-md bg-surface-sunken p-1",
          )}
        >
          {items.map(({ id, label: tabLabel, icon: IconComponent }, index) => {
            const isActive = id === activeValue;
            const tabId = `${idPrefix}-tab-${id}`;
            const panelId = `${idPrefix}-panel-${id}`;

            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={tabId}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(id)}
                onMouseEnter={() => {
                  if (selectOnHover) selectTab(id);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 cursor-pointer snap-start items-center gap-2 px-4 text-base font-semibold whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-focus",
                  variant === "underline" && [
                    "relative py-3",
                    isActive
                      ? "text-heading after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent"
                      : "text-fg-muted hover:text-heading",
                  ],
                  variant === "pill" && [
                    "rounded-md py-2",
                    isActive
                      ? "bg-selected text-selected-fg shadow-xs"
                      : "text-fg-strong hover:bg-line/70 hover:text-heading",
                  ],
                )}
              >
                {IconComponent && <IconComponent className="h-4 w-4 shrink-0" aria-hidden="true" />}
                <span>{tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tabpanel */}
      {selectedItem && (
        <div
          role="tabpanel"
          id={activePanelId}
          aria-labelledby={activeTabId}
          tabIndex={0}
          className="pt-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {selectedItem.content}
        </div>
      )}
    </div>
  );
}
