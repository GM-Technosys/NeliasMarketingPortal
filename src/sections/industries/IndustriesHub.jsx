import { industries } from "@/data/industries";
import { industryProfiles } from "@/data/home-content";

/**
 * Decorative 3x3 hub illustration for Industries landing page.
 * Displays 8 industry icons around a central brand-ribbon hub.
 *
 * @returns {import("react").JSX.Element}
 */
export function IndustriesHub() {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div
      aria-hidden="true"
      className="mx-auto grid aspect-square w-full max-w-xs grid-cols-3 gap-3 sm:max-w-sm select-none"
    >
      {cells.map((cellIndex) => {
        if (cellIndex === 4) {
          return (
            <div
              key="hub"
              className="grid place-items-center rounded-xl bg-selected"
            >
              <svg
                viewBox="0 0 56 56"
                fill="none"
                aria-hidden="true"
                focusable="false"
                className="h-14 w-14"
              >
                <defs>
                  <linearGradient
                    id="hub-ribbon-grad"
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
                <path
                  d="M 12 42 C 16 22, 36 14, 44 22"
                  fill="none"
                  stroke="url(#hub-ribbon-grad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  className="animate-ribbon-draw"
                />
              </svg>
            </div>
          );
        }

        const industryIndex = cellIndex < 4 ? cellIndex : cellIndex - 1;
        const slug = industries[industryIndex];
        const Icon = industryProfiles[slug]?.icon;

        return (
          <div
            key={slug || cellIndex}
            style={{ animationDelay: `${cellIndex * 80}ms` }}
            className="animate-tile-in grid place-items-center rounded-lg border border-line bg-surface-raised text-link"
          >
            {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
          </div>
        );
      })}
    </div>
  );
}
