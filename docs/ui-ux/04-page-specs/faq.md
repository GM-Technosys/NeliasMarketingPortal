# Page Specification: Frequently Asked Questions (`/faq`)

## 1. Purpose
Centralizes all frequently asked questions regarding NELIAS BMP: pricing and plans, modules and sectors, hosting and data sovereignty, migration and legacy systems, and general architecture.

---

## 2. Page Structure & Components in Order

1. **`PageHeader` (`src/components/patterns/PageHeader.jsx`)**
   - *Components:* `PageHeader`, `Seo`.
   - *Tone:* `tint`, `accent={true}`.
   - *Copy Source:* `faq:page.title`, `faq:seo.title`.
2. **`JumpNav` & `FaqGroups` (`src/sections/faq/FaqGroups.jsx`)**
   - *Components:* `Section` (tone="default"), `Container`, `Accordion` (type="single", headingLevel=3), `TextLink`.
   - *Copy Source:* `faq:groups.*`, `faq:items.*`.
3. **`CtaBand` (`src/components/patterns/CtaBand.jsx`)**
   - *Components:* `CtaBand` (tone="inverse"), `Link` buttons ("Request a Demo" to `/demo`, "Talk to an Expert" to `/contact`).
   - *Copy Source:* `faq:closing.title`, `faq:closing.body`.

---

## 3. Responsive Behavior
- **Mobile (< 768px):** Jump list pills wrap smoothly, touch targets >= 44px, full-width accordion disclosures.
- **Desktop (>= 1024px):** Max reading width bounded to `max-w-3xl` for high scannability.

---

## 4. Gating Rules
- When `features.pricingPublic` is false, questions mentioning prices or amounts (`moreModules`, `currency`) are omitted from rendering.
