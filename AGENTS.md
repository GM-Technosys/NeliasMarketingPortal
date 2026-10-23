# NELIAS Marketing Portal

Public marketing website for **NELIAS**, a Business Management Platform by Debass Technologies (nelias.app). Target audience: owners and managers of small and mid-size businesses, primarily in Côte d'Ivoire and wider Africa.

## Commands

```bash
npm run dev         # Start Vite dev server
npm run lint        # Run oxlint
npm run build       # Production build
npm run check:copy  # Scan for banned pre-launch phrases
npm run check:theme # Scan for raw palette color usage
npm run check:industries # Validate industry sectors, areas, and translations
npm run check:docs       # Validate UI/UX documentation parity
npm run verify      # lint + build + check:copy + check:i18n + check:theme + check:contrast + check:legal + check:config + check:industries + check:docs
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
- Never present an unvalidated module, connector, or AI feature as live.
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

## Why NELIAS Page Guidelines

- Why NELIAS copy lives in `why.json` (en and fr) and follows PDF Section 4 only (hero, intro, challenges and benefits, differentiator, closing button). "The NELIAS approach" and the "Three pillars" belong to the Home page; do not add them here.
- The five challenge/response pairs also appear (as the scenario panel) in `home.json`, in both languages. If one file changes, update the other so the wording stays identical.
- Open copy items for Debass (marked `TODO(Debass)`): whether "Challenges and benefits" is a visible headline; the grammar of the English differentiator sentence (kept exactly as approved); French review.
- The ribbon bridge in `WhyIllustration` is this page's only bold device. Do not add other gradients or orange accents on this page.
- Challenge/response rows are deliberately not cards; keep this "ruled list with an accent rule on the response" pattern for similar comparisons.

## How It Works Page Guidelines

- How It Works copy lives in `how.json` (en and fr) and follows PDF Section 5 exactly (six steps, example, closing button). The page has no invented headline for the closing band.
- Home's four-step journey and this page's six steps share some sentences; keep the French identical for identical English.
- The ribbon spine (flame to sun gradient) in `JourneyTimeline` is this page's one bold device; the step illustrations (`StepVisual`) are shape-only: no text, no numbers, no orange, role colours only.
- Timeline rule: text and illustrations are always visible; only the marker fill and the spine segments animate, once, and everything is filled immediately under reduced motion.
- Open copy items for Debass (marked `TODO(Debass)`): 4-step (Home) vs 6-step (this page) wording; self-service wording in steps 4 and 5; French review.

## Industries Page Guidelines

- The portal has twelve sectors; all sector lists are data-driven (`src/data/industries.js`, `src/data/industry-areas.js`, `src/i18n/locales/*/industries.json`). Adding a future sector is a data-only change: add a slug to `industries.js`, an areas array to `industry-areas.js`, an icon to `home-content.js`, and en/fr copy to `industries.json`, then run `npm run check:industries`.
- Area order in `industry-areas.js` represents the Sector Engine relevance order.
- The four newest sectors (Real Estate, Pharmacies, Construction / BTP, IT & Technology Services) use existing standard modules only and their copy must NOT mention specialised functions (rent collection, lease agreements, batch or expiry tracking, progress billing, retention, subcontractors, SLAs, insurance policies and similar: they belong to future Industry+ packs).
- Industry copy lives in `industries.json` (names, summaries, headlines, walkthrough nodes, labels) in both languages. Home also reads `items.<slug>.name/summary/headline`. Missing approved text is flagged with `TODO(Debass)`. To add sector-specific challenges and outcomes later, add `pairs: [{ challenge, outcome }]` (three entries) to `items.<slug>` in BOTH languages; the template picks them up with no code change.
- `faq.json` (en and fr) holds all ten approved FAQ answers; later steps (Pricing and others) reuse it. The English `tryNelias` answer starts with a lowercase "demo" exactly as in the PDF; fix it only when Debass approves.
- Capability status badges on industry pages come from `feature-states.js` (placeholder `demo-only` until confirmed); `hidden` areas are excluded everywhere.
- Healthcare, pharmacies and insurance pages show the approved summaries (with their "subject to…" caveats) in full and carry no other regulatory or clinical statements.
- CTA rule on industry pages: `IndustryCta` shows the approved "configuration" label only when `features.configurator` is on; otherwise it shows "Talk to an Advisor" linking to `/demo`.
- Open copy items for Debass (marked `TODO(Debass)`): confirmation of sector names and order, sector-specific challenges and outcomes, walkthroughs, headlines for sectors without benefit-led headlines, which FAQ answers belong on industry pages, SEO copy for industry pages, the French terminology ("Hôtellerie", "Industrie manufacturière"), French review.

## Features Page Guidelines

- Features copy lives in `features.json` (en and fr): `hero`, `page`, `disclaimer` and `areas.<key>` (shared with Home and the industry pages, which read the same names and descriptions). The visible order of the areas is `featureAreaOrder` in `src/data/feature-order.js`; `hidden` areas are excluded everywhere (list, mosaic, filter counts).
- Availability labels come from `feature-states.js`; every area is the placeholder `demo-only` until Debass confirms each state. To change an area, edit its state there (for example set it to `available` to remove the label); no copy changes are needed.
- The industry filter on `/features` (shareable as `?industry=<slug>`) uses `industryProfiles` from `home-content.js`; the mapping is derived from approved industry summaries and must be confirmed by Debass.
- CTA rule on the Features page: the approved button "Explore the Right Configuration" appears only when `features.configurator` is on; otherwise the strip shows "Talk to an Advisor" linking to `/demo`.
- Heading structure of `/features`: one `<h1>` and one `<h2>` per visible capability area; the disclaimer and the filter summary are not headings.
- The mosaic is shape-and-icon only (no text or numbers) and uses role colours; its ribbon is the page's one bold device.
- Open copy items for Debass (marked `TODO(Debass)`): confirmation of each availability state, the derived industry mapping, the hyphen in "usage-based", the missing closing headline, French review.

## Pricing Page Guidelines

- Pricing copy lives in `pricing.json` (en and fr). ALL amounts, capacities and module counts come from `src/data/pricing-catalog.js` (plans and `optionalCharges`) through `formatFcfa`/`formatNumber`; never type a price, user count, storage value or module quota in a component or an i18n file. Standard modules per plan (START 4, BUSINESS 6, PROFESSIONAL 8, ENTERPRISE tailored) are drawn from the catalog. Each additional standard module costs FCFA 15,000/month. The Sector Engine is included in every plan at no charge; there is NO separate or paid Sector Pack. Industry+ packs (FCFA 50,000/month) are V2 ONLY (data in `src/data/industry-packs.js`, feature flag `industryPlus` / `VITE_FEATURE_INDUSTRY_PLUS`, status gate, no V1 UI). Storage extension prices are provisional and must never be added anywhere.
- Catalog version is `internal-v3`. Optional charges now list 18 items across four groups: modules (additional standard module), capacity, add-ons, connectors.
- Display gate: amounts, the Monthly/Annual toggle, the "12 months for the price of 10" sentence, the optional-charges section and the price disclaimer render ONLY when `features.pricingPublic` is true; otherwise the page shows capacity, included modules and inclusions with "Pricing on request". The catalog's `approvedForPublic` stays false until Debass approves; in development a console warning appears when the gate is open and the catalog is not approved.
- The internal note "Prices below are internal commercial V2 reference figures…" is never displayed.
- CTA rules: plan buttons say "Configure <PLAN>" (linking to `/configure?plan=<id>`, plus `billing` when prices are public) only when `features.configurator` is on, otherwise "Talk to an Advisor" (to `/demo`); the Enterprise button is always "Talk to an Expert" (to `/contact`). Only the featured (BUSINESS) card uses the orange primary button. The later Configurator step reads the `plan` and `billing` query parameters.
- Heading structure of `/pricing`: one `<h1>`, a visually hidden `<h2>` "Plans" with one `<h3>` per plan, then `<h2>` sections (compare, optional charges when shown, FAQ).
- Open copy items for Debass (marked `TODO(Debass)`): wording for the hidden-price state, the "Included" lists ("Sector Engine" wording), modules note under the plan cards, standard modules on annual plans and which capability areas are standard modules, the Enterprise button destination, the labels "Compare plans" and "Optional charges", commercial readiness of every add-on, connector and NELIAS AI, FAQ selection, French review.

## Contact and Demo Page Guidelines

- Contact and Demo copy lives in `contact.json` (en and fr). Both pages share `LeadForm`; they differ only in the header and the submit label (Contact: "Request a Conversation" plus the secondary "Explore NELIAS"; Demo: "Book a Demo").
- Submission modes: with `VITE_LEAD_ENDPOINT` set, the form POSTs JSON (see `src/lib/leads.js`); otherwise it opens a `mailto:` message to the site email and says so. Never fake a success. `npm run dev:lead` starts a local test server (`scripts/dev-lead-server.mjs`; set `VITE_LEAD_ENDPOINT=http://127.0.0.1:8787/lead` in `.env.local`; `?fail=1` returns 500 and `?slow=1` delays).
- Privacy rules: never send personal data to analytics (`track` receives only `ok` and `mode`), never store it in localStorage, sessionStorage, cookies or URLs; `VITE_*` variables are public, so no secrets there.
- Form rules: validation messages come from i18n keys through `validators.js`; errors appear as an error summary (focus moves to it) plus inline messages; controls have stable ids; a hidden honeypot field silently drops bots; the consent checkbox is never pre-checked and its wording is a placeholder until legal approves.
- Country names come from `Intl.DisplayNames` in the active language; industry names from `industries.json`; business needs from `features.json` (hidden areas excluded).
- No `Reveal` on pages with forms.
- Open copy items for Debass (marked `TODO(Debass)`): consent wording (legal and compliance), where submissions go (endpoint, CRM or email) and who handles them, success and error wording and any response-time promise, company-size ranges, the destination of "Explore NELIAS", SEO copy, demo scheduling tool (if any), French review.

## Legal Document Guidelines

- Legal documents (Terms of Use now; Privacy Policy, Terms of Sale/CGV, DPA and SLA later) are published through `LegalPage` with one namespace per document (`terms`, later `privacy`, `cgv`, `dpa`, `sla`). Schema: `meta` (title, version, publisher, optional `notice`), `seo`, `page` (`contents`, `languageLink`) and `articles: [{ title, blocks: [{ p } | { ul }] }]`; titles start with their number. To add a document: create `en/<ns>.json` and `fr/<ns>.json`, add a page file that renders `<LegalPage ns="<ns>" />`, register the expected article count in `scripts/check-legal.mjs`.
- Legal text is OFFICIAL and verbatim: never edit, translate, correct or re-punctuate it; never AI-translate it; changes only come from a new official document version supplied by Debass. The French version prevails over the English version of the Terms of Use; the English page shows the notice from the document (key `meta.notice`, English only).
- French typographic spacing is applied at display time by `frenchSpacing`; the JSON files keep the official characters (straight apostrophes, normal spaces).
- Legal pages have no animation, no `Reveal` and no marketing elements. Emails, URLs and phone numbers are auto-linked by `Linkified` without changing their characters.
- `npm run check:legal` (part of `npm run verify`) guards article counts, numbering and EN/FR structure parity.
- Open items for Debass (marked `TODO(Debass)`): the SEO text of legal pages (derived from the document header); alignment between the Terms (definitive hosting statements: Hodi in Grand-Bassam, disaster recovery in Johannesburg, storage remains in Africa) and the marketing FAQ answer on hosting ("being planned… subject to contractual confirmation"); the two contact addresses (`info@debasstechnologies.com` in the Terms, `contact@nelias.app` elsewhere); the Terms of Sale (CGV), DPA, SLA and Privacy Policy referenced by the Terms (shown as plain text until those documents and pages exist); legal review before publication.
- Terms of Sale and Subscription (CGV) is published through `LegalPage` with the namespace `cgv` (`en/cgv.json`, `fr/cgv.json`), 19 articles, same schema as `terms`. Its page file renders `<LegalPage ns="cgv" />`.
- The legal text of the CGV is OFFICIAL and verbatim (same rules as the Terms of Use): never edit, translate, correct or re-punctuate it; never AI-translate it; changes only come from a new official document version supplied by Debass. The French version prevails; the English page shows the notice from the document (`meta.notice`, English only, registered as `enOnly` in the i18n allowlist).
- `scripts/check-legal.mjs` keeps two maps: `expected` (article counts: `terms` 15, `cgv` 19) and `lists` (article number → list items: `terms` article 6 has 5, `cgv` article 19 has 5). When adding a legal document, register it in both maps.
- Open items for Debass (marked `TODO(Debass)`): SEO text of the CGV page (derived from the document header); links from the CGV to the Terms of Use (and the Terms page to the CGV) now that both pages exist, plus DPA and SLA shown as plain text until their pages exist; alignment of plan names, "ten monthly payments for twelve months", "30 days' notice" and the quote-only hosting modes with the pricing page, configurator and FAQ; legal review before publication.
- The Data Processing Agreement (DPA) is published through `LegalPage` with the namespace `dpa` (`en/dpa.json`, `fr/dpa.json`), 15 articles, same schema as `terms` and `cgv`. Its page file renders `<LegalPage ns="dpa" />`.
- New block type: `{ "table": { "head": [..], "rows": [[..], ..] } }`, rendered by `LegalArticle` as a real table (column headers, first column as row headers, scrollable wrapper with keyboard focus, no caption). Used for the DPA annexes 1 and 2 (articles 12 and 13).
- The legal text of the DPA is OFFICIAL and verbatim (same rules as the other legal documents): never edit, translate, correct or re-punctuate it; never AI-translate it; changes only come from a new official document version supplied by Debass. The French version prevails; the English page shows the notice from the document (`meta.notice`, English only, registered as `enOnly` in the i18n allowlist).
- `scripts/check-legal.mjs` keeps three maps: `expected` (article counts: `terms` 15, `cgv` 19, `dpa` 15), `lists` (article number → list items: `terms` 6 → 5, `cgv` 19 → 5, `dpa` 14 → 5) and `tables` (article number → columns and rows: `dpa` 12 → 2×5, 13 → 2×2). When adding a legal document, register it in the maps that apply.
- Open items for Debass (marked `TODO(Debass)`): SEO text of the DPA page (derived from the document header); links from the DPA to the Terms of Sale, Terms of Use and Privacy Policy as those pages exist, and links to the DPA from the Terms of Use and Terms of Sale; alignment of the hosting and recovery statements across the DPA (article 6, annex 2), the Terms of Use (article 10) and the marketing FAQ; the list of sub-processors and activated providers (articles 5 and 13) with the real services in use; legal review before publication.
- The Privacy Policy is published through `LegalPage` with the namespace `privacy` (`en/privacy.json`, `fr/privacy.json`), 10 articles, same schema as the other legal documents. Its page file renders `<LegalPage ns="privacy" />`.
- The `table` block now supports 2 or more columns. For tables with more than 2 columns the table has a minimum width and its focusable wrapper scrolls inside itself on narrow screens; the page never scrolls sideways. Used by the DPA (annexes) and by the Privacy Policy (article 3, 4 columns).
- The legal text of the Privacy Policy is OFFICIAL and verbatim (same rules as the other legal documents): never edit, translate, correct or re-punctuate it; never AI-translate it; changes only come from a new official document version supplied by Debass. The French version prevails; the English page shows the notice from the document (`meta.notice`, English only, registered as `enOnly` in the i18n allowlist).
- `scripts/check-legal.mjs` maps now are: `expected` (`terms` 15, `cgv` 19, `dpa` 15, `privacy` 10), `lists` (`terms` 6 → 5, `cgv` 19 → 5, `dpa` 14 → 5, `privacy` none) and `tables` (`dpa` 12 → 2×5, 13 → 2×2; `privacy` 3 → 4×7).
- Open items for Debass (marked `TODO(Debass)`): SEO text of the Privacy page (derived from the document header); links between the Privacy Policy and the DPA, Terms of Use and Terms of Sale, and links to the Privacy Policy from the other legal pages; alignment of retention periods, hosting and cookie statements with what the site and platform really do; the two contact addresses; the payment provider and other activated providers; legal review before publication.
- The Service Level Agreement (SLA) is published through `LegalPage` with the namespace `sla` (`en/sla.json`, `fr/sla.json`), 14 articles, same schema as the other legal documents. Its page file renders `<LegalPage ns="sla" />`. With it all five legal documents are published: `terms`, `cgv`, `dpa`, `privacy`, `sla`.
- Article 7 of the SLA is the first article whose blocks run paragraph, table, paragraph; articles 3 and 7 use 3-column tables.
- The legal text of the SLA is OFFICIAL and verbatim (same rules as the other legal documents), including the minus sign (U+2212), the division sign and the em dashes: never edit, translate, correct or re-punctuate it; never AI-translate it; changes only come from a new official document version supplied by Debass. The French version prevails; the English page shows the notice from the document (`meta.notice`, English only, registered as `enOnly` in the i18n allowlist).
- `scripts/check-legal.mjs` maps now are: `expected` (`terms` 15, `cgv` 19, `dpa` 15, `privacy` 10, `sla` 14), `lists` (`terms` 6 → 5, `cgv` 19 → 5, `dpa` 14 → 5, `privacy` and `sla` none) and `tables` (`dpa` 12 → 2×5, 13 → 2×2; `privacy` 3 → 4×7; `sla` 3 → 3×4, 7 → 3×4).
- Open items for Debass (marked `TODO(Debass)`): SEO text of the SLA page (derived from the document header); links between the SLA and the Terms of Sale, and links to the SLA from the other legal pages; alignment of the service levels (Standard, Standard+, Priority, 99.5%) with the pricing page, plan comparison and FAQ; alignment of the hosting and recovery statements with the other legal documents; French typographic spacing for "99,5 %" and "8 h"; legal review before publication.
- Resources copy lives in `resources.json` (en and fr); the FAQ answers come from `faq.json` (all ten, in PDF order). The page title is the navigation label; the PDF has no hero text for Resources.
- Articles are data-driven (`src/data/resources.js`). All five are state `coming-later` (labelled with the approved status badge) because no article text exists. To publish an article: add its text page, set `state` to `available` and add `path`; the card becomes a link automatically. Article pages, industry filters, related content and testimonials are not built (no source content).
- Search filters articles and FAQ together, ignores accents and case, keeps `?q=` in the URL and never sends the search words to analytics (only counts).
- Open items for Debass (marked `TODO(Debass)`): hero and SEO copy, article texts (and dates, authors, industry tags), whether the FAQ belongs on this page, hosting answer alignment with the Terms of Use, French review.

## Configurator Page Guidelines

- The configurator (`/configure`, only when `features.configurator` is true) has a start screen and five steps; copy lives in `configurator.json` (en and fr) and reuses names and labels from `pricing.json`, `industries.json`, `features.json` and `contact.json`.
- Standard modules are chosen (the twelve capability areas, not free functions); quota per plan comes from `pricing-catalog.js` (START 4, BUSINESS 6, PROFESSIONAL 8, ENTERPRISE tailored/unlimited). Extra modules beyond quota are charged at the catalog price (FCFA 15,000/month).
- The Sector Engine recommends modules as a derived suggestion capped at the plan quota and is never mandatory. Replacement of compatible standard modules within quota is free by design (price depends strictly on the count of extra modules).
- Status badges: "Recommended" (when matching recommendation), "Included" (within quota), and "Additional" (beyond quota). Unchecked modules show no status badge.
- Module list and sector compatibility come from `src/data/modules.js` and `src/data/industry-areas.js`; adding future sectors or specialised modules is done there with no restructuring. Industry+ packs are V2 only and absent from V1.
- Plan recommendation remains capacity-first (users, legal entities, storage); selecting extra modules does not force plan upgrade (extra modules are billed).
- The estimate panel is displayed in the aside starting from step 2 (operations) onwards so dynamic pricing changes are visible immediately.
- Logic is pure and testable in `src/lib/configurator/` (relative imports only): capacity-first recommendation, minimum-cost extension pricing, estimate with lower-bound flags. `npm run check:config` (part of `verify`) tests it against the catalog. Never hard-code amounts: they come from `pricing-catalog.js`.
- Pricing gate: amounts appear only when `features.pricingPublic` is true; annual billing shows the plan (per year) and the options (per month) separately and never sums them; storage extension prices never exist.
- No checkout, workspace address, account, payment or activation exists; never add a control that implies them. A checkout control is rendered only when `features.checkout` is true AND that journey exists (extension point in `StepSummary`).
- Privacy: the configuration contains no personal data; save writes a draft to `localStorage` key `nelias-config-draft`; share encodes the selections in the `c` URL parameter (validated with `sanitizeState` before use); analytics receive only step numbers, plan ids, billing ids and module counts (`selected`, `included`).
- The demo link carries `industry` and `needs` query parameters (carrying `effectiveModules`), read by `useLeadForm`.
- Open items for Debass (marked `TODO(Debass)`): the Sector Engine rules and matrix, annual pricing for additional modules, confirmation of which capability areas are standard modules and any sector compatibility restrictions, customer-facing term ("standard modules" vs "functions"), treatment of storage beyond the plan, approval of all amounts, "teams and priorities", SEO copy, the checkout and account journey, use of the legal sentence on the summary, French review.

## UI/UX Specification Guidelines

- The `docs/ui-ux/` document set is the formal UI/UX specification for the NELIAS marketing portal.
- Any new page, route, or component MUST update the matching document in the same change (`npm run check:docs` enforces that all routes in `router.jsx`, component filenames in `src/components/ui` and `src/components/patterns`, and page specs in `docs/ui-ux/04-page-specs/` are documented).
- The audit report (`docs/ui-ux/05-audit-report.md`) records every refinement and finding across viewports, themes, and languages.
- Strict constraint: no redesign or modification of brand colors, typography, logo treatments, or approved copy without prior Debass approval.







