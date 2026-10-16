import { Building2, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

/**
 * Decorative illustration for the How It Works hero section.
 * Visualises the journey from a business profile to a configured NELIAS environment.
 * Uses role tokens, subtle micro-elements, and the signature brand ribbon.
 */
export function HowHeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] sm:aspect-[16/11] w-full max-w-lg lg:max-w-none mx-auto select-none"
    >
      {/* Background SVG Ribbon connecting the stages */}
      <svg
        viewBox="0 0 460 320"
        fill="none"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <defs>
          <linearGradient
            id="how-ribbon-grad"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="var(--color-flame-500)" />
            <stop offset="50%" stopColor="var(--color-flame-400)" />
            <stop offset="100%" stopColor="var(--color-sun-300)" />
          </linearGradient>
        </defs>

        {/* Brand ribbon connecting path */}
        <path
          d="M 120 160 C 200 80, 260 240, 340 160"
          stroke="url(#how-ribbon-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          className="animate-ribbon-draw"
        />

        {/* Secondary subtle azure track */}
        <path
          d="M 100 210 C 180 270, 280 90, 360 120"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="6 6"
          opacity="0.6"
        />
      </svg>

      {/* Floating Card 1: Business Profile (Top Left) */}
      <div className="absolute top-2 left-2 sm:left-4 z-10 w-52 sm:w-60 rounded-xl border border-line bg-surface-raised p-4 shadow-card">
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-line">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-tint text-accent">
            <Building2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="h-2.5 w-20 rounded bg-heading/80 mb-1" />
            <div className="h-2 w-14 rounded bg-fg-muted/40" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 rounded bg-fg-muted/40" />
            <span className="h-4 px-2 rounded-full bg-accent-soft text-[10px] font-semibold text-accent-strong flex items-center">
              Retail
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-2 w-12 rounded bg-fg-muted/40" />
            <span className="h-4 px-2 rounded-full bg-surface-sunken text-[10px] font-semibold text-fg-muted flex items-center">
              15 Users
            </span>
          </div>
          <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-accent">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            <span>Sector Engine</span>
          </div>
        </div>
      </div>

      {/* Central Connector badge */}
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-raised border border-line shadow-card text-accent">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </div>

      {/* Floating Card 2: Configured Environment (Bottom Right) */}
      <div className="absolute bottom-2 right-2 sm:right-4 z-10 w-56 sm:w-64 rounded-xl border border-line bg-surface-raised p-4 shadow-card">
        {/* Browser header preview */}
        <div className="flex items-center gap-2 pb-2.5 border-b border-line">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </div>
          <div className="flex-1 truncate rounded bg-surface-sunken px-2 py-0.5 text-[10px] font-mono text-fg-muted">
            app.nelias.app
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span className="text-xs font-semibold text-heading">Ready</span>
            </div>
            <span className="h-4 px-2 rounded-full bg-surface-tint text-[10px] font-semibold text-accent-strong flex items-center">
              Active
            </span>
          </div>
          {/* Mini workspace module preview bars */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="h-7 rounded-md bg-surface-tint border border-accent-line/60 flex items-center justify-center">
              <div className="h-2 w-7 rounded bg-accent/70" />
            </div>
            <div className="h-7 rounded-md bg-surface-tint border border-accent-line/60 flex items-center justify-center">
              <div className="h-2 w-7 rounded bg-accent/70" />
            </div>
            <div className="h-7 rounded-md bg-surface-tint border border-accent-line/60 flex items-center justify-center">
              <div className="h-2 w-7 rounded bg-accent/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
