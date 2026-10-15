# NELIAS Marketing Portal

Public marketing website for **NELIAS**, a Business Management Platform by Debass Technologies (nelias.app). Target audience: owners and managers of small and mid-size businesses, primarily in Côte d'Ivoire and wider Africa.

## Commands

```bash
npm run dev         # Start Vite dev server
npm run lint        # Run oxlint
npm run build       # Production build
npm run check:copy  # Scan for banned pre-launch phrases
npm run check:theme # Scan for raw palette color usage
npm run check:contrast # Validate WCAG contrast in light & dark themes
npm run verify      # lint + build + check:copy + check:i18n + check:theme + check:contrast
npm run format      # Prettier
```

## Stack and conventions

- **JavaScript** (ES modules + JSX). No TypeScript - no `.ts`, `.tsx`, `tsconfig.json`, `@types` packages, or `typescript` dependency.
- **Vite 8** with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- Function components. **Named exports** for components, **default export** for pages.
- JSDoc for props and non-obvious functions. Do NOT install `prop-types`.
- **Tailwind CSS v4** - CSS-first config. All design tokens in `src/styles/index.css`. No `tailwind.config.js`, `postcss.config.js`, or inline styles, CSS modules.
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
- NELIAS is **one platform** with sector configuration - not a separate ERP per industry.
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
5. No secrets - use `.env.example` for placeholders.
6. Install only explicitly listed packages. If an install fails, stop and report.
7. Never invent product copy, prices, statistics, certifications, testimonials or customer names.
8. Commands must work on Windows PowerShell, macOS and Linux.

## Layout

- Header, footer and the sticky mobile CTA live in `RootLayout`. Pages render only their own content inside `<main>`; never add a second header or footer.
- The header is sticky (64px mobile, 72px from md). Anchor targets rely on `scroll-padding-top: 5.5rem`.
- The logo PNG is opaque with a white background: use it only on white surfaces, or inside the white plate (`Logo variant="plate"`) on dark ones.
- CTA rule: when `features.configurator` is false, show a single "Book a Demo" CTA, never two buttons to the same destination. Use `HeaderCtas` or `CtaLink`; do not hand-roll CTAs.
- The language switcher is visible by default (hidden only when `VITE_FEATURE_FRENCH=false`).
- Navigation data lives in `src/config/navigation.js` only.

## UI kit

- Import primitives from `@/components/ui` (barrel) and patterns from `@/components/patterns`. Never hand-roll an accordion, tabs, modal, form field, badge, alert, table or toggle; extend the kit instead.
- Form controls: borders stay `border-field`; text size at least 16px; every control sits inside `Field` or `Fieldset`; errors need icon plus text; consent checkboxes are never pre-checked.
- Use varied surfaces: `Card` for bounded items, `Panel` for big feature areas, `RuledList` for quiet lists. Do not put every section into the same card grid.
- `Reveal` is the only scroll-reveal mechanism (one-time, 12px max). Do not add other scroll animations.
- Selection widgets must use `ChoiceCard`, `SegmentedControl` or `Tabs`; each follows the matching ARIA pattern.
- Dev galleries: `/__design` (tokens) and `/__ui` (components) exist only in development.

## Home & Copy Guidelines

- Copy single source: capability-area copy lives in `features.json` (`areas.<key>`), industry copy in `industries.json` (`items.<slug>`). Pages reuse these; never duplicate the text.
- `PrimaryCta` is the single main-CTA helper (configure when `features.configurator` is on, otherwise demo). Never place two buttons with the same destination side by side.
- The Home page uses PDF Section 3 ('ready-to-use copy': hero, the problem, the NELIAS approach, three pillars, industries teaser, closing conversion) as its skeleton, with the V3 interactive modules (scenarios, six capability cards, industry selector, four-step journey, product preview) embedded. Where the PDF contradicts itself, Section 3 wins on the hero and the closing; V3 supplies the module titles. Conflicts are marked `TODO(Debass)`.
- Open copy items for Debass (marked `TODO(Debass)` in code): scenario impact/benefit texts, the six capability use cases, industry selector examples and capability mapping, validated product screenshots.
- Mocks and previews contain no text, no numbers and no invented metrics, and always carry the "Illustrative preview" label.

