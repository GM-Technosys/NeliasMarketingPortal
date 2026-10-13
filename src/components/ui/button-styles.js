import { cn } from "@/lib/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full rounded-tr-none font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const variantStyles = {
  primary: "bg-cta text-cta-fg hover:bg-cta-hover focus-visible:outline-cta",
  secondary: "bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-navy-900",
  outline:
    "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:outline-navy-900",
  ghost: "text-link hover:bg-azure-50 focus-visible:outline-link",
  onDark: "border border-white/40 text-white hover:bg-white/10 focus-visible:outline-sun-300",
  white: "bg-white text-navy-950 hover:bg-azure-50 shadow-sm focus-visible:outline-white",
  azure: "bg-azure-500 text-white hover:bg-azure-600 focus-visible:outline-azure-400",
};

const sizeStyles = {
  md: "min-h-11 px-5 text-base",
  lg: "min-h-12 px-6 text-lg",
  icon: "min-h-11 min-w-11 p-0 rounded-md",
};

const disabledStyles = "opacity-50 pointer-events-none";

/**
 * Generate button class string from variant and size.
 * Kept in its own file to avoid the react-refresh/only-export-components lint warning.
 *
 * @param {Object} [options]
 * @param {"primary"|"secondary"|"outline"|"ghost"|"onDark"|"white"|"azure"} [options.variant="primary"]
 * @param {"md"|"lg"|"icon"} [options.size="md"]
 * @param {boolean} [options.disabled=false]
 * @param {boolean} [options.fullWidth=false]
 * @param {string} [options.className]
 * @returns {string}
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className,
} = {}) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    disabled && disabledStyles,
    className,
  );
}
