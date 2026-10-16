import { industryProfiles } from "@/data/home-content";

/**
 * Decorative emblem illustration for industry detail page headers.
 * Shows ribbon arcs and satellites behind the industry icon badge.
 *
 * @param {Object} props
 * @param {string} props.slug
 * @returns {import("react").JSX.Element}
 */
export function IndustryEmblem({ slug }) {
  const Icon = industryProfiles[slug]?.icon;

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border border-line bg-surface-tint mx-auto select-none"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        focusable="false"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <defs>
          <linearGradient
            id={`emblem-ribbon-${slug}`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--color-flame-500)" />
            <stop offset="45%" stopColor="var(--color-flame-400)" />
            <stop offset="100%" stopColor="var(--color-sun-300)" />
          </linearGradient>
        </defs>

        {/* Primary ribbon arc */}
        <path
          d="M 40 260 C 100 240, 150 70, 360 40"
          stroke={`url(#emblem-ribbon-${slug})`}
          strokeWidth="18"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          className="animate-ribbon-draw"
        />

        {/* Secondary ribbon arc */}
        <path
          d="M 60 60 C 180 120, 240 260, 340 240"
          stroke={`url(#emblem-ribbon-${slug})`}
          strokeWidth="10"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          style={{ animationDelay: "180ms" }}
          className="animate-ribbon-draw"
        />

        {/* Satellite 1: accent-soft */}
        <rect
          x="64"
          y="76"
          width="48"
          height="48"
          rx="12"
          fill="var(--accent-soft)"
        />

        {/* Satellite 2: surface-raised */}
        <rect
          x="288"
          y="176"
          width="48"
          height="48"
          rx="12"
          fill="var(--surface-raised)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Centred industry icon hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-selected text-selected-fg shadow-raised">
          {Icon && <Icon className="h-12 w-12" aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}
