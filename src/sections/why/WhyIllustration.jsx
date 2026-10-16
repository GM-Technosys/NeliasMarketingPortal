/**
 * Decorative illustration for the Why NELIAS page header.
 * Depicts a software catalogue (left grid) adapting into a business environment (right hub).
 * The animated flame-to-sun ribbon is the page's single bold device.
 *
 * @returns {import("react").JSX.Element}
 */
export function WhyIllustration() {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full max-w-md lg:max-w-none"
    >
      <defs>
        <linearGradient id="why-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-flame-500)" />
          <stop offset="45%" stopColor="var(--color-flame-400)" />
          <stop offset="100%" stopColor="var(--color-sun-300)" />
        </linearGradient>
      </defs>

      {/* Satellite connector lines (rendered behind rectangles) */}
      <line x1="360" y1="160" x2="350" y2="44" stroke="var(--line-strong)" strokeWidth="2" />
      <line x1="360" y1="160" x2="432" y2="76" stroke="var(--line-strong)" strokeWidth="2" />
      <line x1="360" y1="160" x2="438" y2="192" stroke="var(--line-strong)" strokeWidth="2" />
      <line x1="360" y1="160" x2="338" y2="270" stroke="var(--line-strong)" strokeWidth="2" />

      {/* Left cluster: 3x3 catalogue grid */}
      {/* Row 0 */}
      <rect
        x="24"
        y="76"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect
        x="84"
        y="76"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect
        x="144"
        y="76"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      {/* Row 1 */}
      <rect
        x="24"
        y="136"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect
        x="84"
        y="136"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect
        x="144"
        y="136"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      {/* Row 2 */}
      <rect
        x="24"
        y="196"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect
        x="84"
        y="196"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <rect
        x="144"
        y="196"
        width="48"
        height="48"
        rx="10"
        fill="var(--surface-sunken)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />

      {/* Right cluster: central hub and satellites */}
      <rect x="312" y="112" width="96" height="96" rx="20" fill="var(--selected)" />

      {/* Satellite 1: top, accent fill */}
      <rect x="326" y="20" width="48" height="48" rx="10" fill="var(--accent)" />
      {/* Satellite 2: top-right, accent-soft fill */}
      <rect x="408" y="52" width="48" height="48" rx="10" fill="var(--accent-soft)" />
      {/* Satellite 3: right, accent fill */}
      <rect x="414" y="168" width="48" height="48" rx="10" fill="var(--accent)" />
      {/* Satellite 4: bottom, accent-soft fill */}
      <rect x="314" y="246" width="48" height="48" rx="10" fill="var(--accent-soft)" />

      {/* Bridge: ribbon connecting grid to hub */}
      <path
        d="M 192 160 C 236 100, 268 220, 312 160"
        fill="none"
        stroke="url(#why-ribbon-gradient)"
        strokeWidth="14"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        className="animate-ribbon-draw"
      />
    </svg>
  );
}
