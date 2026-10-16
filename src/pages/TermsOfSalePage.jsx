import { LegalPage } from "@/sections/legal/LegalPage.jsx";

// TODO(Debass): the SEO title and description are derived from the document header; no approved SEO text exists for legal pages.
// TODO(Debass): the CGV reference the Terms of Use, the DPA and the SLA (articles 1 and 19). They appear as plain text; add links when those pages exist. The Terms of Use page should link back to the Terms of Sale now that this page exists.
// TODO(Debass): plan names (START, BUSINESS, PROFESSIONAL, ENTERPRISE), "ten monthly payments for twelve months", "at least 30 days' notice" and the quote-only hosting modes (Dedicated, Sovereign, Hybrid, On-Premise) must stay consistent with the pricing page, the configurator and the FAQ. Confirm.
// TODO(Debass): legal review of articles 14 (return of data), 15 (liability cap) and 18 (electronic acceptance) before publication.

/**
 * Terms of Sale and Subscription (CGV) legal document page.
 *
 * @returns {import("react").JSX.Element}
 */
export default function TermsOfSalePage() {
  return <LegalPage ns="cgv" />;
}