## Internationalisation (mandatory rules)

1. Every visible string, `aria-label`, `alt`, `title`, `placeholder`, SEO text, error or validation message, tooltip and modal text comes from i18n through `useTranslation` / `t`. Never type display text in JSX, in `src/data/` or in `src/config/` (those hold ids, slugs, icons, flags and language-neutral contact data only). Dev-only pages (`DesignPreviewPage.jsx`, `UiKitPreviewPage.jsx`) are exempt.
2. Every new or changed key MUST be added to BOTH `locales/en/<ns>.json` and `locales/fr/<ns>.json` in the same change: identical structure, array lengths and `{{placeholders}}`. Never leave `fr` empty or in English (except the kept names). This applies even when a task prompt supplies only English copy: translate it yourself using `docs/FRENCH_GLOSSARY.md`, and add the new keys to `docs/FRENCH_REVIEW.md` as "Draft".
3. New namespaces are registered automatically from the JSON files (Vite glob). Create the `en` and `fr` file together.
4. Never call `t()` at module scope or freeze its result in `useMemo`/`useState` without the language as a dependency; call it inside components so text updates when the language changes.
5. Use `useFormat` / `src/lib/format.js` for numbers, currency (FCFA) and dates. Never hard-code separators.
6. Follow `docs/FRENCH_GLOSSARY.md` (formal "vous", sentence case, typographic apostrophe, `\u00A0` before `: ; ? !`, glossary terms, kept names).
7. `npm run check:i18n` is part of `npm run verify` and must pass. In development, missing keys are logged as `[i18n] missing key`.
8. The French copy is an AI-drafted translation until Debass approves it (`docs/FRENCH_REVIEW.md`). Do not change English text while translating.
9. The initial language is English (or `?lang=fr`); the choice is saved in localStorage `nelias-lang`. `VITE_FEATURE_FRENCH=false` hides the switcher.

## Theming (mandatory rules)

1. The site has a light and a dark theme. The theme is the `data-theme` attribute on `<html>`; `src/theme/theme.js` manages it (first visit follows the system, an explicit choice is saved in localStorage `nelias-theme`, `?theme=dark|light` forces and saves it). `ThemeToggle` lives in the utility bar, the header (below xl) and the mobile menu.
2. Components must use ROLE classes only, never raw palette classes (`bg-white`, `text-navy-*`, `text-ink-*`, `bg-ink-*`, `bg-azure-*`, `border-ink-*`, `border-azure-*`). Mapping to use (copy the full table from the dark-mode task into this file):

