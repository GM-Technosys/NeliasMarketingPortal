import { LegalPage } from "@/sections/legal/LegalPage.jsx";

// TODO(Debass): the SEO title and description are derived from the document header; no approved SEO text exists for legal pages.
// TODO(Debass): the SLA references the Terms of Sale (articles 11 and 14). They appear as plain text; add a link when those pages are linked from here. The Terms of Use and Terms of Sale pages should link to this SLA.
// TODO(Debass): the service levels by plan (START Standard, BUSINESS Standard+, PROFESSIONAL Priority, ENTERPRISE per quote), the 99.5% availability objective, the support hours (Monday to Friday, 8 a.m. to 6 p.m., Abidjan time) and the first-response times must stay consistent with the pricing page, the plan comparison and the FAQ. Confirm.
// TODO(Debass): article 4 describes hosting and a disaster recovery plan (Hodi in Grand-Bassam, Johannesburg, CRMPUNCH support). Keep it consistent with the Terms of Use (article 10), the DPA (article 6, annex 2), the Privacy Policy (article 5) and the marketing FAQ.
// TODO(Debass): the French text uses a normal space in "99,5 %", "3 h 36", "8 h à 18 h" and "24 h/24" (as published); frenchSpacing only handles : ; ? ! and « ». Decide whether the helper should also keep "%" and "h" attached to their numbers; until then a line may break there.
// TODO(Debass): articles 5 and 7 rely on monitoring, support channels in the customer area and ticketing from the portal. Confirm these exist and match what the SLA states.
// TODO(Debass): legal review of articles 5 (availability), 6 (exclusions), 9 (no RTO/RPO guarantee) and 11 (no automatic credits) before publication.

/**
 * Service Level Agreement (SLA) legal document page.
 *
 * @returns {import("react").JSX.Element}
 */
export default function SlaPage() {
  return <LegalPage ns="sla" />;
}
