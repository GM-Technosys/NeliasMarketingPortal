/**
 * Shared Tailwind classes for form controls (Input, Textarea, Select).
 * Text size stays >= 16px to prevent automatic zooming on iOS.
 * Border contrast ink-500 meets 5.1:1 non-text contrast against white.
 */
export const fieldControlClasses =
  "block w-full min-h-12 rounded-sm border border-ink-500 bg-white px-4 py-3 text-[1.0625rem] text-fg placeholder:text-fg-subtle transition-colors hover:border-navy-900 focus-visible:border-azure-500 focus-visible:outline-offset-0 aria-[invalid=true]:border-danger aria-[invalid=true]:border-2 disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-fg-subtle";
