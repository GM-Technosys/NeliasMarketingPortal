# Page Specification: Industry Detail (`/industries/:slug`)

## 1. Purpose
Provides an in-depth operational walkthrough for one of the twelve industry sectors. Shows how standard modules combine to address real operational workflows, maps capability areas, shows approved FAQs, and guides the prospect directly to pre-filtered configuration or demo booking.

---

## 2. Page Structure & Components in Order

1. **`PageHeader` (`src/components/patterns/PageHeader.jsx`)**
   - *Components:* `IndustryBreadcrumbs`, `IndustryEmblem`, `Seo`.
   - *Copy Source:* `industries:items.<slug>.name`, `industries:items.<slug>.summary`, `industries:items.<slug>.headline`.
2. **`ChallengeOutcomePairs` (`src/sections/industries/ChallengeOutcomePairs.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `RuledList`.
   - *Copy Source:* Optional `industries:items.<slug>.pairs` (or clean fallback if not populated).
3. **`CapabilityList` (`src/sections/industries/CapabilityList.jsx`)**
   - *Components:* `Section` (tone="muted"), `Container`, `Card`, `AvailabilityBadge`.
   - *Data Source:* `industryAreas[slug]` from `src/data/industry-areas.js`.
4. **`WalkthroughChain` (`src/sections/industries/WalkthroughChain.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `ProcessSteps`.
   - *Copy Source:* `industries:items.<slug>.walkthrough` (5 ordered operational nodes).
5. **`IndustryFaq` (`src/sections/industries/IndustryFaq.jsx`)**
   - *Components:* `Section` (tone="tint"), `Container`, `Accordion`.
   - *Copy Source:* Approved answers from `faq.json`.
6. **`IndustryClosing` (`src/sections/industries/IndustryClosing.jsx`)**
   - *Components:* `Section` (tone="tint"), `Container`, `IndustryCta`.
   - *CTA Contract:* Forwards `slug` to route `/configure?industry=<slug>` (or `/demo?industry=<slug>`).

---

## 3. Responsive Behavior
- **Mobile (< 640px):** Single-column cards, sequential walkthrough nodes, responsive breadcrumb trail.
- **Desktop (>= 1024px):** 2-column capability grids, horizontal walkthrough pipeline.

---

## 4. CTA Logic per Feature Flag State
- If `features.configurator === true`:
  - Destination: `/configure?industry=<slug>`.
  - Label: `cta.seeMyConfiguration`.
- If `features.configurator === false`:
  - Destination: `/demo?industry=<slug>`.
  - Label: `cta.talkToAdvisor`.

---

## 5. Copy Source Files
- Primary: [`src/i18n/locales/en/industries.json`](file:///d:/Projects/NELIAS/nelias-marketing/src/i18n/locales/en/industries.json) and [`src/i18n/locales/fr/industries.json`](file:///d:/Projects/NELIAS/nelias-marketing/src/i18n/locales/fr/industries.json).
- Shared Capabilities: `features:areas.*`.
- Shared FAQs: `faq:items.*`.

---

## 6. Open Items (`TODO(Debass)`)
- Benefit-led headlines for sectors currently falling back to plain names.
- Confirmation of derived capability mapping from summary nouns.
- Sector-specific challenge and outcome triplets (`pairs`).
