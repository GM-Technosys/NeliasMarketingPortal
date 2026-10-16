/**
 * Decorative illustration for a step in the How It Works journey timeline.
 * Rendered inside a bounded surface with role-based inline SVG shapes.
 * Contains no text, numbers, or orange accents.
 *
 * @param {Object} props
 * @param {1 | 2 | 3 | 4 | 5 | 6} props.variant
 * @returns {import("react").JSX.Element}
 */
export function StepVisual({ variant }) {
  return (
    <div className="rounded-xl border border-line bg-surface-tint p-4">
      <svg
        viewBox="0 0 320 200"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="h-auto w-full"
      >
        {variant === 1 && (
          <g>
            {/* Row 1: Profile form input holding two chips */}
            <rect
              x="20"
              y="16"
              width="70"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />
            <rect
              x="20"
              y="30"
              width="280"
              height="32"
              rx="6"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <rect
              x="28"
              y="37"
              width="56"
              height="18"
              rx="9"
              fill="var(--accent-soft)"
            />
            <rect
              x="90"
              y="37"
              width="64"
              height="18"
              rx="9"
              fill="var(--accent-soft)"
            />

            {/* Row 2: Two side-by-side inputs */}
            <rect
              x="20"
              y="74"
              width="50"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />
            <rect
              x="20"
              y="88"
              width="134"
              height="32"
              rx="6"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <rect
              x="30"
              y="100"
              width="60"
              height="8"
              rx="4"
              fill="var(--line)"
            />

            <rect
              x="166"
              y="74"
              width="50"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />
            <rect
              x="166"
              y="88"
              width="134"
              height="32"
              rx="6"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <rect
              x="176"
              y="100"
              width="70"
              height="8"
              rx="4"
              fill="var(--line)"
            />

            {/* Row 3: Four circles, two accent, two line */}
            <circle cx="36" cy="154" r="12" fill="var(--accent)" />
            <circle cx="76" cy="154" r="12" fill="var(--accent)" />
            <circle cx="116" cy="154" r="12" fill="var(--line)" />
            <circle cx="156" cy="154" r="12" fill="var(--line)" />
            <rect
              x="180"
              y="150"
              width="110"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />
          </g>
        )}

        {variant === 2 && (
          <g>
            {/* Left to Hub connecting lines with dots */}
            <line
              x1="90"
              y1="40"
              x2="124"
              y2="76"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="90" cy="40" r="3" fill="var(--line-strong)" />
            <circle cx="124" cy="76" r="3" fill="var(--line-strong)" />

            <line
              x1="90"
              y1="100"
              x2="124"
              y2="100"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="90" cy="100" r="3" fill="var(--line-strong)" />
            <circle cx="124" cy="100" r="3" fill="var(--line-strong)" />

            <line
              x1="90"
              y1="160"
              x2="124"
              y2="124"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="90" cy="160" r="3" fill="var(--line-strong)" />
            <circle cx="124" cy="124" r="3" fill="var(--line-strong)" />

            {/* Hub to Right connecting lines with dots */}
            <line
              x1="196"
              y1="76"
              x2="230"
              y2="40"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="196" cy="76" r="3" fill="var(--line-strong)" />
            <circle cx="230" cy="40" r="3" fill="var(--line-strong)" />

            <line
              x1="196"
              y1="100"
              x2="230"
              y2="100"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="196" cy="100" r="3" fill="var(--line-strong)" />
            <circle cx="230" cy="100" r="3" fill="var(--line-strong)" />

            <line
              x1="196"
              y1="124"
              x2="230"
              y2="160"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="196" cy="124" r="3" fill="var(--line-strong)" />
            <circle cx="230" cy="160" r="3" fill="var(--line-strong)" />

            {/* Left 3 blocks */}
            <rect
              x="20"
              y="24"
              width="70"
              height="32"
              rx="6"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <rect
              x="20"
              y="84"
              width="70"
              height="32"
              rx="6"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <rect
              x="20"
              y="144"
              width="70"
              height="32"
              rx="6"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />

            {/* Central hub */}
            <rect
              x="124"
              y="64"
              width="72"
              height="72"
              rx="16"
              fill="var(--selected)"
            />
            <rect
              x="144"
              y="82"
              width="32"
              height="6"
              rx="3"
              fill="var(--surface-raised)"
            />
            <rect
              x="140"
              y="97"
              width="40"
              height="6"
              rx="3"
              fill="var(--surface-raised)"
            />
            <rect
              x="146"
              y="112"
              width="28"
              height="6"
              rx="3"
              fill="var(--surface-raised)"
            />

            {/* Right 3 blocks */}
            <rect
              x="230"
              y="24"
              width="70"
              height="32"
              rx="6"
              fill="var(--accent)"
            />
            <rect
              x="230"
              y="84"
              width="70"
              height="32"
              rx="6"
              fill="var(--accent-soft)"
            />
            <rect
              x="230"
              y="144"
              width="70"
              height="32"
              rx="6"
              fill="var(--accent)"
            />
          </g>
        )}

        {variant === 3 && (
          <g>
            {/* Recommendation Plan Card */}
            <rect
              x="60"
              y="20"
              width="200"
              height="160"
              rx="14"
              fill="var(--surface-raised)"
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Header bar */}
            <path
              d="M 60 34 A 14 14 0 0 1 74 20 L 246 20 A 14 14 0 0 1 260 34 L 260 52 L 60 52 Z"
              fill="var(--selected)"
            />
            <rect
              x="80"
              y="32"
              width="60"
              height="8"
              rx="4"
              fill="var(--surface-raised)"
            />

            {/* Row 1 */}
            <circle cx="84" cy="76" r="8" fill="var(--accent)" />
            <path
              d="M 80 76 L 83 79 L 88 73"
              stroke="var(--surface-raised)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect
              x="102"
              y="72"
              width="130"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />

            {/* Row 2 */}
            <circle cx="84" cy="100" r="8" fill="var(--accent)" />
            <path
              d="M 80 100 L 83 103 L 88 97"
              stroke="var(--surface-raised)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect
              x="102"
              y="96"
              width="115"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />

            {/* Row 3 */}
            <circle cx="84" cy="124" r="8" fill="var(--accent)" />
            <path
              d="M 80 124 L 83 127 L 88 121"
              stroke="var(--surface-raised)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect
              x="102"
              y="120"
              width="125"
              height="8"
              rx="4"
              fill="var(--line-strong)"
            />

            {/* Dashed outline chips */}
            <rect
              x="80"
              y="146"
              width="64"
              height="20"
              rx="10"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
            />
            <rect
              x="152"
              y="146"
              width="76"
              height="20"
              rx="10"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
            />
          </g>
        )}

        {variant === 4 && (
          <g>
            {/* Price Card Frame */}
            <rect
              x="28"
              y="16"
              width="264"
              height="168"
              rx="12"
              fill="var(--surface-raised)"
              stroke="var(--line)"
              strokeWidth="1"
            />

            {/* Toggle at top right */}
            <rect
              x="46"
              y="34"
              width="80"
              height="10"
              rx="5"
              fill="var(--line-strong)"
            />
            <rect
              x="236"
              y="28"
              width="44"
              height="22"
              rx="11"
              fill="var(--line)"
            />
            <circle cx="267" cy="39" r="8" fill="var(--surface-raised)" />

            {/* Row 1 */}
            <rect
              x="46"
              y="68"
              width="90"
              height="9"
              rx="4.5"
              fill="var(--line-strong)"
            />
            <rect
              x="220"
              y="68"
              width="60"
              height="9"
              rx="4.5"
              fill="var(--line-strong)"
            />

            {/* Row 2 */}
            <rect
              x="46"
              y="94"
              width="110"
              height="9"
              rx="4.5"
              fill="var(--line-strong)"
            />
            <rect
              x="235"
              y="94"
              width="45"
              height="9"
              rx="4.5"
              fill="var(--line-strong)"
            />

            {/* Row 3 */}
            <rect
              x="46"
              y="120"
              width="80"
              height="9"
              rx="4.5"
              fill="var(--line-strong)"
            />
            <rect
              x="230"
              y="120"
              width="50"
              height="9"
              rx="4.5"
              fill="var(--line-strong)"
            />

            {/* Divider */}
            <line
              x1="46"
              y1="144"
              x2="280"
              y2="144"
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Total row */}
            <rect
              x="46"
              y="156"
              width="65"
              height="14"
              rx="4"
              fill="var(--selected)"
            />
            <rect
              x="200"
              y="156"
              width="80"
              height="14"
              rx="4"
              fill="var(--link)"
            />
          </g>
        )}

        {variant === 5 && (
          <g>
            {/* Payment card */}
            <rect
              x="20"
              y="45"
              width="140"
              height="90"
              rx="10"
              fill="var(--surface-raised)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <rect
              x="20"
              y="65"
              width="140"
              height="18"
              fill="var(--selected)"
            />
            <rect
              x="34"
              y="95"
              width="24"
              height="18"
              rx="4"
              fill="var(--line)"
            />
            <rect
              x="68"
              y="101"
              width="56"
              height="6"
              rx="3"
              fill="var(--line-strong)"
            />

            {/* Connector line with end dots */}
            <line
              x1="172"
              y1="90"
              x2="204"
              y2="90"
              stroke="var(--line-strong)"
              strokeWidth="2"
            />
            <circle cx="172" cy="90" r="3" fill="var(--line-strong)" />
            <circle cx="204" cy="90" r="3" fill="var(--line-strong)" />

            {/* Success activation circle */}
            <circle cx="254" cy="90" r="42" fill="var(--accent-soft)" />
            <circle cx="254" cy="90" r="26" fill="var(--accent)" />
            <path
              d="M 246 90 L 252 96 L 264 84"
              stroke="var(--surface-raised)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        )}

        {variant === 6 && (
          <g>
            {/* Address pill */}
            <rect
              x="50"
              y="18"
              width="220"
              height="28"
              rx="14"
              fill="var(--surface-raised)"
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <circle cx="68" cy="32" r="3" fill="var(--line)" />
            <circle cx="78" cy="32" r="3" fill="var(--line)" />
            <circle cx="88" cy="32" r="3" fill="var(--line)" />
            <rect
              x="104"
              y="27"
              width="146"
              height="10"
              rx="5"
              fill="var(--line-strong)"
            />

            {/* Three tiles */}
            <rect
              x="36"
              y="60"
              width="72"
              height="42"
              rx="8"
              fill="var(--accent-soft)"
            />
            <rect
              x="52"
              y="77"
              width="40"
              height="8"
              rx="4"
              fill="var(--accent)"
            />

            <rect
              x="124"
              y="60"
              width="72"
              height="42"
              rx="8"
              fill="var(--accent-soft)"
            />
            <rect
              x="140"
              y="77"
              width="40"
              height="8"
              rx="4"
              fill="var(--accent)"
            />

            <rect
              x="212"
              y="60"
              width="72"
              height="42"
              rx="8"
              fill="var(--accent-soft)"
            />
            <rect
              x="228"
              y="77"
              width="40"
              height="8"
              rx="4"
              fill="var(--accent)"
            />

            {/* Baseline and five ascending bars */}
            <line
              x1="40"
              y1="184"
              x2="280"
              y2="184"
              stroke="var(--line)"
              strokeWidth="2"
            />
            <rect
              x="58"
              y="162"
              width="24"
              height="22"
              rx="4"
              fill="var(--accent)"
            />
            <rect
              x="102"
              y="150"
              width="24"
              height="34"
              rx="4"
              fill="var(--accent)"
            />
            <rect
              x="146"
              y="136"
              width="24"
              height="48"
              rx="4"
              fill="var(--accent)"
            />
            <rect
              x="190"
              y="120"
              width="24"
              height="64"
              rx="4"
              fill="var(--accent)"
            />
            <rect
              x="234"
              y="100"
              width="24"
              height="84"
              rx="4"
              fill="var(--selected)"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
