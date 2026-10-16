import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import { Field } from "@/components/ui/forms/Field";
import { Input } from "@/components/ui/forms/Input";

/**
 * Search input pattern for filtering resources articles and FAQs.
 *
 * @param {Object} props
 * @param {string} props.query - Current search query
 * @param {(val: string) => void} props.onChange - Query change handler
 * @param {() => void} props.onClear - Clear search handler
 * @param {number} props.totalCount - Combined matching items count
 */
export function ResourceSearch({ query, onChange, onClear, totalCount }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && query) {
      e.preventDefault();
      onClear();
    }
  };

  const handleClearClick = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div role="search" className="w-full max-w-xl">
      <Field label={t("resources:search.label")}>
        {(controlProps) => (
          <div className="relative flex items-center">
            <Search
              className="pointer-events-none absolute left-3.5 h-5 w-5 text-fg-subtle"
              aria-hidden="true"
            />
            <Input
              {...controlProps}
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              maxLength={80}
              value={query}
              onChange={(e) => onChange(e.target.value.slice(0, 80))}
              onKeyDown={handleKeyDown}
              className="pl-11 pr-11"
            />
            {Boolean(query) && (
              <button
                type="button"
                onClick={handleClearClick}
                aria-label={t("resources:search.clear")}
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm text-fg-muted transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </Field>

      <p aria-live="polite" className="mt-2 text-sm font-semibold text-fg-muted">
        {query ? t("resources:search.results", { count: totalCount }) : ""}
      </p>
    </div>
  );
}
