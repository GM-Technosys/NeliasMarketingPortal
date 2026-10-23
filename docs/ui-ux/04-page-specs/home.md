# Page Specification: Home (`/`)

## 1. Purpose
The primary entry point and brand foundation for the NELIAS platform. Communicates the core value proposition (integrated business management built for local scale), introduces the three strategic pillars, provides interactive operational scenarios, showcases standard capability areas, offers sector exploration, and leads to configuration or demonstration booking.

---

## 2. Page Structure & Components in Order

1. **`HomeHero` (`src/sections/home/HomeHero.jsx`)**
   - *Components:* `Container`, `Reveal`, `Logo` (variant="plate"), `CtaLink`, `PrimaryCta`.
   - *Copy Source:* `home:hero.title`, `home:hero.lead`, `home:hero.ribbonTag`.
   - *Design Signature:* Full-bleed deep tone with subtle logo watermark and brand ribbon accent.
2. **`ProblemStatementSection` (`src/sections/home/ProblemStatementSection.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `SectionHeading`.
   - *Copy Source:* `home:problem.heading`, `home:problem.lead`, `home:problem.body`.
3. **`NeliasApproachSection` (`src/sections/home/NeliasApproachSection.jsx`)**
   - *Components:* `Section` (tone="tint"), `Container`, `SectionHeading`, `Card`.
   - *Copy Source:* `home:approach.heading`, `home:approach.lead`, `home:approach.pillars.*`.
4. **`ThreePillarsSection` (`src/sections/home/ThreePillarsSection.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `Card`, `IconBadge`.
   - *Copy Source:* `home:pillars.title`, `home:pillars.lead`, `home:pillars.items.*`.
5. **`ScenarioSection` (`src/sections/home/ScenarioSection.jsx`)**
   - *Components:* `Section` (tone="muted"), `Container`, `Tabs`, `RuledList`.
   - *Copy Source:* `home:scenarios.title`, `home:scenarios.items.*`.
6. **`CapabilitiesSection` (`src/sections/home/CapabilitiesSection.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `SectionHeading`, `CardLink`.
   - *Copy Source:* `features:areas.*` (single source of truth).
7. **`IndustrySelectorSection` (`src/sections/home/IndustrySelectorSection.jsx`)**
   - *Components:* `Section` (tone="tint"), `Container`, `SegmentedControl`, `ChoiceCard`.
   - *Copy Source:* `industries:items.*`.
8. **`JourneySection` (`src/sections/home/JourneySection.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `ProcessSteps`.
   - *Copy Source:* `home:journey.title`, `home:journey.steps.*`.
9. **`ProductPreviewSection` (`src/sections/home/ProductPreviewSection.jsx`)**
   - *Components:* `Section` (tone="muted"), `Container`, `PreviewFrame`.
   - *Visual:* `ProductPreviewMock` with mandatory "Illustrative preview" badge.
10. **`HomeFinalCta` (`src/sections/home/HomeFinalCta.jsx`)**
    - *Components:* `CtaBand`, `CtaLink`, `PrimaryCta`.
    - *Copy Source:* `home:closing.title`, `home:closing.subtitle`.

---

## 3. Responsive Behavior
- **Mobile (< 640px):** Single column layouts, horizontal scrolling for pill tabs, sticky mobile CTA bar anchored to bottom.
- **Tablet (640px – 1024px):** 2-column card grids, balanced typography scaling.
- **Desktop (>= 1024px):** 3-column cards, side-by-side interactive selectors, full process journey spine.

---

## 4. CTA Logic per Feature Flag State
- If `features.configurator === true`:
  - Primary Hero button: "Configure My NELIAS" (`/configure`).
  - Closing CTA button: "Configure My NELIAS" (`/configure`).
- If `features.configurator === false`:
  - Primary Hero button: "Book a Demo" (`/demo`).
  - Closing CTA button: "Book a Demo" (`/demo`).
  - Never displays two buttons with identical destinations side-by-side.

---

## 5. Copy Source Files
- Primary: [`src/i18n/locales/en/home.json`](file:///d:/Projects/NELIAS/nelias-marketing/src/i18n/locales/en/home.json) and [`src/i18n/locales/fr/home.json`](file:///d:/Projects/NELIAS/nelias-marketing/src/i18n/locales/fr/home.json).
- Shared Capabilities: `features:areas.<key>`.
- Shared Industries: `industries:items.<slug>`.

---

## 6. Open Items (`TODO(Debass)`)
- Hero subheadline conflict between PDF Section 3 and V3 notes.
- Closing headline conflict between PDF Section 3 and V3 notes.
- Scenario impact and benefit texts pending native Debass validation.
- Validated real software screenshots to replace `ProductPreviewMock`.
