# NELIAS Marketing Portal

Public marketing website for **NELIAS**, a Business Management Platform by Debass Technologies (nelias.app). Target audience: owners and managers of small and mid-size businesses, primarily in Côte d'Ivoire and wider Africa.

## Commands

```bash
npm run dev         # Start Vite dev server
npm run lint        # Run oxlint
npm run build       # Production build
npm run check:copy  # Scan for banned pre-launch phrases
npm run verify      # lint + build + check:copy
npm run format      # Prettier
```

## Stack and conventions

- **JavaScript** (ES modules + JSX). No TypeScript — no `.ts`, `.tsx`, `tsconfig.json`, `@types` packages, or `typescript` dependency.
- **Vite 8** with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- Function components. **Named exports** for components, **default export** for pages.
- JSDoc for props and non-obvious functions. Do NOT install `prop-types`.
- **Tailwind CSS v4** — CSS-first config. All design tokens in `src/styles/index.css`. No `tailwind.config.js`, `postcss.config.js`, or inline styles, CSS modules.
- Class merging via `cn()` from `src/lib/cn.js`.
- **`@` alias** maps to `src/` (configured in `vite.config.js` and `jsconfig.json`).
- All visible text through `t()` from `react-i18next`. Never hard-code text in JSX.
- Helper functions live in `.js` files, not next to components (keeps the `react-refresh/only-export-components` lint rule happy).
- `.gitkeep` only in empty folders.

## Design rules

- Tokens in `src/styles/index.css` are the **single source of truth**.
- **Orange** (`cta`) = primary action only. **Azure** = links and information. **Navy** = authority and dark sections.
- The one bold device is the orange-to-amber ribbon (`bg-brand-ribbon`); keep everything else calm.
- **Avoid:** identical card grids on every section, gradient washes as decoration, a tracked all-caps eyebrow above every heading, accenting a single word of a headline, numbered markers unless the content is a real sequence, arrow glyphs on buttons, one radius or one shadow on everything.
- Use the radius scale by hierarchy (`sm` inputs/chips, `md` buttons, `lg` cards, `xl` feature panels).
- Headlines: sentence case, plain verbs. CTAs say exactly what happens.
- **Motion brief:** lightweight one-time scroll reveals (opacity + translate up to 12px), user-triggered motion (tabs, accordions, selectors), no decorative loops. Always respect `prefers-reduced-motion`.

## Content rules

- Use the **exact approved copy** given in each step prompt.
- **No pre-launch language:** "coming soon", "waitlist", "waiting list", "pre-launch", "prelaunch", "countdown", "launching soon", "january 2027", "stay tuned".
- Never present an unvalidated module, connector, Sector Pack or AI feature as live.
- Never promise certifications, uptime, data residency, payment rails or regulatory compliance.
- NELIAS is **one platform** with sector configuration — not a separate ERP per industry.
- Healthcare and finance copy must avoid unverified clinical or regulatory claims.
- Product imagery is a validated screenshot or labelled "Illustrative preview".

## Gating rules

- `features.configurator`: controls whether "Configure My NELIAS" is shown. Otherwise use `CtaLink`, which falls back to the demo/advisor CTA.
- `features.checkout`: controls any payment path.
- `features.pricingPublic`: controls whether prices are displayed. When `false`, show plan structure without amounts and route to a conversation.
- Prices come only from `src/data/pricing-catalog.js`, never from component code.
- Never simulate a payment or an activation.

## Responsive and accessibility baseline

- **Mobile-first**. No horizontal scroll from 320px up.
- Verify at: 320, 375, 414, 768, 1024, 1280, 1440, and 1920px.
- Fluid type from the token scale.
- Touch targets ≥ 44px.
- Visible keyboard focus.
- Images: always set `width`/`height` or `aspect-ratio` and meaningful `alt` text.
- Semantic landmarks and one `<h1>` per page.
- Colour is never the only carrier of meaning.
- Text contrast ≥ 4.5:1.

## Definition of done (every step)

1. `npm run verify` passes.
2. The new page works at all widths listed above and by keyboard.
3. No new dependency without asking.
4. A short report of files changed.

## Agent safety

1. Work only inside the project folder. Never read or change anything outside it.
2. Read any file before editing or overwriting it.
3. No destructive commands: no `rm -rf`, `git reset --hard`, `git clean`, `npm audit fix --force`, global installs, or `sudo`.
4. Do not commit, push, or add git remotes.
5. No secrets — use `.env.example` for placeholders.
6. Install only explicitly listed packages. If an install fails, stop and report.
7. Never invent product copy, prices, statistics, certifications, testimonials or customer names.
8. Commands must work on Windows PowerShell, macOS and Linux.

## Layout

- Header, footer and the sticky mobile CTA live in `RootLayout`. Pages render only their own content inside `<main>`; never add a second header or footer.
- The header is sticky (64px mobile, 72px from md). Anchor targets rely on `scroll-padding-top: 5.5rem`.
- The logo PNG is opaque with a white background: use it only on white surfaces, or inside the white plate (`Logo variant="plate"`) on dark ones.
- CTA rule: when `features.configurator` is false, show a single "Book a Demo" CTA, never two buttons to the same destination. Use `HeaderCtas` or `CtaLink`; do not hand-roll CTAs.
- The language switcher is hidden until `features.frenchEnabled` is true.
- Navigation data lives in `src/config/navigation.js` only.

## UI kit

- Import primitives from `@/components/ui` (barrel) and patterns from `@/components/patterns`. Never hand-roll an accordion, tabs, modal, form field, badge, alert, table or toggle; extend the kit instead.
- Form controls: borders stay `ink-500`; text size at least 16px; every control sits inside `Field` or `Fieldset`; errors need icon plus text; consent checkboxes are never pre-checked.
- Use varied surfaces: `Card` for bounded items, `Panel` for big feature areas, `RuledList` for quiet lists. Do not put every section into the same card grid.
- `Reveal` is the only scroll-reveal mechanism (one-time, 12px max). Do not add other scroll animations.
- Selection widgets must use `ChoiceCard`, `SegmentedControl` or `Tabs`; each follows the matching ARIA pattern.
- Dev galleries: `/__design` (tokens) and `/__ui` (components) exist only in development.

## Home & Copy Guidelines

- Copy single source: capability-area copy lives in `features.json` (`areas.<key>`), industry copy in `industries.json` (`items.<slug>`). Pages reuse these; never duplicate the text.
- `PrimaryCta` is the single main-CTA helper (configure when `features.configurator` is on, otherwise demo). Never place two buttons with the same destination side by side.
- The Home page follows the "V3 final vision". The older Section 3 copy (three pillars, "The NELIAS approach", industries teaser) is NOT used on Home.
- Open copy items for Debass (marked `TODO(Debass)` in code): scenario impact/benefit texts, the six capability use cases, industry selector examples and capability mapping, validated product screenshots.
- Mocks and previews contain no text, no numbers and no invented metrics, and always carry the "Illustrative preview" label.