| Raw class | Replace with |
|---|---|
| `bg-white` (cards, panels, inputs, modals, frames) | `bg-surface-raised` |
| `bg-white` (header, page-level) | `bg-surface` |
| `bg-white/95` (and similar alpha) | `bg-surface-raised/95` |
| `bg-ink-50` | `bg-surface-muted` |
| `bg-azure-50` (and `hover:bg-azure-50`) | `bg-surface-tint` |
| `bg-ink-100` | `bg-surface-sunken` |
| `bg-ink-200` (tracks, rails, dots, thin bars) | `bg-line` |
| `bg-azure-100` | `bg-accent-soft` |
| `bg-azure-500` (rules, underline bars, accent fills) | `bg-accent` |
| `bg-navy-900` + `text-white` on selected, active, checked, reached states (pill tab, segmented option, checkbox, radio indicator, step marker) | `bg-selected text-selected-fg` |
| `bg-navy-900` + `text-white` on the secondary button and the Toggletip bubble | `bg-secondary text-secondary-fg`; `hover:bg-navy-800` becomes `hover:bg-secondary-hover` |
| `bg-flame-100` + `text-flame-700` (highlight badge) | `bg-highlight-soft text-highlight-strong` |
| `text-navy-900`, `text-navy-800` | `text-heading` |
| `text-ink-900`, `text-ink-800` | `text-fg` |
| `text-ink-700` | `text-fg-strong` |
| `text-ink-600` | `text-fg-muted` |
| `text-ink-500`, `text-ink-400`, `text-ink-300` | `text-fg-subtle` |
| `text-azure-600` (links, info text) | `text-link` (icons: `text-accent`) |
| `text-azure-700` | `text-accent-strong` |
| `text-azure-500` | `text-accent` |
| `border-ink-200`, `divide-ink-200` | `border-line`, `divide-line` |
| `border-ink-300` | `border-line-strong` |
| `border-ink-500`, `hover:border-navy-900` (form fields, indicators) | `border-field`, `hover:border-heading` |
| `border-azure-200` | `border-accent-line` |
| `border-azure-500`, `ring-azure-500` | `border-accent`, `ring-accent` |
| `border-navy-900 text-navy-900` (outline button) | `border-heading text-heading hover:bg-secondary hover:text-secondary-fg` |
| ghost button `hover:bg-azure-50` | `hover:bg-surface-tint` |
| SVG `fill`/`stroke`/inline-style colours: `var(--color-ink-100)` | `var(--surface-sunken)` |
| `var(--color-ink-200)` | `var(--line)` |
| `var(--color-ink-300)` | `var(--line-strong)` |
| `var(--color-azure-50)` | `var(--surface-tint)` |
| `var(--color-azure-100)` | `var(--accent-soft)` |
| `var(--color-azure-500)` | `var(--accent)` |
| `var(--color-navy-900)` | `var(--selected)` |
| `white`, `#fff`, `#ffffff` fills | `var(--surface-raised)` |

3. If a task prompt names raw palette classes (`bg-white`, `text-navy-900`, `bg-ink-100`, `bg-azure-50`, `border-ink-500` and so on), translate them with the mapping above instead of using them.
4. Fixed in both themes (allowed as-is): the orange primary button (`bg-cta text-cta-fg`), the logo ribbon (`bg-brand-ribbon`, flame to sun gradients), dark bands and footer (`bg-brand-deep` with `text-white` and `text-fg-inverse*`), `text-white`/`bg-white/NN`/`border-white/NN` on those inverse surfaces, `backdrop:` scrims, and the white logo chip and plate.
5. Do NOT use `dark:` utilities (the only exception is the logo chip) and never hard-code colour literals in components or SVGs. Illustrations use role variables (`var(--surface-raised)`, `var(--line)`, `var(--accent)`, `var(--accent-soft)`, `var(--selected)`) and the brand ribbon colours.
6. Every new component and page must be checked in both themes: backgrounds, text, borders, hover, focus, selected, disabled, error states, illustrations. `npm run check:theme` and `npm run check:contrast` are part of `npm run verify`.
7. Moved role tokens exist as plain variables (`var(--surface)`, `var(--fg)`, `var(--line)`…), not as `var(--color-surface)`.
8. Orange is for actions and the ribbon only; the dark palette follows the same rule.

## About Page Guidelines

- About page copy lives in `about.json` (en and fr) and follows `NELIAS_About_Us_For_Rahul_EN.docx`; it replaces PDF Section 9. The closing button text comes from the PDF (Section 9).
- Heading structure: one `<h1>`, four `<h2>`; pull statements and the signature are paragraphs.
- Design signature of the page: the short ribbon accent above the title and the ribbon arc in `VisionRipple` (the only animation) are the page's bold devices; `FoundationIllustration` and `VisionRipple` are shape-only (no text, numbers, map or flag).
- Open copy items for Debass (marked `TODO(Debass)`): replacement of the PDF text, the signature wording, the "leading platform" claim, French review.



