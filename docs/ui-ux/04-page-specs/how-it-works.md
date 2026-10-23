# Page Specification: How It Works (`/how-it-works`)

## 1. Purpose
Demystifies the deployment, configuration, and daily usage of NELIAS through a clear six-step journey and a concrete operational example, establishing high confidence for business managers. Follows PDF Section 5.

---

## 2. Page Structure & Components in Order

1. **`HowHero` (`src/sections/how/HowHero.jsx`)**
   - *Components:* `PageHeader`, `Seo`.
   - *Copy Source:* `how:hero.title`, `how:hero.lead`.
2. **`JourneyTimeline` (`src/sections/how/JourneyTimeline.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `ProcessSteps`.
   - *Design Signature:* Gradient ribbon spine (Flame to Sun). Steps 1 through 6 feature shape-only SVGs (`StepVisual`) using role tokens without text or numbers.
   - *Copy Source:* `how:steps.*`.
3. **`ExampleSection` (`src/sections/how/ExampleSection.jsx`)**
   - *Components:* `Section` (tone="tint"), `Container`, `Panel`, `CardLink`, `CtaLink`.
   - *Copy Source:* `how:example.title`, `how:example.lead`, `how:example.scenario.*`.
4. **`HowClosing` (`src/sections/how/HowClosing.jsx`)**
   - *Components:* `CtaBand`, `PrimaryCta`.
   - *Copy Source:* Approved closing button from PDF Section 5.

---

## 3. Responsive Behavior
- **Mobile (< 768px):** Linear vertical timeline with left-aligned ribbon rail and stacked step visuals.
- **Desktop (>= 768px):** Alternating or left-ruled step layout with prominent step markers and balanced visual assets.

---

## 4. CTA Logic per Feature Flag State
- If `features.configurator === true`: Directs to `/configure`.
- If `features.configurator === false`: Directs to `/demo`.

---

## 5. Copy Source Files
- Primary: [`src/i18n/locales/en/how.json`](file:///d:/Projects/NELIAS/nelias-marketing/src/i18n/locales/en/how.json) and [`src/i18n/locales/fr/how.json`](file:///d:/Projects/NELIAS/nelias-marketing/src/i18n/locales/fr/how.json).

---

## 6. Open Items (`TODO(Debass)`)
- Harmonization between Home's 4-step journey and How It Works' 6 approved steps.
- Self-service wording in steps 4 and 5 (prior to public automated checkout availability).
