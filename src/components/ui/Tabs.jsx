import { useState, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/cn";

/**
 * WAI-ARIA compliant accessible tabs with keyboard arrow roving activation.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, icon?: import("react").ComponentType, content: import("react").ReactNode }>} props.items
 * @param {string} [props.value]
 * @param {(value: string) => void} [props.onValueChange]
 * @param {string} [props.defaultValue]
 * @param {"underline"|"pill"} [props.variant="underline"]
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
  label = "Sections",
  idPrefix: explicitPrefix,
  className,
}) {
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

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
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

  return (
    <div className={cn("flex w-full min-w-0 max-w-full flex-col", className)}>
      {/* Scrollable Tablist */}
      <div
        ref={scrollContainerRef}
        className="w-full min-w-0 max-w-full overflow-x-auto scrollbar-none py-1"
      >
        <div
          role="tablist"
          aria-label={label}
          className={cn(
            "flex snap-x items-center min-w-max",
            variant === "underline"
              ? "w-full gap-2 border-b border-line"
              : "inline-flex gap-1 rounded-md bg-ink-100 p-1",
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
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "inline-flex min-h-11 shrink-0 cursor-pointer snap-start items-center gap-2 px-4 text-base font-semibold whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-focus",
                variant === "underline" && [
                  "relative py-3",
                  isActive
                    ? "text-navy-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-azure-500"
                    : "text-ink-600 hover:text-navy-900",
                ],
                variant === "pill" && [
                  "rounded-md py-2",
                  isActive
                    ? "bg-navy-900 text-white shadow-xs"
                    : "text-ink-700 hover:bg-ink-200/70 hover:text-navy-900",
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
